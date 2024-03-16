package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Moderator struct {
	Id       primitive.ObjectID `bson:"_id,omitempty"`
	Uid      string             `json:"uid"`
	Username string             `json:"username"`
	Projects []string           `json:"projects"`
}

type ModeratorToAdd struct {
	Username string   `json:"username"`
	Password string   `json:"password"`
	Projects []string `json:"projects"`
}

type ModeratorToDelete struct {
	Uid         string `json:"uid" binding:"required"`
	ProjectName string `json:"projectName" binding:"required"`
}
