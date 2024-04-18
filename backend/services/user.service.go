package services

import (
	"context"
	"fmt"

	"github.com/AkifhanIlgaz/word-memory/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserService struct {
	client *mongo.Client
	ctx    context.Context
}

func NewUserService(ctx context.Context, client *mongo.Client) *UserService {
	return &UserService{
		client: client,
		ctx:    ctx,
	}
}

func (service *UserService) Create(user models.User) error {
	users := service.client.Database("auth").Collection(collectionUsers)

	_, err := users.InsertOne(service.ctx, user)
	if err != nil {
		return fmt.Errorf("create user: %w", err)
	}

	return nil
}

func (service *UserService) Bookmark(uid string, project string) error {
	filter := bson.M{"uid": uid}
	update := bson.M{"$addToSet": bson.M{"bookmarks": project}}

	users := service.client.Database("auth").Collection(collectionUsers)

	result, err := users.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return fmt.Errorf("bookmark project: %w", err)
	}
	if result.MatchedCount == 0 {
		return fmt.Errorf("cannot found user: %v", uid)
	}

	return nil
}

func (service *UserService) RemoveBookmark(uid string, project string) error {
	filter := bson.M{"uid": uid}
	update := bson.M{"$pull": bson.M{"bookmarks": project}}

	users := service.client.Database("auth").Collection(collectionUsers)

	result, err := users.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return fmt.Errorf("bookmark project: %w", err)
	}
	if result.MatchedCount == 0 {
		return fmt.Errorf("cannot found user: %v", uid)
	}

	return nil
}
