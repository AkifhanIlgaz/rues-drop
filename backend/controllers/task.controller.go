package controllers

import (
	"fmt"
	"net/http"

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
		ctx.AbortWithError(http.StatusBadRequest, err)
		return
	}

	err := controller.taskService.Create(&taskToAdd)
	if err != nil {
		ctx.AbortWithError(http.StatusInternalServerError, err)
		return
	}
}

func (controller *TaskController) Delete(ctx *gin.Context) {
	taskId := ctx.Param("taskId")

	err := controller.taskService.Delete(taskId)
	if err != nil {
		fmt.Println(err)
		ctx.AbortWithError(http.StatusInternalServerError, err)
		return
	}
}

func (controller *TaskController) Finish(ctx *gin.Context) {
	taskId := ctx.Param("taskId")

	err := controller.taskService.Finish(taskId)
	if err != nil {
		fmt.Println(err)
		ctx.AbortWithError(http.StatusInternalServerError, err)
		return
	}
}

func (controller *TaskController) Edit(ctx *gin.Context) {
	taskToEdit := models.TaskToEdit{
		TaskId: ctx.Param("taskId"),
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
	projectId := ctx.Param("projectId")

	tasks, err := controller.taskService.GetTasks(projectId)
	if err != nil {
		ctx.AbortWithStatus(http.StatusInternalServerError)
		return
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
		UserId: user.UID,
	}

	if err := ctx.BindJSON(&action); err != nil {
		ctx.AbortWithStatus(http.StatusBadRequest)
		return
	}

	// TODO: Check if user owns the action that is interacting

	err = controller.taskService.Action(action)
	if err != nil {
		ctx.AbortWithError(http.StatusInternalServerError, err)
		return
	}
}
