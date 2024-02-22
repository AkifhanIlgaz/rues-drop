package services

import (
	"context"

	"go.mongodb.org/mongo-driver/mongo"
)

const projectsCollection = "projects"

type ProjectService struct {
	collection *mongo.Collection
	ctx        context.Context
}

func NewProjectService(ctx context.Context, db *mongo.Database) *ProjectService {
	collection := db.Collection(projectsCollection)

	return &ProjectService{
		collection: collection,
		ctx:        ctx,
	}
}
