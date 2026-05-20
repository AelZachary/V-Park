package database

import (
	"v-park/internal/models"

	"gorm.io/gorm"
)

func MigrateAllModels(db *gorm.DB) error {
	if err := db.AutoMigrate(
		&models.User{},
		&models.Pengunjung{},
		&models.Petugas{},
		&models.LokasiMall{},
		&models.TempatParkir{},
		&models.Monitoring{},
		&models.Booking{},
		&models.RiwayatBooking{},
		&models.MetodePembayaran{},
		&models.Pembayaran{},
	); err != nil {
		return err
	}

	constraints := []struct {
		model any
		name  string
	}{
		{model: &models.Pengunjung{}, name: "User"},
		{model: &models.Petugas{}, name: "User"},
		{model: &models.TempatParkir{}, name: "LokasiMall"},
		{model: &models.Monitoring{}, name: "Petugas"},
		{model: &models.Monitoring{}, name: "TempatParkir"},
		{model: &models.Booking{}, name: "Pengunjung"},
		{model: &models.Booking{}, name: "TempatParkir"},
		{model: &models.RiwayatBooking{}, name: "Booking"},
		{model: &models.Pembayaran{}, name: "Booking"},
	}

	for _, item := range constraints {
		if err := db.Migrator().CreateConstraint(item.model, item.name); err != nil {
			return err
		}
	}

	return nil
}
