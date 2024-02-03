package main

import (
	"context"
	"log"
	"net/http"

	"github.com/AkifhanIlgaz/word-memory/cfg"
	"github.com/AkifhanIlgaz/word-memory/connect"
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

	server := gin.Default()
	setCors(server)

	router := server.Group("/api")
	router.GET("/health-checker", func(ctx *gin.Context) {
		// Read from auth header
		uid, err :=

			ctx.JSON(http.StatusOK, gin.H{"status": "success", "message": "API is healthy"})
	})

}

func setCors(server *gin.Engine) {
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{"http://localhost:8000", "http://localhost:3000"}
	corsConfig.AllowHeaders = []string{"*"}
	corsConfig.AllowCredentials = true

	server.Use(cors.New(corsConfig))
}
