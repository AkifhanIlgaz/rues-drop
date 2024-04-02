package services

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"fmt"
	"log"

	"github.com/AkifhanIlgaz/word-memory/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

const tasksCollection = "tasks"
const actionsCollection = "actions"

// TODO: Create helper functions to get database and collections for project

type TaskService struct {
	client *mongo.Client
	ctx    context.Context
}

func NewTaskService(ctx context.Context, client *mongo.Client) *TaskService {
	return &TaskService{
		client: client,
		ctx:    ctx,
	}
}

func (service *TaskService) Create(taskToAdd *models.TaskToAdd) error {
	task := taskToAdd.ConvertToTask()

	tasks := service.client.Database(task.ProjectName).Collection(collectionTasks)

	_, err := tasks.InsertOne(service.ctx, task)
	if err != nil {
		return fmt.Errorf("create task: %w", err)
	}

	return nil
}

func (service *TaskService) Delete(taskId string, project string) error {
	id, err := primitive.ObjectIDFromHex(taskId)
	if err != nil {
		return fmt.Errorf("delete task: %w", err)
	}

	filter := bson.M{
		"_id": id,
	}

	tasks := service.client.Database(project).Collection(collectionTasks)

	_, err = tasks.DeleteOne(service.ctx, filter)
	if err != nil {
		return fmt.Errorf("delete task: %w", err)
	}

	return nil
}

func (service *TaskService) Finish(taskId string, project string) error {
	id, err := primitive.ObjectIDFromHex(taskId)
	if err != nil {
		return fmt.Errorf("delete task: %w", err)
	}

	filter := bson.M{
		"_id": id,
	}

	tasks := service.client.Database(project).Collection(collectionTasks)

	err = tasks.FindOneAndUpdate(service.ctx, filter, bson.M{
		"$set": bson.M{
			"status": models.StatusFinished,
		},
	}).Err()
	if err != nil {
		return fmt.Errorf("delete task: %w", err)
	}

	return nil
}

func (service *TaskService) Action(action models.TaskAction) error {
	var err error

	switch action.Type {
	case models.ActionDone, models.ActionBookmark:
		err = service.insert(action)
	case models.ActionUndo, models.ActionRemoveBookmark:
		err = service.remove(action)
	default:
		err = errors.New("unknown action type")
	}

	if err != nil {
		err = fmt.Errorf("action: %w", err)
	}

	return err
}

func (service *TaskService) insert(action models.TaskAction) error {
	id := uidToObjId(action.UserId, action.ProjectName)
	update := bson.M{"$push": bson.M{"actions": action}}

	actions := service.client.Database(action.ProjectName).Collection(collectionActions)
	_, err := actions.UpdateByID(service.ctx, id, update)
	if err != nil {
		return fmt.Errorf("insert action: %w", err)
	}

	return nil
}

func (service *TaskService) remove(action models.TaskAction) error {
	id := uidToObjId(action.UserId, action.ProjectName)
	update := bson.M{"$pull": bson.M{
		"taskId": action.TaskId,
		"type":   action.Type,
	}}

	actions := service.client.Database(action.ProjectName).Collection(collectionActions)
	res, err := actions.UpdateByID(service.ctx, id, update)
	if err != nil {
		return fmt.Errorf("undo: %w", err)
	}

	if res.ModifiedCount == 0 {
		return fmt.Errorf("cannot found action: %v", action.Id)
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

	tasks := service.client.Database(taskToEdit.ProjectName).Collection(collectionTasks)

	if err := tasks.FindOneAndUpdate(service.ctx, filter, edit).Err(); err != nil {
		return fmt.Errorf("delete task: %w", err)

	}

	return nil
}

func (service *TaskService) GetTasks(projectName string) ([]models.Task, error) {
	tasksColl := service.client.Database(projectName).Collection(collectionTasks)

	cur, err := tasksColl.Find(service.ctx, bson.M{})
	if err != nil {
		return nil, fmt.Errorf("get all tasks: %w", err)
	}

	var tasks []models.Task
	if err := cur.All(service.ctx, &tasks); err != nil {
		return nil, fmt.Errorf("get all tasks: %w", err)
	}

	return tasks, nil
}

func uidToObjId(uid string, project string) primitive.ObjectID {
	h := sha256.Sum256([]byte(uid + project))
	hash := hex.EncodeToString(h[:])

	id, err := primitive.ObjectIDFromHex(hash[:24])
	if err != nil {
		log.Fatal(err)
	}

	return id
}
