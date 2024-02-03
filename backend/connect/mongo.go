package connect

import (
	"context"
	"fmt"

	"github.com/AkifhanIlgaz/word-memory/cfg"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

func Mongo(ctx context.Context, config *cfg.Config) (*mongo.Client, error) {
	mongoConn := options.Client().ApplyURI(config.MongoUri)

	client, err := mongo.Connect(ctx, mongoConn)
	if err != nil {
		return nil, fmt.Errorf(" connect to mongo: %w", err)
	}

	if err := client.Ping(ctx, readpref.Primary()); err != nil {
		return nil, fmt.Errorf("connect to mongo: %w", err)
	}

	fmt.Println("MongoDB successfully connected...")
	return client, nil
}
