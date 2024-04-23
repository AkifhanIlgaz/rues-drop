package cfg

import (
	"fmt"

	"github.com/spf13/viper"
)

type Config struct {
	GoogleApplicationCredentials string `mapstructure:"GOOGLE_APPLICATION_CREDENTIALS"`

	MongoUri    string `mapstructure:"MONGODB_LOCAL_URI"`
	MongoDbName string `mapstructure:"MONGO_DATABASE_NAME"`

	Port string `mapstructure:"PORT"`
}

func LoadConfig(path string) (*Config, error) {
	viper.AddConfigPath(path)
	viper.SetConfigType("env")
	viper.SetConfigName("app")

	viper.AutomaticEnv()

	if err := viper.ReadInConfig(); err != nil {
		return nil, fmt.Errorf("load config: %w", err)
	}

	var config Config
	if err := viper.Unmarshal(&config); err != nil {
		return nil, fmt.Errorf("load config: %w", err)
	}

	return &config, nil
}
