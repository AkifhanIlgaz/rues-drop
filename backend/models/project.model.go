package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Project struct {
	Id      primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Name    string             `json:"projectName" bson:"name"`
	Website string             `json:"website"`
	Discord string             `json:"discord"`
	Twitter string             `json:"twitter"`
	Logo    string             `json:"logo"`
	// TODO: Add links || Additional info (Rues tweet, github etc.)
	// TODO: Add todos
}
