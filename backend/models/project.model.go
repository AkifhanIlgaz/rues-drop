package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Project struct {
	Id      primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Name    string             `json:"projectName" bson:"name"`
	Website string             `json:"website"`
	Discord string             `json:"discord"`
	Twitter string             `json:"twitter"`
	Rues    string             `json:"rues"`
	Logo    string             `json:"logo"`
	// TODO: Add todos
}
