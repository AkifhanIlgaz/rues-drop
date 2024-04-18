package controllers

import (
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

}

func (controller *UserController) RemoveBookmark(ctx *gin.Context) {

}
