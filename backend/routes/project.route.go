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

	// TODO: User must be admin to add a new project
	router.POST("/add", routeController.projectController.Add)
}
