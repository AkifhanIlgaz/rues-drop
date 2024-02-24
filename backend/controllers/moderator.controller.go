package controllers

import (
	"net/http"

	"github.com/AkifhanIlgaz/word-memory/models"
	"github.com/AkifhanIlgaz/word-memory/services"
	"github.com/gin-gonic/gin"
)

type ModeratorController struct {
	authService      *services.AuthService
	moderatorService *services.ModeratorService
}

func NewModeratorController(authService *services.AuthService, moderatorService *services.ModeratorService) *ModeratorController {
	return &ModeratorController{
		authService:      authService,
		moderatorService: moderatorService,
	}
}

func (controller *ModeratorController) Create(ctx *gin.Context) {
	var moderatorToAdd models.ModeratorToAdd

	if err := ctx.ShouldBindJSON(&moderatorToAdd); err != nil {
		ctx.AbortWithStatus(http.StatusBadRequest)
		return
	}

	uid, err := controller.authService.CreateModerator(&moderatorToAdd)
	if err != nil {
		ctx.AbortWithError(http.StatusInternalServerError, err)
		return
	}

	err = controller.moderatorService.CreateModerator(uid, &moderatorToAdd)
	if err != nil {
		ctx.AbortWithError(http.StatusInternalServerError, err)
		return
	}
}
