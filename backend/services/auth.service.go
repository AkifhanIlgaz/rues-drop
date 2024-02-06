package services

import (
	"context"
	"fmt"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"
)

type AuthService struct {
	client *auth.Client
	ctx    context.Context
}

func NewAuthService(ctx context.Context, app *firebase.App) (*AuthService, error) {
	auth, err := app.Auth(ctx)
	if err != nil {
		return nil, fmt.Errorf("new auth service: %w", err)
	}

	return &AuthService{
		client: auth,
		ctx:    ctx,
	}, nil
}

func (service *AuthService) GetUidByIdToken(idToken string) (string, error) {
	token, err := service.client.VerifyIDToken(service.ctx, idToken)
	if err != nil {
		return "", fmt.Errorf("get uid by idToken: %w", err)
	}

	return token.UID, nil
}