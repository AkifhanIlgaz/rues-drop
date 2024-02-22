package services

import (
	"context"
	"fmt"

	"github.com/AkifhanIlgaz/word-memory/models"
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

func (service *ProjectService) Create(project *models.Project) error {
	_, err := service.collection.InsertOne(service.ctx, project)

	if err != nil {
		return fmt.Errorf("create project: %w", err)
	}

	return nil
}
