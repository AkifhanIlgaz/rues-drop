package main

import (
	"context"
	"log"
	"time"

	"github.com/AkifhanIlgaz/word-memory/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var (
	tasks = []any{
		models.Task{
			Id:          validObjectId("660330aa29c550b32bc3e7fc"),
			ProjectId:   dymension.Id,
			Description: "Deploy Rollapp",
			URL:         "https://medium.com/cumulo-pro/roller-step-by-step-installation-guide-for-froopyland-testnet-ebc39a8389de#ea24",
			Status:      models.StatusInProgress,
			CreatedAt:   time.Now(),
		},
		models.Task{
			Id:          validObjectId("660330aa29c550b32bc3e7fd"),
			ProjectId:   dymension.Id,
			Description: "Stake DYM",
			URL:         "https://portal.dymension.xyz/dymension/staking",
			Status:      models.StatusFinished,
			CreatedAt:   time.Now(),
		}, models.Task{
			Id:          validObjectId("660330aa29c550b32bc3e7fe"),
			ProjectId:   lava.Id,
			Description: "Use Near RPC Point",
			URL:         "https://points.lavanet.xyz/profile",
			Status:      models.StatusInProgress,
			CreatedAt:   time.Now(),
		},
		models.Task{
			Id:          validObjectId("660330aa29c550b32bc3e7ff"),
			ProjectId:   lava.Id,
			Description: "Use Axelar RPC Point",
			URL:         "https://points.lavanet.xyz/profile",
			Status:      models.StatusInProgress,
			CreatedAt:   time.Now(),
		}, models.Task{
			Id:          validObjectId("660330aa29c550b32bc3e800"),
			ProjectId:   hyperlane.Id,
			Description: "Bridge TIA",
			URL:         "https://www.usenexus.org/",
			Status:      models.StatusInProgress,
			CreatedAt:   time.Now(),
		},
		models.Task{
			Id:          validObjectId("660330aa29c550b32bc3e801"),
			ProjectId:   hyperlane.Id,
			Description: "Bridge NFTs on Merkly",
			URL:         "https://minter.merkly.com/hyperlane",
			Status:      models.StatusFinished,
			CreatedAt:   time.Now(),
		},
	}
)

func validObjectId(hex string) primitive.ObjectID {
	id, err := primitive.ObjectIDFromHex(hex)
	if err != nil {
		log.Fatal(err)
	}

	return id
}

func createTasks() {
	collection := db.Collection("tasks")

	_, err := collection.InsertMany(context.Background(), tasks)
	if err != nil {
		log.Fatal(err)
	}
}
