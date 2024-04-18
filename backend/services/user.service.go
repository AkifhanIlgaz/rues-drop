package services

import (
	"context"
	"fmt"

	"github.com/AkifhanIlgaz/word-memory/models"
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
