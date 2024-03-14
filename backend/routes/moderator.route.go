package routes

import (
	"github.com/AkifhanIlgaz/word-memory/controllers"
	"github.com/gin-gonic/gin"
)

type ModeratorRouteController struct {
	moderatorController *controllers.ModeratorController
	userMiddleware      *controllers.UserMiddleware
}

func NewModeratorRouteController(moderatorController *controllers.ModeratorController, userMiddleware *controllers.UserMiddleware) *ModeratorRouteController {
	return &ModeratorRouteController{
		moderatorController: moderatorController,
		userMiddleware:      userMiddleware,
	}
}

func (routeController *ModeratorRouteController) Setup(rg *gin.RouterGroup) {

	router := rg.Group("/moderators", routeController.userMiddleware.SetUser(), routeController.userMiddleware.IsAdmin())

	router.POST("/add", routeController.moderatorController.Create)
	// TODO: Add IsMod middleware
	router.GET("/:projectName", routeController.moderatorController.Moderators)
}
