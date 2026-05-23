package database

import (
	"v-park/internal/loggers"
	"v-park/internal/models"

	"gorm.io/gorm"
)

func MigrateAllModels(db *gorm.DB) error {
	logger := loggers.DatabaseMigrateLogger
	if logger != nil {
		logger.Info("starting database migration")
	}

	if err := db.AutoMigrate(
		&models.User{},
		&models.Token{},
		&models.Pengunjung{},
		&models.Petugas{},
		&models.LokasiMall{},
		&models.FotoLokasiMall{},
		&models.TempatParkir{},
		&models.Monitoring{},
		&models.Booking{},
		&models.RiwayatBooking{},
		&models.MetodePembayaran{},
		&models.Pembayaran{},
	); err != nil {
		if logger != nil {
			logger.Error("auto migration failed", "error", err)
		}
		return err
	}

	constraints := []struct {
		model any
		name  string
	}{
		{model: &models.Token{}, name: "User"},
		{model: &models.Pengunjung{}, name: "User"},
		{model: &models.Petugas{}, name: "User"},
		{model: &models.TempatParkir{}, name: "LokasiMall"},
		{model: &models.FotoLokasiMall{}, name: "LokasiMall"},
		{model: &models.Monitoring{}, name: "Petugas"},
		{model: &models.Monitoring{}, name: "TempatParkir"},
		{model: &models.Booking{}, name: "Pengunjung"},
		{model: &models.Booking{}, name: "TempatParkir"},
		{model: &models.RiwayatBooking{}, name: "Booking"},
		{model: &models.Pembayaran{}, name: "Booking"},
	}

	for _, item := range constraints {
		if err := db.Migrator().CreateConstraint(item.model, item.name); err != nil {
			if logger != nil {
				logger.Error("create constraint failed", "constraint", item.name, "error", err)
			}
			return err
		}
	}

	if logger != nil {
		logger.Info("database migration completed")
	}

	return nil
}
