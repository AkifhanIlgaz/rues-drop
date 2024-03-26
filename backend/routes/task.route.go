package routes

import (
	"github.com/AkifhanIlgaz/word-memory/controllers"
	"github.com/gin-gonic/gin"
)

type TaskRouteController struct {
	taskController *controllers.TaskController
	userMiddleware *controllers.UserMiddleware
}

func NewTaskRouteController(taskController *controllers.TaskController, userMiddleware *controllers.UserMiddleware) *TaskRouteController {
	return &TaskRouteController{
		taskController: taskController,
		userMiddleware: userMiddleware,
	}
}

func (routeController *TaskRouteController) Setup(rg *gin.RouterGroup) {
	router := rg.Group("/tasks", routeController.userMiddleware.SetUser())

	// TODO: Add IsMod middleware in prod
	// TODO: Read project Id from body or query
	router.POST("/add", routeController.userMiddleware.MustAdmin(), routeController.taskController.Add)
	router.PUT("/:taskId", routeController.taskController.Edit)
	router.DELETE("/:taskId", routeController.taskController.Delete)
	router.PUT("/finish/:taskId", routeController.taskController.Finish)
	router.GET("/:projectId", routeController.taskController.All)

}
