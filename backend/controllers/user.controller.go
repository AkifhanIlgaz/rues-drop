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
	userService *services.UserService
}

func NewUserController(userService *services.UserService) *UserController {
	return &UserController{
		userService: userService,
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

	fmt.Println("uid", user.UID)
	fmt.Println("project", project)

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

	// TODO: get uid from context
	uid := ctx.Query("uid")

	err := controller.userService.RemoveBookmark(uid, project)
	if err != nil {
		ctx.AbortWithError(http.StatusInternalServerError, err)
		return
	}
}
