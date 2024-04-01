package main

import (
	"context"
	"log"
	"time"

	"github.com/AkifhanIlgaz/word-memory/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var dymensionTasks = []any{
	models.Task{
		Id:          validObjectId("660330aa29c550b32bc3e7fc"),
		ProjectName: dymension.Name,
		Description: "Deploy Rollapp",
		URL:         "https://medium.com/cumulo-pro/roller-step-by-step-installation-guide-for-froopyland-testnet-ebc39a8389de#ea24",
		Status:      models.StatusInProgress,
		CreatedAt:   time.Now(),
	},
	models.Task{
		Id:          validObjectId("660330aa29c550b32bc3e7fd"),
		ProjectName: dymension.Name,
		Description: "Stake DYM",
		URL:         "https://portal.dymension.xyz/dymension/staking",
		Status:      models.StatusFinished,
		CreatedAt:   time.Now(),
	},
}

var lavaTasks = []any{
	models.Task{
		Id:          validObjectId("660330aa29c550b32bc3e7fe"),
		ProjectName: lava.Name,
		Description: "Use Near RPC Point",
		URL:         "https://points.lavanet.xyz/profile",
		Status:      models.StatusInProgress,
		CreatedAt:   time.Now(),
	},
	models.Task{
		Id:          validObjectId("660330aa29c550b32bc3e7ff"),
		ProjectName: lava.Name,
		Description: "Use Axelar RPC Point",
		URL:         "https://points.lavanet.xyz/profile",
		Status:      models.StatusInProgress,
		CreatedAt:   time.Now(),
	},
}

var hyperlaneTasks = []any{
	models.Task{
		Id:          validObjectId("660330aa29c550b32bc3e800"),
		ProjectName: hyperlane.Name,
		Description: "Bridge TIA",
		URL:         "https://www.usenexus.org/",
		Status:      models.StatusInProgress,
		CreatedAt:   time.Now(),
	},
	models.Task{
		Id:          validObjectId("660330aa29c550b32bc3e801"),
		ProjectName: hyperlane.Name,
		Description: "Bridge NFTs on Merkly",
		URL:         "https://minter.merkly.com/hyperlane",
		Status:      models.StatusFinished,
		CreatedAt:   time.Now(),
	},
}

func validObjectId(hex string) primitive.ObjectID {
	id, err := primitive.ObjectIDFromHex(hex)
	if err != nil {
		log.Fatal(err)
	}

	return id
}

func createTasks() {
	createTasksForProject(dymension.Name, dymensionTasks)
	createTasksForProject(lava.Name, lavaTasks)
	createTasksForProject(hyperlane.Name, hyperlaneTasks)
}

func createTasksForProject(name string, tasks []any) {
	coll := client.Database(name).Collection("tasks")

	_, err := coll.InsertMany(context.Background(), tasks)
	if err != nil {
		log.Printf("cannot create tasks for: %v\n", name)
	}
}
