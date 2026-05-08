package database

import (
	"v-park/internal/models"

	"gorm.io/gorm"
)

func MigrateAllModels(db *gorm.DB) error {
	return db.AutoMigrate(
		&models.User{},
		&models.Pengunjung{},
		&models.Petugas{},
	)
}
