package main

import (
	"v-park/internal/database"
)

func main() {

	gormDB, err := database.DatabaseConnect()
	if err != nil {
	}

	if err := database.MigrateAllModels(gormDB); err != nil {
	}

	if err := database.SeedAllSeeders(gormDB); err != nil {
	}

}
