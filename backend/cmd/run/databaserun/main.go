package main

import (
	"os"

	"v-park/internal/database"
	"v-park/internal/loggers"
)

func main() {
	env := os.Getenv("APP_ENV")
	if env == "" {
		env = "dev"
	}
	loggers.Init(env)
	loggers.InitDatabase()

	gormDB, err := database.DatabaseConnect()
	if err != nil {
		if logger := loggers.DatabaseGormLogger; logger != nil {
			logger.Error("failed to connect database", "error", err)
		}
		return
	}

	if err := database.MigrateAllModels(gormDB); err != nil {
		if logger := loggers.DatabaseMigrateLogger; logger != nil {
			logger.Error("failed to migrate models", "error", err)
		}
		return
	}

	if err := database.SeedAllSeeders(gormDB); err != nil {
		if logger := loggers.DatabaseSeedLogger; logger != nil {
			logger.Error("failed to seed database", "error", err)
		}
		return
	}

}
