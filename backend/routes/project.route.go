package routes

import (
	"github.com/AkifhanIlgaz/word-memory/controllers"
	"github.com/gin-gonic/gin"
)

type ProjectRouteController struct {
	projectController *controllers.ProjectController
	userMiddleware    *controllers.UserMiddleware
}

func NewProjectRouteController(projectController *controllers.ProjectController, userMiddleware *controllers.UserMiddleware) *ProjectRouteController {
	return &ProjectRouteController{
		projectController: projectController,
		userMiddleware:    userMiddleware,
	}
}

func (routeController *ProjectRouteController) Setup(rg *gin.RouterGroup) {
	router := rg.Group("/projects", routeController.userMiddleware.SetUser())

	public := router.Group("/")
	{
		public.GET("/all", routeController.projectController.All)
		public.GET("/:projectName", routeController.projectController.Project)
	}

	onlyAdmin := router.Group("/", routeController.userMiddleware.MustAdmin())
	{
		onlyAdmin.DELETE("/:projectName", routeController.projectController.Delete)
		onlyAdmin.POST("/add", routeController.projectController.Add)
	}

	private := router.Group("/", routeController.userMiddleware.HasAccess())
	{
		private.PUT("/:projectName", routeController.userMiddleware.HasAccess(), routeController.projectController.Edit)
	}
}
