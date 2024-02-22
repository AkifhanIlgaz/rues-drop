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
