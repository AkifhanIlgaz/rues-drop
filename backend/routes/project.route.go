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

	router.GET("/all", routeController.projectController.All)
	router.GET("/:projectName", routeController.projectController.Project)

	router.PUT("/:projectName", routeController.userMiddleware.IsAdmin(), routeController.projectController.Edit)
	router.DELETE("/:projectName", routeController.userMiddleware.IsAdmin(), routeController.projectController.Delete)
	router.POST("/add", routeController.userMiddleware.IsAdmin(), routeController.projectController.Add)
}
