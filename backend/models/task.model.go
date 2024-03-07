package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

const StatusFinished = "Finished"
const StatusInProgress = "In Progress"

type Task struct {
	Id          primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	ProjectId   primitive.ObjectID `json:"projectId" bson:"projectId"`
	Description string             `json:"description"`
	URL         string             `json:"url"`
	Status      string             `json:"status"`
	CreatedAt   time.Time          `json:"createdAt"`
}

type TaskToAdd struct {
	ProjectId   primitive.ObjectID `json:"projectId"`
	Description string             `json:"description"`
	URL         string             `json:"url"`
}

func (t TaskToAdd) ConvertToTask() Task {
	return Task{
		ProjectId:   t.ProjectId,
		Description: t.Description,
		URL:         t.URL,
		Status:      StatusInProgress,
		CreatedAt:   time.Now(),
	}
}
