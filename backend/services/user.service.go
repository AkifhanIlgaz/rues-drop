package services

import (
	"context"

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
