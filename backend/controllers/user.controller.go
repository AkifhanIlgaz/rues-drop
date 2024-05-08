package controllers

import (
	"errors"
	"fmt"
	"log"
	"net/http"

	"github.com/AkifhanIlgaz/word-memory/models"
	"github.com/AkifhanIlgaz/word-memory/services"
	"github.com/gin-gonic/gin"
)

type UserController struct {
	userService    *services.UserService
	projectService *services.ProjectService
}

func NewUserController(userService *services.UserService, projectService *services.ProjectService) *UserController {
	return &UserController{
		userService:    userService,
		projectService: projectService,
	}
}

func (controller *UserController) Create(ctx *gin.Context) {
	var user models.User

	if err := ctx.BindJSON(&user); err != nil {
		log.Println(err)
		ctx.AbortWithError(http.StatusBadRequest, err)
		return
	}

	err := controller.userService.Create(user)
	if err != nil {
		log.Println(err)
		ctx.AbortWithError(http.StatusInternalServerError, err)
		return
	}
}

func (controller *UserController) Bookmarks(ctx *gin.Context) {
	user, err := getUserFromContext(ctx)
	if err != nil {
		fmt.Println(err)
		ctx.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	bookmarks, err := controller.userService.Bookmarks(user.UID)
	if err != nil {
		fmt.Println(err)
		ctx.AbortWithError(http.StatusInternalServerError, err)
		return
	}

	projects, err := controller.projectService.GetProjects(bookmarks...)
	if err != nil {
		fmt.Println(err)
		ctx.AbortWithError(http.StatusInternalServerError, err)
		return
	}

	ctx.JSON(http.StatusOK, &projects)
}

func (controller *UserController) Bookmark(ctx *gin.Context) {
	project := ctx.Query("project")
	if len(project) == 0 {
		ctx.AbortWithError(http.StatusBadRequest, errors.New("empty project"))
		return
	}

	user, err := getUserFromContext(ctx)
	if err != nil {
		ctx.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	err = controller.userService.Bookmark(user.UID, project)
	if err != nil {
		ctx.AbortWithError(http.StatusInternalServerError, err)
		return
	}
}

func (controller *UserController) RemoveBookmark(ctx *gin.Context) {
	project := ctx.Query("project")
	if len(project) == 0 {
		ctx.AbortWithError(http.StatusBadRequest, errors.New("empty project"))
		return
	}

	user, err := getUserFromContext(ctx)
	if err != nil {
		ctx.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	err = controller.userService.RemoveBookmark(user.UID, project)
	if err != nil {
		ctx.AbortWithError(http.StatusInternalServerError, err)
		return
	}
}
