package main

import (
	"context"
	"log"

	"firebase.google.com/go/auth"
	"github.com/AkifhanIlgaz/word-memory/cfg"
	"github.com/AkifhanIlgaz/word-memory/connect"
	"go.mongodb.org/mongo-driver/mongo"
)

var db *mongo.Database
var authentication *auth.Client
var client *mongo.Client

func main() {
	config, err := cfg.LoadConfig(".")
	if err != nil {
		log.Fatal("Could not read environment variables", err)
	}

	ctx := context.TODO()
	client, err = connect.Mongo(ctx, config)
	if err != nil {
		log.Fatal("Could not connect to mongo: ", err)
	}

	db = client.Database("rues-drop")
	err = db.Drop(ctx)
	if err != nil {
		log.Fatal(err)
	}

	firebaseApp, err := connect.Firebase(ctx, config)
	if err != nil {
		log.Fatal("Could not connect to firebase: ", err)
	}
	authentication, err = firebaseApp.Auth(ctx)
	if err != nil {
		log.Fatal("new auth service: %w", err)
	}

	defer client.Disconnect(ctx)

	createProjects()
	createTasks()
	createModerators()
	addActions()
}
