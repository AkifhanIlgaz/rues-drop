package main

import (
	"context"
	"fmt"
	"log"

	"firebase.google.com/go/auth"
	"github.com/AkifhanIlgaz/word-memory/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var (
	moderators = []models.Moderator{
		{
			Id:       primitive.NewObjectID(),
			Username: "Enayi",
			Projects: []string{"Dymension", "Lava Network"},
		},
		{
			Id:       primitive.NewObjectID(),
			Username: "Bakkalgazi",
			Projects: []string{"Lava Network", "Hyperlane"},
		},
		{
			Id:       primitive.NewObjectID(),
			Username: "Rahil",
			Projects: []string{"Dymension", "Lava Network", "Hyperlane"},
		},
	}
)

func createModerators() {
	for _, mod := range moderators {
		if err := createMod(&mod); err != nil {
			log.Fatal(err)
			continue
		}
	}
}

func createMod(mod *models.Moderator) error {
	newUser := &auth.UserToCreate{}
	newUser.Email(mod.Username + "@gmail.com").Password("123456789")

	user, err := authentication.CreateUser(context.Background(), newUser)
	if err != nil {
		return fmt.Errorf("create : %w", err)
	}

	updateUser := &auth.UserToUpdate{}
	updateUser.CustomClaims(map[string]interface{}{
		"projects": mod.Projects,
	})

	_, err = authentication.UpdateUser(context.Background(), user.UID, updateUser)
	if err != nil {
		return fmt.Errorf("create admin: %w", err)
	}
	mod.Uid = user.UID

	collection := db.Collection("moderators")

	_, err = collection.InsertOne(context.TODO(), mod)
	if err != nil {
		return fmt.Errorf("create moderator: %w", err)
	}

	return nil
}
