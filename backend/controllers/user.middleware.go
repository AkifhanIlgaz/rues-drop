package controllers

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/AkifhanIlgaz/word-memory/services"
	"github.com/gin-gonic/gin"
)

type UserMiddleware struct {
	authService *services.AuthService
}

func NewUserMiddleware(authService *services.AuthService) *UserMiddleware {
	return &UserMiddleware{
		authService: authService,
	}
}

func (middleware *UserMiddleware) SetUser() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		idToken, err := parseIdTokenFromHeader(ctx.Request.Header)
		if err != nil {
			ctx.AbortWithError(http.StatusUnauthorized, err)
			return
		}

		user, err := middleware.authService.GetUserByIdToken(idToken)
		if err != nil {
			ctx.AbortWithError(http.StatusInternalServerError, err)
			return
		}

		ctx.Set("currentUser", user)
		ctx.Next()
	}
}

func (middleware *UserMiddleware) IsAdmin() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		user, err := getUserFromContext(ctx)
		if err != nil {
			ctx.AbortWithStatus(http.StatusUnauthorized)
			return
		}

		role, ok := user.CustomClaims["role"]
		if !ok || role != "admin" {
			ctx.AbortWithError(http.StatusUnauthorized, fmt.Errorf("user is not admin"))
			return
		}

		ctx.Next()
	}
}

func parseIdTokenFromHeader(header http.Header) (string, error) {
	authorizationHeader := header.Get("Authorization")
	fields := strings.Fields(authorizationHeader)

	if len(fields) == 0 {
		return "", fmt.Errorf("authorization header is empty")
	}
	if len(fields) > 2 {
		return "", fmt.Errorf("authorization header is invalid")
	}
	if fields[0] != "Bearer" {
		return "", fmt.Errorf("invalid authorization header scheme")
	}

	return fields[1], nil
}
