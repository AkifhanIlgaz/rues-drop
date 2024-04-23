package services

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"log"

	"github.com/AkifhanIlgaz/word-memory/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

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
		return fmt.Errorf("edit task: %w", err)

	}

	return nil
}

func (service *TaskService) GetTasks(projectName string) ([]models.Task, error) {
	return service.allTasks(projectName)
}

func (service *TaskService) allTasks(projectName string) ([]models.Task, error) {
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

// TODO: Use aggregation pipeline
func (service *TaskService) GetTasksWithState(projectName string, uid string) ([]models.Task, error) {
	tasks, err := service.GetTasks(projectName)
	if err != nil {
		return nil, fmt.Errorf("get tasks with state: %w", err)
	}

	// TODO: Convert to map ?
	_, err = service.GetActions(projectName, uid)
	if err != nil {
		return nil, fmt.Errorf("get tasks with state: %w", err)
	}

	// for i, task := range tasks {
	// 	for _, a := range filterActionByTask(task.Id, actions) {
	// 		switch a.Type {
	// 		case models.ActionDone:
	// 			tasks[i].IsDone = true
	// 		case models.ActionBookmark:
	// 			tasks[i].IsBookmarked = true
	// 		}
	// 	}
	// }

	return tasks, nil
}

func (service *TaskService) Done(action models.TaskAction) error {
	id := uidToObjId(action.UserId, action.ProjectName)
	update := bson.M{"$push": bson.M{"actions": action}}

	actions := service.client.Database(action.ProjectName).Collection(collectionActions)

	res, err := actions.UpdateByID(service.ctx, id, update)
	if err != nil {
		return fmt.Errorf("insert action: %w", err)
	}

	if res.MatchedCount == 0 {
		_, err := actions.InsertOne(context.Background(), bson.M{
			"_id":     id,
			"actions": []models.TaskAction{action},
		})
		if err != nil {
			return fmt.Errorf("insert action: %w", err)
		}
	}

	return nil
}

func (service *TaskService) Undo(action models.TaskAction) error {
	id := uidToObjId(action.UserId, action.ProjectName)

	update := bson.M{"$pull": bson.M{
		"actions": bson.M{
			"taskId": action.TaskId,
		},
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

func (service *TaskService) GetActions(projectName string, uid string) ([]models.TaskAction, error) {
	filter := bson.M{
		"_id": uidToObjId(uid, projectName),
	}
	coll := service.client.Database(projectName).Collection(collectionActions)

	var val struct {
		Actions []models.TaskAction
	}

	if err := coll.FindOne(service.ctx, filter).Decode(&val); err != nil {
		return nil, fmt.Errorf("get actions for the user: %w", err)
	}

	return val.Actions, nil
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

func filterActionByTask(taskId primitive.ObjectID, actions []models.TaskAction) []models.TaskAction {
	var filteredActions []models.TaskAction

	for _, action := range actions {
		if action.TaskId == taskId {
			filteredActions = append(filteredActions, action)
		}
	}

	return filteredActions
}
