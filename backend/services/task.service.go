package services

import (
	"context"
	"fmt"

	"github.com/AkifhanIlgaz/word-memory/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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

func (service *TaskService) Delete(taskId string) error {
	id, err := primitive.ObjectIDFromHex(taskId)
	if err != nil {
		return fmt.Errorf("delete task: %w", err)
	}

	filter := bson.M{
		"_id": id,
	}

	_, err = service.collection.DeleteOne(service.ctx, filter)
	if err != nil {
		return fmt.Errorf("delete task: %w", err)
	}

	return nil
}

func (service *TaskService) Finish(taskId string) error {
	id, err := primitive.ObjectIDFromHex(taskId)
	if err != nil {
		return fmt.Errorf("delete task: %w", err)
	}

	filter := bson.M{
		"_id": id,
	}

	err = service.collection.FindOneAndUpdate(service.ctx, filter, bson.M{
		"$set": bson.M{
			"status": models.StatusFinished,
		},
	}).Err()
	if err != nil {
		return fmt.Errorf("delete task: %w", err)
	}

	return nil
}

func (service *TaskService) Edit(taskToEdit models.TaskToEdit) error {
	id, err := primitive.ObjectIDFromHex(taskToEdit.TaskId)
	if err != nil {
		return fmt.Errorf("edit task: %w", err)
	}

	filter := bson.M{
		"_id": id,
	}
	edit := bson.M{
		"$set": bson.M{
			"description": taskToEdit.Description,
			"url":         taskToEdit.URL,
		},
	}

	if err := service.collection.FindOneAndUpdate(service.ctx, filter, edit).Err(); err != nil {
		return fmt.Errorf("delete task: %w", err)

	}

	return nil
}

func (service *TaskService) GetTasks(projectId string) ([]models.Task, error) {
	id, err := primitive.ObjectIDFromHex(projectId)
	if err != nil {
		return nil, fmt.Errorf("get all tasks: %w", err)
	}

	filter := bson.M{
		"projectId": id,
	}
	cur, err := service.collection.Find(service.ctx, filter)
	if err != nil {
		return nil, fmt.Errorf("get all tasks: %w", err)
	}

	var tasks []models.Task
	if err := cur.All(service.ctx, &tasks); err != nil {
		return nil, fmt.Errorf("get all tasks: %w", err)
	}

	return tasks, nil
}
