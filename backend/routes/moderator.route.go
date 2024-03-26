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
	router := rg.Group("/moderators")

	onlyAdmin := router.Group("/", routeController.userMiddleware.MustAdmin())
	{
		onlyAdmin.GET("/:projectName", routeController.moderatorController.ModeratorsOfProject)
		onlyAdmin.GET("/all", routeController.moderatorController.Moderators)
		onlyAdmin.POST("/create", routeController.moderatorController.Create)
		onlyAdmin.PUT("/add", routeController.moderatorController.Add)
		onlyAdmin.DELETE("/delete", routeController.moderatorController.Delete)
	}

}
