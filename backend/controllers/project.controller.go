package controllers

import (
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

	projects, err := controller.projectService.GetProjects(user.CustomClaims["role"], user.UID)
	if err != nil {
		ctx.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	ctx.JSON(http.StatusOK, &projects)
}

func (controller *ProjectController) Project(ctx *gin.Context) {
	projectName := ctx.Param("projectName")

	project, err := controller.projectService.GetProjectByName(projectName)
	if err != nil {
		ctx.AbortWithError(http.StatusInternalServerError, err)
		return
	}

	ctx.JSON(http.StatusOK, project)
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
