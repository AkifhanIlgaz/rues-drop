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

type Task struct {
	Id           primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	ProjectName  string             `json:"projectName,omitempty" bson:"-,omitempty"`
	Description  string             `json:"description"`
	URL          string             `json:"url"`
	Status       Status             `json:"status"`
	IsDone       bool               `json:"isDone" bson:"-"`
	IsBookmarked bool               `json:"isBookmarked" bson:"-"`
	CreatedAt    time.Time          `json:"createdAt"`
}

type TaskToAdd struct {
	ProjectName string `json:"projectName"`
	Description string `json:"description" binding:"required"`
	URL         string `json:"url" binding:"required"`
}

type TaskToEdit struct {
	TaskId      string `json:"-"`
	ProjectName string `json:"projectName"`
	Description string `json:"description,omitempty"`
	URL         string `json:"url,omitempty"`
}

type TaskAction struct {
	Id          primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	TaskId      primitive.ObjectID `json:"taskId" bson:"taskId" binding:"required"`
	UserId      string             `json:"userId" bson:"-" binding:"required"`
	ProjectName string             `json:"projectName" bson:"-" binding:"required"`
	Type        ActionType         `json:"type" bson:"type" binding:"required"`
	Timestamp   time.Time          `json:"timestamp" bson:"timestamp"`
	Info        string             `json:"info" bson:"info"`
}

type TaskResponse struct {
	Task
	IsDone       bool `json:"isDone"`
	IsBookmarked bool `json:"isBookmarked"`
}

func (t TaskToAdd) ConvertToTask() Task {
	return Task{
		ProjectName: t.ProjectName,
		Description: t.Description,
		URL:         t.URL,
		Status:      StatusInProgress,
		CreatedAt:   time.Now(),
	}
}
