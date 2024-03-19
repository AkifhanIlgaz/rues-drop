package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Moderator struct {
	Id       primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Uid      string             `json:"uid"`
	Username string             `json:"username"`
	Projects []string           `json:"projects"`
}

type ModeratorToCreate struct {
	Username string   `json:"username"`
	Password string   `json:"password"`
	Projects []string `json:"projects"`
}

type ModeratorToAdd struct {
	Id         string `json:"id" binding:"required"`
	ProjectName string `json:"projectName" binding:"required"`
}

type ModeratorToDelete struct {
	Uid         string `json:"uid" binding:"required"`
	ProjectName string `json:"projectName" binding:"required"`
}
