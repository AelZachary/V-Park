package database

import (
	"v-park/internal/seeders"

	"gorm.io/gorm"
)

// SeedAllSeeders menjalankan semua seeder dalam satu transaction
func SeedAllSeeders(db *gorm.DB) error {
	if err := db.Transaction(func(tx *gorm.DB) error {

		pengunjungUsers, petugasUsers := seeders.UsersBulkSeeders(tx)

		pengunjungIDs := make([]uint, 0, len(pengunjungUsers))
		for _, user := range pengunjungUsers {
			pengunjungIDs = append(pengunjungIDs, user.IDUser)
		}
		seeders.PengunjungBulkSeeders(tx, pengunjungIDs)

		petugasUserIDs := make([]uint, 0, len(petugasUsers))
		for _, user := range petugasUsers {
			petugasUserIDs = append(petugasUserIDs, user.IDUser)
		}
		petugas := seeders.PetugasBulkSeeders(tx, petugasUserIDs)

		lokasiMall := seeders.LokasiMallBulkSeeders(tx)

		allTempatParkir := make([]uint, 0, len(lokasiMall)*60)
		for _, lokasi := range lokasiMall {
			tempatParkir := seeders.TempatParkirSeeders(tx, lokasi.IDLokasiMall)
			for _, item := range tempatParkir {
				allTempatParkir = append(allTempatParkir, item.IDTempatParkir)
			}
		}

		petugasIDs := make([]uint, 0, len(petugas))
		for _, item := range petugas {
			petugasIDs = append(petugasIDs, item.IDPetugas)
		}

		seeders.MonitoringBulkSeeders(tx, petugasIDs, allTempatParkir)

		return nil

	}); err != nil {
		return err
	}

	return nil
}
