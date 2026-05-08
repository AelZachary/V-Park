package database

import (
	"v-park/internal/seeders"

	"gorm.io/gorm"
)

// SeedAllSeeders menjalankan semua seeder dalam satu transaction
func SeedAllSeeders(db *gorm.DB) error {
	if err := db.Transaction(func(tx *gorm.DB) error {

		pengunjungUser, petugasUser := seeders.UsersSeeders(tx)
		seeders.PengunjungSeeders(tx, pengunjungUser.IDUser)
		seeders.PetugasSeeders(tx, petugasUser.IDUser)

		return nil
	}); err != nil {
		return err
	}
	return nil
}
