package controllers

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/AkifhanIlgaz/word-memory/models"
	"github.com/AkifhanIlgaz/word-memory/services"
	"github.com/gin-gonic/gin"
)

type TaskController struct {
	taskService *services.TaskService
}

func NewTaskController(taskService *services.TaskService) *TaskController {
	return &TaskController{
		taskService: taskService,
	}
}

func (controller *TaskController) Add(ctx *gin.Context) {
	var taskToAdd models.TaskToAdd

	if err := ctx.BindJSON(&taskToAdd); err != nil {
		log.Println(err)
		ctx.AbortWithError(http.StatusBadRequest, err)
		return
	}

	taskToAdd.ProjectName = serializeDbName(taskToAdd.ProjectName)

	err := controller.taskService.Create(&taskToAdd)
	if err != nil {
		ctx.AbortWithError(http.StatusInternalServerError, err)
		return
	}
}

func (controller *TaskController) Delete(ctx *gin.Context) {
	taskId := ctx.Param("taskId")
	project := ctx.Query("projectName")

	err := controller.taskService.Delete(taskId, project)
	if err != nil {
		fmt.Println(err)
		ctx.AbortWithError(http.StatusInternalServerError, err)
		return
	}
}

func (controller *TaskController) Finish(ctx *gin.Context) {
	taskId := ctx.Param("taskId")
	project := ctx.Query("projectName")

	err := controller.taskService.Finish(taskId, project)
	if err != nil {
		fmt.Println(err)
		ctx.AbortWithError(http.StatusInternalServerError, err)
		return
	}
}

func (controller *TaskController) Edit(ctx *gin.Context) {
	taskToEdit := models.TaskToEdit{
		TaskId:      ctx.Param("taskId"),
		ProjectName: serializeDbName(ctx.Query("projectName")),
	}
	if err := ctx.BindJSON(&taskToEdit); err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
		return
	}

	err := controller.taskService.Edit(taskToEdit)
	if err != nil {
		fmt.Println(err)
		ctx.AbortWithError(http.StatusInternalServerError, err)
		return
	}
}

func (controller *TaskController) All(ctx *gin.Context) {
	projectName := ctx.Param("projectName")
	user, err := getUserFromContext(ctx)
	if err != nil {
		ctx.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	var tasks []models.Task

	if user.CustomClaims["role"] == "admin" || user.CustomClaims["role"] == "moderator" {
		tasks, err = controller.taskService.GetTasks(projectName)
		if err != nil {
			ctx.AbortWithStatus(http.StatusInternalServerError)
			return
		}
	} else {
		tasks, err = controller.taskService.GetTasksWithState(projectName, user.UID)
		if err != nil {
			ctx.AbortWithStatus(http.StatusInternalServerError)
			return
		}
	}

	ctx.JSON(http.StatusOK, tasks)
}

func (controller *TaskController) Action(ctx *gin.Context) {
	user, err := getUserFromContext(ctx)
	if err != nil {
		ctx.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	action := models.TaskAction{
		UserId:    user.UID,
		Timestamp: time.Now(),
	}

	if err := ctx.BindJSON(&action); err != nil {
		fmt.Println(err)
		ctx.AbortWithStatus(http.StatusBadRequest)
		return
	}

	err = controller.taskService.Action(action)
	if err != nil {
		ctx.AbortWithError(http.StatusInternalServerError, err)
		return
	}
}
