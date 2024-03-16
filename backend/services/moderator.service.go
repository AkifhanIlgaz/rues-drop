package services

import (
	"context"
	"fmt"

	"github.com/AkifhanIlgaz/word-memory/models"
	"go.mongodb.org/mongo-driver/bson"
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

func (service *ModeratorService) DeleteModerator(modToDelete models.ModeratorToDelete) error {
	filter := bson.M{"uid": modToDelete.Uid}
	update := bson.M{"$pull": bson.M{"projects": modToDelete.ProjectName}}

	_, err := service.collection.UpdateOne(service.ctx, filter, update)
	if err != nil {
		return fmt.Errorf("delete moderator: %w", err)
	}

	return nil
}

func (service *ModeratorService) GetModerators(projectName string) ([]models.Moderator, error) {
	var moderators []models.Moderator

	cur, err := service.collection.Find(service.ctx, bson.M{
		"projects": projectName,
	})
	if err != nil {
		return nil, fmt.Errorf("get moderators: %w", err)
	}

	err = cur.All(service.ctx, &moderators)
	if err != nil {
		return nil, fmt.Errorf("get moderators: %w", err)
	}

	return moderators, nil
}

func (service *ModeratorService) AllModerators() ([]models.Moderator, error) {
	var moderators []models.Moderator

	cur, err := service.collection.Find(service.ctx, bson.M{})
	if err != nil {
		return nil, fmt.Errorf("get moderators: %w", err)
	}

	err = cur.All(service.ctx, &moderators)
	if err != nil {
		return nil, fmt.Errorf("get moderators: %w", err)
	}

	return moderators, nil
}
