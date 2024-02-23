package controllers

import (
	"fmt"
	"log"

	"github.com/AkifhanIlgaz/word-memory/models"
	"github.com/AkifhanIlgaz/word-memory/services"
	"github.com/gin-gonic/gin"
)

type ModeratorController struct {
	authService *services.AuthService
}

func NewModeratorController(authService *services.AuthService) *ModeratorController {
	return &ModeratorController{
		authService: authService,
	}
}

func (controller *ModeratorController) Add(ctx *gin.Context) {
	var moderatorToAdd models.ModeratorToAdd

	if err := ctx.ShouldBindJSON(&moderatorToAdd); err != nil {
		// TODO:
		log.Fatal(err)
	}

	fmt.Printf("%+v", moderatorToAdd)

}
