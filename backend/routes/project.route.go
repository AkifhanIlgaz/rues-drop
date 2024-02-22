package routes

import (
	"github.com/AkifhanIlgaz/word-memory/controllers"
	"github.com/gin-gonic/gin"
)

type ProjectRouteController struct {
	projectController *controllers.ProjectController
}

func NewProjectRouteController(projectController *controllers.ProjectController) *ProjectRouteController {
	return &ProjectRouteController{
		projectController: projectController,
	}
}

func (routeController *ProjectRouteController) Setup(rg *gin.RouterGroup) {
	router := rg.Group("/projects")

	router.POST("/add", routeController.projectController.Add)
}
