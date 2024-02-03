package main

import (
	"context"
	"log"

	"github.com/AkifhanIlgaz/word-memory/cfg"
	"github.com/AkifhanIlgaz/word-memory/connect"
	"github.com/AkifhanIlgaz/word-memory/services"
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

}
