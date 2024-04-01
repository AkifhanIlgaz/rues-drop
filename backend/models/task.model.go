package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ActionType string

const (
	ActionDone           ActionType = "Done"
	ActionUndo           ActionType = "Undo"
	ActionBookmark       ActionType = "Bookmark"
	ActionRemoveBookmark ActionType = "Remove"
)

type Status string

const (
	StatusFinished   Status = "Finished"
	StatusInProgress Status = "In Progress"
)

// ? Do I need projectName on Task struct

type Task struct {
	Id          primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	ProjectName string             `json:"projectName" bson:"-"`
	Description string             `json:"description"`
	URL         string             `json:"url"`
	Status      Status             `json:"status"`
	CreatedAt   time.Time          `json:"createdAt"`
}

type TaskToAdd struct {
	ProjectName primitive.ObjectID `json:"projectName"`
	Description string             `json:"description" binding:"required"`
	URL         string             `json:"url" binding:"required"`
}

type TaskToEdit struct {
	TaskId      string `json:"-"`
	Description string `json:"description,omitempty"`
	URL         string `json:"url,omitempty"`
}

type TaskAction struct {
	Id     primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	TaskId primitive.ObjectID `json:"taskId" bson:"taskId"`
	UserId string             `json:"userId" bson:"userId"`
	Type   ActionType         `json:"type" bson:"type"`
	Info   string             `json:"info" bson:"info"`
}

func (t TaskToAdd) ConvertToTask() Task {
	return Task{
		Description: t.Description,
		URL:         t.URL,
		Status:      StatusInProgress,
		CreatedAt:   time.Now(),
	}
}
