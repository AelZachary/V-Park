package seeders

import (
	"fmt"

	"v-park/internal/models"

	"gorm.io/gorm"
)

func PengunjungSeeders(db *gorm.DB, userID uint) models.Pengunjung {
	result := PengunjungBulkSeeders(db, []uint{userID})
	if len(result) == 0 {
		panic("failed to seed pengunjung")
	}
	return result[0]
}

func PengunjungBulkSeeders(db *gorm.DB, userIDs []uint) []models.Pengunjung {
	jenisKendaraan := []string{"Mobil", "Motor", "SUV", "Sedan"}
	prefixPlat := []string{"B", "D", "F", "AB", "L", "N"}

	result := make([]models.Pengunjung, 0, len(userIDs))
	for i, userID := range userIDs {
		pengunjung := models.Pengunjung{
			IDUser:         userID,
			NoHandphone:    fmt.Sprintf("08123456%04d", i+1),
			JenisKendaraan: jenisKendaraan[i%len(jenisKendaraan)],
			PlatKendaraan:  fmt.Sprintf("%s %04d XX", prefixPlat[i%len(prefixPlat)], 1000+i),
		}

		if err := db.Where("id_user = ?", userID).
			Assign(models.Pengunjung{
				NoHandphone:    pengunjung.NoHandphone,
				JenisKendaraan: pengunjung.JenisKendaraan,
				PlatKendaraan:  pengunjung.PlatKendaraan,
			}).
			FirstOrCreate(&pengunjung).Error; err != nil {
			panic(fmt.Sprintf("Failed to seed pengunjung user %d: %v", userID, err))
		}

		result = append(result, pengunjung)
	}

	return result
}
