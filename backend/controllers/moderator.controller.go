package controllers

import (
	"log"
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

func (controller *ModeratorController) Delete(ctx *gin.Context) {
	var modToDelete models.ModeratorToDelete

	if err := ctx.BindJSON(&modToDelete); err != nil {
		ctx.AbortWithError(http.StatusBadRequest, err)
		return
	}

	err := controller.moderatorService.DeleteModerator(modToDelete)
	if err != nil {
		log.Println(err)
		ctx.AbortWithError(http.StatusInternalServerError, err)
		return
	}
}

func (controller *ModeratorController) Moderators(ctx *gin.Context) {
	projectName := ctx.Param("projectName")

	mods, err := controller.moderatorService.GetModerators(projectName)
	if err != nil {
		ctx.AbortWithError(http.StatusInternalServerError, err)
		return
	}

	ctx.JSON(http.StatusOK, mods)
}
