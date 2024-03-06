package controllers

import (
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

func (controller *TaskController) All(ctx *gin.Context) {
	projectId := ctx.Param("projectId")

	tasks, err := controller.taskService.GetTasks(projectId)
	if err != nil {
		ctx.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	ctx.JSON(http.StatusOK, tasks)
}
