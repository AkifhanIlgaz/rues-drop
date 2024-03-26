package controllers

import (
	"fmt"
	"net/http"
	"slices"
	"strings"

	"github.com/AkifhanIlgaz/word-memory/services"
	"github.com/gin-gonic/gin"
)

type UserMiddleware struct {
	authService      *services.AuthService
	moderatorService *services.ModeratorService
}

func NewUserMiddleware(authService *services.AuthService, moderatorService *services.ModeratorService) *UserMiddleware {
	return &UserMiddleware{
		authService:      authService,
		moderatorService: moderatorService,
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

func (middleware *UserMiddleware) HasAccess() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var project string

		if project = ctx.Param("projectName"); len(project) == 0 {
			project = ctx.Query("projectName")
		}
		if len(project) == 0 {
			ctx.AbortWithStatus(http.StatusBadRequest)
			return
		}

		user, err := getUserFromContext(ctx)
		if err != nil {
			ctx.AbortWithStatus(http.StatusUnauthorized)
			return
		}

		switch user.CustomClaims["role"] {
		case "admin":
			ctx.Next()
			return
		case "moderator":
			projects, ok := user.CustomClaims["projects"].([]string)
			if !ok {
				ctx.AbortWithStatus(http.StatusUnauthorized)
				return
			}
			if !slices.Contains(projects, project) {
				ctx.AbortWithStatus(http.StatusUnauthorized)
				return
			}
		}

		ctx.Next()
	}
}

func (middleware *UserMiddleware) MustAdmin() gin.HandlerFunc {
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
