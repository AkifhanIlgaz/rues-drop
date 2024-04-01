package services

import (
	"context"
	"errors"
	"fmt"

	"github.com/AkifhanIlgaz/word-memory/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type ProjectService struct {
	client *mongo.Client

	ctx context.Context
}

func NewProjectService(ctx context.Context, client *mongo.Client) *ProjectService {
	return &ProjectService{
		client: client,
		ctx:    ctx,
	}
}

func (service *ProjectService) Create(project *models.Project) error {
	if service.isExist(project.Name) {
		return fmt.Errorf("duplicate project")
	}

	info := service.client.Database(project.Name).Collection(collectionInfo)
	_, err := info.InsertOne(service.ctx, project)
	if err != nil {
		return fmt.Errorf("create project: %w", err)
	}

	return nil
}

func (service *ProjectService) GetProjects(names ...string) ([]models.Project, error) {
	if len(names) == 0 {
		names = service.projectNames()
	}

	var projects []models.Project
	var err error

	for _, name := range names {
		var p models.Project

		info := service.client.Database(name).Collection(collectionInfo)

		err := info.FindOne(service.ctx, bson.M{}).Decode(&p)
		if err != nil {
			err = errors.Join(err, fmt.Errorf("%v | ", name))
			continue
		}

		projects = append(projects, p)
	}

	if err != nil {
		return []models.Project{}, fmt.Errorf("get projects: %w", err)
	}

	return projects, nil
}

func (service *ProjectService) DeleteProject(name string) error {
	err := service.client.Database(name).Drop(service.ctx)
	if err != nil {
		return fmt.Errorf("delete projects: %w", err)
	}

	return nil
}

func (service *ProjectService) EditProject(name string, update map[string]string) error {
	info := service.client.Database(name).Collection(collectionInfo)

	_, err := info.UpdateOne(service.ctx, bson.M{}, bson.M{
		"$set": update,
	})
	if err != nil {
		return fmt.Errorf("edit project: %w", err)
	}

	return nil
}

func (service *ProjectService) isExist(name string) bool {
	result, err := service.client.ListDatabaseNames(
		service.ctx,
		bson.M{"name": name})
	if err != nil {
		return false
	}

	return len(result) > 0
}

func (service *ProjectService) projectNames() []string {
	result, err := service.client.ListDatabaseNames(
		service.ctx,
		bson.M{})
	if err != nil {
		return []string{}
	}

	return result
}
