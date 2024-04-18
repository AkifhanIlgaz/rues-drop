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
	router := rg.Group("/user")

	router.POST("/create", routeController.userController.Create)

	// TODO: Receive project name by query parameters
	router.POST("/bookmark", routeController.userController.Bookmark)
	router.DELETE("/bookmark/remove", routeController.userController.RemoveBookmark)
}
