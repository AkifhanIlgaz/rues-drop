package main

import (
	"context"
	"log"

	"github.com/AkifhanIlgaz/word-memory/models"
)

var actions = []any{
	models.TaskAction{
		TaskId: validObjectId("660330aa29c550b32bc3e7fc"),
		UserId: user.uid,
		Type:   "Done",
		Info:   "Deployed Rollapp",
	},
	models.TaskAction{
		TaskId: validObjectId("660330aa29c550b32bc3e7fc"),
		UserId: user.uid,
		Type:   "Bookmark",
	},
	models.TaskAction{
		TaskId: validObjectId("660330aa29c550b32bc3e7fd"),
		UserId: user.uid,
		Type:   "Bookmark",
		Info:   "Staked 1000 DYM on 8 wallets",
	},
	models.TaskAction{
		TaskId: validObjectId("660330aa29c550b32bc3e7fe"),
		UserId: user.uid,
		Type:   "Done",
		Info:   "Sender Wallet Script",
	},
	models.TaskAction{
		TaskId: validObjectId("660330aa29c550b32bc3e7ff"),
		UserId: user.uid,
		Type:   "Done",
		Info:   "Squid router used",
	},
	models.TaskAction{
		TaskId: validObjectId("660330aa29c550b32bc3e800"),
		UserId: user.uid,
		Type:   "Bookmark",
	},
	models.TaskAction{
		TaskId: validObjectId("660330aa29c550b32bc3e801"),
		UserId: user.uid,
		Type:   "Bookmark",
	},
	models.TaskAction{
		TaskId: validObjectId("660330aa29c550b32bc3e800"),
		UserId: user.uid,
		Type:   "Done",
		Info:   "10 TIA Bridged",
	},
	models.TaskAction{
		TaskId: validObjectId("660330aa29c550b32bc3e801"),
		UserId: user.uid,
		Type:   "Done",
		Info:   "Used 5 different chains as source",
	},
}

func addActions() {
	collection := db.Collection("actions")

	_, err := collection.InsertMany(context.Background(), actions)
	if err != nil {
		log.Fatal(err)
	}
}
