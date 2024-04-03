package main

import (
	"context"
	"fmt"
	"log"

	"firebase.google.com/go/auth"
	"github.com/AkifhanIlgaz/word-memory/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var (
	moderators = []models.Moderator{
		{
			Id:       primitive.NewObjectID(),
			Username: "Enayi",
			Projects: []string{"Dymension", "Lava-Network"},
		},
		{
			Id:       primitive.NewObjectID(),
			Username: "Bakkalgazi",
			Projects: []string{"Lava-Network", "Hyperlane"},
		},
		{
			Id:       primitive.NewObjectID(),
			Username: "Rahil",
			Projects: []string{"Dymension", "Lava-Network", "Hyperlane"},
		},
	}
)

func createModerators() {
	err := client.Database("auth").Collection("moderators").Drop(context.Background())
	if err != nil {
		log.Fatal(err)
	}

	for _, mod := range moderators {
		if err := createMod(&mod); err != nil {
			log.Fatal(err)
		}
	}
}

func createMod(mod *models.Moderator) error {
	coll := client.Database("auth").Collection("moderators")

	var user *auth.UserRecord
	var err error

	newUser := &auth.UserToCreate{}
	// TODO: Update password
	newUser.Email(mod.Username + "@gmail.com").Password("123456789")

	user, err = authentication.CreateUser(context.Background(), newUser)
	if err != nil {
		if auth.IsEmailAlreadyExists(err) {
			user, err = authentication.GetUserByEmail(context.Background(), mod.Username+"@gmail.com")
			if err != nil {
				return fmt.Errorf("create : %w", err)
			}
		} else {
			return fmt.Errorf("create : %w", err)
		}
	}

	updateUser := &auth.UserToUpdate{}
	updateUser.CustomClaims(map[string]interface{}{
		"role":     "moderator",
		"projects": mod.Projects,
	})

	_, err = authentication.UpdateUser(context.Background(), user.UID, updateUser)
	if err != nil {
		return fmt.Errorf("create admin: %w", err)
	}
	mod.Uid = user.UID

	for _, project := range mod.Projects {
		moderators := client.Database(project).Collection("moderators")
		_, err = moderators.InsertOne(context.TODO(), bson.M{"uid": mod.Uid})
		if err != nil {
			return fmt.Errorf("create moderator: %w", err)
		}
	}

	_, err = coll.InsertOne(context.TODO(), mod)
	if err != nil {
		return fmt.Errorf("create moderator: %w", err)
	}

	return nil
}
