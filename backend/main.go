package main

import (
	"context"
	"log"

	"github.com/AkifhanIlgaz/word-memory/cfg"
	"github.com/AkifhanIlgaz/word-memory/connect"
	"github.com/AkifhanIlgaz/word-memory/controllers"
	"github.com/AkifhanIlgaz/word-memory/routes"
	"github.com/AkifhanIlgaz/word-memory/services"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	config, err := cfg.LoadConfig(".")
	if err != nil {
		log.Fatal("Could not read environment variables", err)
	}

	ctx := context.TODO()

	firebaseApp, err := connect.Firebase(ctx, config)
	if err != nil {
		log.Fatal("Could not connect to firebase: ", err)
	}

	mongoClient, err := connect.Mongo(ctx, config)
	if err != nil {
		log.Fatal("Could not connect to mongo: ", err)
	}

	defer mongoClient.Disconnect(ctx)

	authService, err := services.NewAuthService(ctx, firebaseApp)
	if err != nil {
		log.Fatal(err)
	}

	projectService := services.NewProjectService(ctx, mongoClient)
	moderatorService := services.NewModeratorService(ctx, mongoClient)
	taskService := services.NewTaskService(ctx, mongoClient)

	projectController := controllers.NewProjectController(projectService)
	moderatorController := controllers.NewModeratorController(authService, moderatorService)
	taskController := controllers.NewTaskController(taskService)
	userMiddleware := controllers.NewUserMiddleware(authService, moderatorService)

	projectRouteController := routes.NewProjectRouteController(projectController, userMiddleware)
	moderatorRouteController := routes.NewModeratorRouteController(moderatorController, userMiddleware)
	taskRouteController := routes.NewTaskRouteController(taskController, userMiddleware)

	server := gin.Default()
	setCors(server)

	router := server.Group("/api", userMiddleware.SetUser())

	projectRouteController.Setup(router)
	moderatorRouteController.Setup(router)
	taskRouteController.Setup(router)

	err = server.Run(":" + config.Port)
	if err != nil {
		log.Fatal(err)
	}
}

func setCors(server *gin.Engine) {
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{"http://localhost:8000", "http://localhost:3000"}
	corsConfig.AllowHeaders = []string{"*"}
	corsConfig.AllowCredentials = true

	server.Use(cors.New(corsConfig))
}
