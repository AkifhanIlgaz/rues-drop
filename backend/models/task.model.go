package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Task struct {
	Id          primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	ProjectId   primitive.ObjectID `json:"projectId"`
	Description string             `json:"description"`
	URL         string             `json:"url"`
	CreatedAt   time.Time          `json:"createdAt"`
}
