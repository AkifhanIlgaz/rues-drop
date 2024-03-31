package controllers

import (
	"errors"
	"fmt"
	"net/http"

	"firebase.google.com/go/auth"
	"github.com/AkifhanIlgaz/word-memory/models"
	"github.com/AkifhanIlgaz/word-memory/services"
	"github.com/gin-gonic/gin"
)

type ProjectController struct {
	projectService *services.ProjectService
}

func NewProjectController(projectService *services.ProjectService) *ProjectController {
	return &ProjectController{
		projectService: projectService,
	}
}

func (controller *ProjectController) Add(ctx *gin.Context) {
	var project models.Project
	if err := ctx.ShouldBindJSON(&project); err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
		return
	}

	if err := controller.projectService.Create(&project); err != nil {
		ctx.AbortWithError(http.StatusInternalServerError, err)
		return
	}
}

func (controller *ProjectController) All(ctx *gin.Context) {
	user, err := getUserFromContext(ctx)
	if err != nil {
		ctx.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	names := []string{}
	if user.CustomClaims["role"] == "moderator" {
		projects, ok := user.CustomClaims["projects"].([]string)
		if !ok {
			ctx.AbortWithError(http.StatusUnauthorized, errors.New("projects claim is not an array"))
			return
		}
		names = append(names, projects...)
	}

	projects, err := controller.projectService.GetProjects(names...)
	if err != nil {
		ctx.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	ctx.JSON(http.StatusOK, &projects)
}

func (controller *ProjectController) Project(ctx *gin.Context) {
	projectName := ctx.Param("projectName")

	project, err := controller.projectService.GetProjects(projectName)
	if err != nil {
		ctx.AbortWithError(http.StatusInternalServerError, err)
		return
	}
	if len(project) == 0 {
		ctx.AbortWithError(http.StatusNotFound, fmt.Errorf("%v doesn't exist", projectName))
		return
	}

	ctx.JSON(http.StatusOK, project[0])
}

func (controller *ProjectController) Delete(ctx *gin.Context) {
	projectName := ctx.Param("projectName")

	err := controller.projectService.DeleteProject(projectName)
	if err != nil {
		ctx.AbortWithError(http.StatusInternalServerError, err)
		return
	}
}

func (controller *ProjectController) Edit(ctx *gin.Context) {
	projectName := ctx.Param("projectName")

	query := map[string]string{}
	if err := ctx.BindQuery(&query); err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
		return
	}

	err := controller.projectService.EditProject(projectName, query)
	if err != nil {
		ctx.AbortWithError(http.StatusInternalServerError, err)
		return
	}
}

func getUserFromContext(ctx *gin.Context) (*auth.UserRecord, error) {
	val, exists := ctx.Get("currentUser")
	if !exists {
		return nil, fmt.Errorf("cannot found currentUser in context")
	}

	user, ok := val.(*auth.UserRecord)
	if !ok {
		return nil, fmt.Errorf("currentUser is not UserRecord")
	}

	return user, nil
}
