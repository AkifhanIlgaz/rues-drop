package main

import (
	"context"
	"log"
	"time"

	"github.com/AkifhanIlgaz/word-memory/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

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

func createProjects() {
	collection := db.Collection("projects")

	_, err := collection.InsertMany(context.Background(), []any{dymension, lava, hyperlane})
	if err != nil {
		log.Fatal(err)
	}
}
