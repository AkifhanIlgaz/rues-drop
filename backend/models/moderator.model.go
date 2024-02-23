package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Moderator struct {
	Id       primitive.ObjectID
	Username string
	Projects []string
}

type ModeratorToAdd struct {
	Username string   `json:"username"`
	Password string   `json:"password"`
	Projects []string `json:"projects"`
}
