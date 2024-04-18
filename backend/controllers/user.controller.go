package controllers

import "github.com/AkifhanIlgaz/word-memory/services"

type UserController struct {
	userService *services.UserService
}

func NewUserController(userService *services.UserService) *UserController {
	return &UserController{
		userService: userService,
	}
}
