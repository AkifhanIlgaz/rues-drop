package main

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"log"

	"github.com/AkifhanIlgaz/word-memory/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var dymensionActions = []models.TaskAction{
	{
		TaskId: validObjectId("660330aa29c550b32bc3e7fd"),
		Info:   "Staked 1000 DYM on 8 wallets",
	},
}

var lavaActions = []models.TaskAction{
	{
		TaskId: validObjectId("660330aa29c550b32bc3e7ff"),
		Info:   "Squid router used",
	},
}

var hyperlaneActions = []models.TaskAction{
	{
		TaskId: validObjectId("660330aa29c550b32bc3e800"),
		Info:   "10 TIA Bridged",
	},
	{
		TaskId: validObjectId("660330aa29c550b32bc3e801"),
		Info:   "Used 5 different chains as source",
	},
}

func addActions() {
	addActionsForProject("Dymension", dymensionActions)
	addActionsForProject("Lava-Network", lavaActions)
	addActionsForProject("Hyperlane", hyperlaneActions)
}

func addActionsForProject(name string, actions []models.TaskAction) {
	collection := client.Database(name).Collection("actions")

	_, err := collection.InsertOne(context.Background(), bson.M{
		"_id":     uidToObjId(user.uid, name),
		"actions": actions,
	})
	if err != nil {
		log.Fatal(err)
	}
}

func uidToObjId(uid string, project string) primitive.ObjectID {
	h := sha256.Sum256([]byte(uid + project))
	hash := hex.EncodeToString(h[:])

	id, err := primitive.ObjectIDFromHex(hash[:24])
	if err != nil {
		log.Fatal(err)
	}

	return id
}
