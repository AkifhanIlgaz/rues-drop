package services

import (
	"context"
	"fmt"

	"github.com/AkifhanIlgaz/word-memory/models"
	"go.mongodb.org/mongo-driver/bson"
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

func (service *ProjectService) AllProjects() ([]models.Project, error) {
	cursor, err := service.collection.Find(service.ctx, bson.M{})
	if err != nil {
		return nil, fmt.Errorf("get all projects: %w", err)
	}

	var projects []models.Project

	if err := cursor.All(service.ctx, &projects); err != nil {
		return nil, fmt.Errorf("get all projects: %w", err)
	}

	return projects, nil
}

func (service *ProjectService) GetProjectByName(name string) (*models.Project, error) {
	res := service.collection.FindOne(service.ctx, bson.M{
		"name": name,
	})

	var project models.Project

	if err := res.Decode(&project); err != nil {
		return nil, fmt.Errorf("get project by id: %w", err)
	}

	return &project, nil
}

func (service *ProjectService) DeleteProject(name string) error {
	res, err := service.collection.DeleteOne(service.ctx, bson.M{
		"name": name,
	})
	if err != nil {
		return fmt.Errorf("delete project: %w", err)
	}

	if res.DeletedCount == 0 {
		return fmt.Errorf("cannot found the project %v: %w", name, err)
	}

	return nil
}
