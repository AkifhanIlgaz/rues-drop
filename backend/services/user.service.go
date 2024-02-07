package services

import (
	"context"

	"go.mongodb.org/mongo-driver/mongo"
)

const usersCollection = "users"

type UserService struct {
	collection *mongo.Collection
	ctx        context.Context
}

func NewUserService(ctx context.Context, db *mongo.Database) *UserService {
	collection := db.Collection(usersCollection)

	return &UserService{
		collection: collection,
		ctx:        ctx,
	}
}
