package main

import (
	"context"
	"log"
	"time"

	"github.com/AkifhanIlgaz/word-memory/cfg"
	"github.com/AkifhanIlgaz/word-memory/connect"
	"github.com/AkifhanIlgaz/word-memory/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var db *mongo.Database

var (
	dymension = models.Project{
		Id:        primitive.NewObjectID(),
		Name:      "Dymension",
		Website:   "https://dymension.xyz/",
		Discord:   "https://discord.com/invite/dymension",
		Twitter:   "https://twitter.com/dymension",
		Logo:      "https://s2.coinmarketcap.com/static/img/coins/64x64/28932.png",
		CreatedAt: time.Now(),
	}
	lava = models.Project{
		Id:        primitive.NewObjectID(),
		Name:      "Lava Network",
		Website:   "https://www.lavanet.xyz/",
		Discord:   "https://discord.com/invite/Tbk5NxTCdA",
		Twitter:   "https://twitter.com/lavanetxyz",
		Logo:      "https://pbs.twimg.com/profile_images/1628433459977850882/l4oqDz8R_400x400.jpg",
		CreatedAt: time.Now(),
	}
	hyperlane = models.Project{
		Id:        primitive.NewObjectID(),
		Name:      "Hyperlane",
		Website:   "https://www.hyperlane.xyz/",
		Discord:   "http://discord.gg/hyperlane",
		Twitter:   "https://twitter.com/Hyperlane_xyz",
		Logo:      "https://pbs.twimg.com/profile_images/1671589406816313345/wGzRPeEf_400x400.jpg",
		CreatedAt: time.Now(),
	}
)

var (
	tasks = []any{
		models.Task{
			Id:          primitive.NewObjectID(),
			ProjectId:   dymension.Id,
			Description: "Deploy Rollapp",
			URL:         "https://medium.com/cumulo-pro/roller-step-by-step-installation-guide-for-froopyland-testnet-ebc39a8389de#ea24",
			Status:      models.StatusInProgress,
			CreatedAt:   time.Now(),
		},
		models.Task{
			Id:          primitive.NewObjectID(),
			ProjectId:   dymension.Id,
			Description: "Stake DYM",
			URL:         "https://portal.dymension.xyz/dymension/staking",
			Status:      models.StatusFinished,
			CreatedAt:   time.Now(),
		}, models.Task{
			Id:          primitive.NewObjectID(),
			ProjectId:   lava.Id,
			Description: "Use Near RPC Point",
			URL:         "https://points.lavanet.xyz/profile",
			Status:      models.StatusInProgress,
			CreatedAt:   time.Now(),
		},
		models.Task{
			Id:          primitive.NewObjectID(),
			ProjectId:   lava.Id,
			Description: "Use Axelar RPC Point",
			URL:         "https://points.lavanet.xyz/profile",
			Status:      models.StatusInProgress,
			CreatedAt:   time.Now(),
		}, models.Task{
			Id:          primitive.NewObjectID(),
			ProjectId:   hyperlane.Id,
			Description: "Bridge TIA",
			URL:         "https://www.usenexus.org/",
			Status:      models.StatusInProgress,
			CreatedAt:   time.Now(),
		},
		models.Task{
			Id:          primitive.NewObjectID(),
			ProjectId:   hyperlane.Id,
			Description: "Bridge NFTs on Merkly",
			URL:         "https://minter.merkly.com/hyperlane",
			Status:      models.StatusFinished,
			CreatedAt:   time.Now(),
		},
	}
)

func main() {
	config, err := cfg.LoadConfig(".")
	if err != nil {
		log.Fatal("Could not read environment variables", err)
	}

	ctx := context.TODO()
	mongoClient, err := connect.Mongo(ctx, config)
	if err != nil {
		log.Fatal("Could not connect to mongo: ", err)
	}
	db = mongoClient.Database("rues-drop")

	defer mongoClient.Disconnect(ctx)

	createProjects()
	createTasks()

}

func createProjects() {
	collection := db.Collection("projects")

	_, err := collection.InsertMany(context.Background(), []any{dymension, lava, hyperlane})
	if err != nil {
		log.Fatal(err)
	}

}

func createTasks() {
	collection := db.Collection("tasks")

	_, err := collection.InsertMany(context.Background(), tasks)
	if err != nil {
		log.Fatal(err)
	}
}
