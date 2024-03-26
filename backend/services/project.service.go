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
	collection    *mongo.Collection
	modCollection *mongo.Collection
	ctx           context.Context
}

func NewProjectService(ctx context.Context, db *mongo.Database) *ProjectService {
	collection := db.Collection(projectsCollection)
	modCollection := db.Collection(moderatorsCollection)

	return &ProjectService{
		collection:    collection,
		modCollection: modCollection,
		ctx:           ctx,
	}
}

func (service *ProjectService) Create(project *models.Project) error {
	_, err := service.collection.InsertOne(service.ctx, project)

	if err != nil {
		return fmt.Errorf("create project: %w", err)
	}

	return nil
}

func (service *ProjectService) GetProjects(role interface{}, uid string) ([]models.Project, error) {
	var projects []models.Project
	var err error

	if role == "moderator" {
		projects, err = service.modProjects(uid)
		if err != nil {
			return nil, fmt.Errorf("get all projects: %w", err)
		}
	} else {
		projects, err = service.allProjects()
		if err != nil {
			return nil, fmt.Errorf("get all projects: %w", err)
		}
	}

	return projects, err
}

func (service *ProjectService) allProjects() ([]models.Project, error) {
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

func (service *ProjectService) modProjects(uid string) ([]models.Project, error) {
	var moderator models.Moderator
	modFilter := bson.M{
		"uid": uid,
	}

	if err := service.modCollection.FindOne(service.ctx, modFilter).Decode(&moderator); err != nil {
		return []models.Project{}, fmt.Errorf("get moderator projects: %w", err)
	}

	cursor, err := service.collection.Find(service.ctx, bson.M{"name": bson.M{"$in": moderator.Projects}})
	if err != nil {
		return []models.Project{}, fmt.Errorf("get moderator projects: %w", err)
	}

	var projects []models.Project
	if err := cursor.All(service.ctx, &projects); err != nil {
		return nil, fmt.Errorf("get moderator projects: %w", err)
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

func (service *ProjectService) EditProject(name string, update map[string]string) error {
	_, err := service.collection.UpdateOne(service.ctx, bson.M{"name": name}, bson.M{
		"$set": update,
	})
	if err != nil {
		return fmt.Errorf("edit project: %w", err)
	}

	return nil
}
