package services

import (
	"context"
	"fmt"

	"github.com/AkifhanIlgaz/word-memory/models"
	"go.mongodb.org/mongo-driver/mongo"
)

const moderatorsCollection = "moderators"

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

func (service *ModeratorService) CreateModerator(uid string, moderatorToAdd *models.ModeratorToAdd) error {
	moderator := models.Moderator{
		Uid:      uid,
		Username: moderatorToAdd.Username,
		Projects: moderatorToAdd.Projects,
	}

	_, err := service.collection.InsertOne(service.ctx, moderator)
	if err != nil {
		return fmt.Errorf("create moderator: %w", err)
	}

	return nil
}
