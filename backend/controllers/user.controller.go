package controllers

import "github.com/AkifhanIlgaz/word-memory/services"

type UserController struct {
	authService *services.AuthService
}

func NewUserController(authService *services.AuthService) *UserController {
	return &UserController{
		authService: authService,
	}
}
