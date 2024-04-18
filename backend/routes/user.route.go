package routes

import (
	"github.com/AkifhanIlgaz/word-memory/controllers"
	"github.com/gin-gonic/gin"
)

type UserRouteController struct {
	userController *controllers.UserController
}

func NewUserRouteController(userController *controllers.UserController) *UserRouteController {
	return &UserRouteController{
		userController: userController,
	}
}

func (routeController *UserRouteController) Setup(rg *gin.RouterGroup) {
}
