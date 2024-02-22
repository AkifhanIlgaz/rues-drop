package routes

import (
	"github.com/AkifhanIlgaz/word-memory/controllers"
	"github.com/gin-gonic/gin"
)

type UserRouteController struct {
	userController *controllers.UserController
	userMiddleware *controllers.UserMiddleware
}

func NewUserRouteController(userController *controllers.UserController, userMiddleware *controllers.UserMiddleware) *UserRouteController {
	return &UserRouteController{
		userController: userController,
		userMiddleware: userMiddleware,
	}
}

func (routeController *UserRouteController) Setup(rg *gin.RouterGroup) {
	// TODO: Add SetUser & IsAdmin middleware
	router := rg.Group("/users")

	_ = router
}
