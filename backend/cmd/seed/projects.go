package main

import (
	"context"
	"fmt"
	"log"
	"strings"
	"time"

	"github.com/AkifhanIlgaz/word-memory/models"
)

var (
	dymension = models.Project{
		Name:      "Dymension",
		Website:   "https://dymension.xyz/",
		Discord:   "https://discord.com/invite/dymension",
		Twitter:   "https://twitter.com/dymension",
		Logo:      "https://s2.coinmarketcap.com/static/img/coins/64x64/28932.png",
		CreatedAt: time.Now(),
	}
	lava = models.Project{
		Name:      "Lava-Network",
		Website:   "https://www.lavanet.xyz/",
		Discord:   "https://discord.com/invite/Tbk5NxTCdA",
		Twitter:   "https://twitter.com/lavanetxyz",
		Logo:      "https://pbs.twimg.com/profile_images/1628433459977850882/l4oqDz8R_400x400.jpg",
		CreatedAt: time.Now(),
	}
	hyperlane = models.Project{
		Name:      "Hyperlane",
		Website:   "https://www.hyperlane.xyz/",
		Discord:   "http://discord.gg/hyperlane",
		Twitter:   "https://twitter.com/Hyperlane_xyz",
		Logo:      "https://pbs.twimg.com/profile_images/1671589406816313345/wGzRPeEf_400x400.jpg",
		CreatedAt: time.Now(),
	}
)

func createProjects() {
	for _, project := range []models.Project{dymension, lava, hyperlane} {

		err := client.Database(project.Name).Drop(context.TODO())
		if err != nil {
			fmt.Println(err)
			log.Fatal("cannot drop: ", project.Name)
		}

		_, err = client.Database(project.Name).Collection("info").InsertOne(context.TODO(), project)
		if err != nil {
			log.Fatal("cannot insert info for:", project.Name)
		}
	}
}

func serializeName(name string) string {
	return strings.Join(strings.Fields(name), "-")
}
