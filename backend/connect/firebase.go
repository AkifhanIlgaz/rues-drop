package connect

import (
	"context"
	"fmt"

	firebase "firebase.google.com/go"
	"github.com/AkifhanIlgaz/word-memory/cfg"
	"google.golang.org/api/option"
)

func Firebase(ctx context.Context, config *cfg.Config) (*firebase.App, error) {
	opt := option.WithCredentialsFile(config.GoogleApplicationCredentials)

	app, err := firebase.NewApp(ctx, nil, opt)
	if err != nil {
		return nil, fmt.Errorf("new app: %w", err)
	}

	return app, nil
}
