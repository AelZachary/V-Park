package seeders

import (
	"fmt"

	"v-park/internal/models"

	"gorm.io/gorm"
)

func PengunjungSeeders(db *gorm.DB, userID uint) models.Pengunjung {
	pengunjung := models.Pengunjung{
		IDUser:         userID,
		Nohandphone:    "081234567890",
		JenisKendaraan: "Mobil",
		PlatKendaraan:  "AB 1234 CD",
	}

	if err := db.Where("id_user = ?", userID).
		Assign(models.Pengunjung{
			Nohandphone:    "081234567890",
			JenisKendaraan: "Mobil",
			PlatKendaraan:  "AB 1234 CD",
		}).
		FirstOrCreate(&pengunjung).Error; err != nil {
		panic(fmt.Sprintf("Failed to seed pengunjung: %v", err))
	}

	return pengunjung
}
