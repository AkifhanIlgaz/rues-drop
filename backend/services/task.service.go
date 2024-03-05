package services

import (
	"context"
	"fmt"

	"github.com/AkifhanIlgaz/word-memory/models"
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

func (service *TaskService) Create(taskToAdd *models.TaskToAdd) error {
	task := taskToAdd.ConvertToTask()

	_, err := service.collection.InsertOne(service.ctx, task)
	if err != nil {
		return fmt.Errorf("create task: %w", err)
	}

	return nil
}
