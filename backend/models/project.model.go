package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Project struct {
	Id           primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Name         string             `json:"projectName" bson:"name"`
	Website      string             `json:"website"`
	Discord      string             `json:"discord"`
	Twitter      string             `json:"twitter"`
	Logo         string             `json:"logo"`
	Tasks        []string           `json:"tasks"`
	CreatedAt    time.Time          `json:"createdAt"`
	LastUpdate   time.Time          `json:"lastUpdate"`
	LastUpdateBy string             `json:"lastUpdateBy"`
}
