package services

import (
	"context"

	"go.mongodb.org/mongo-driver/mongo"
)

const tasksCollection = "tasks"

type TaskService struct {
	collection *mongo.Collection
	ctx        context.Context
}

func NewTaskService(ctx context.Context, db *mongo.Database) *TaskService {
	collection := db.Collection(tasksCollection)

	return &TaskService{
		collection: collection,
		ctx:        ctx,
	}
}
