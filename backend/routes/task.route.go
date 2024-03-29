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
	router := rg.Group("/tasks")

	public := router.Group("/")
	{
		public.GET("/:projectId", routeController.taskController.All)
		public.POST("/action", routeController.taskController.Action)
	}

	private := router.Group("/", routeController.userMiddleware.HasAccess())
	{
		private.POST("/add", routeController.taskController.Add)
		private.PUT("/:taskId", routeController.taskController.Edit)
		private.DELETE("/:taskId", routeController.taskController.Delete)
		private.PUT("/finish/:taskId", routeController.taskController.Finish)
	}

}
