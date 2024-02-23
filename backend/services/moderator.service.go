package services

import (
	"context"

	"go.mongodb.org/mongo-driver/mongo"
)

const moderatorsCollection = "users"

type ModeratorService struct {
	collection *mongo.Collection
	ctx        context.Context
}

func NewModeratorService(ctx context.Context, db *mongo.Database) *ModeratorService {
	collection := db.Collection(moderatorsCollection)

	return &ModeratorService{
		collection: collection,
		ctx:        ctx,
	}
}
