package seeders

import (
	"fmt"

	"v-park/internal/models"

	"gorm.io/gorm"
)

func LokasiMallSeeders(db *gorm.DB) models.LokasiMall {
	result := LokasiMallBulkSeeders(db)
	if len(result) == 0 {
		panic("failed to seed lokasi mall")
	}
	return result[0]
}

func LokasiMallBulkSeeders(db *gorm.DB) []models.LokasiMall {
	addresses := []string{
		"Jl. Sudirman No. 1, Jakarta",
		"Jl. Asia Afrika No. 17, Bandung",
		"Jl. Pemuda No. 22, Semarang",
		"Jl. Basuki Rahmat No. 9, Surabaya",
		"Jl. Malioboro No. 33, Yogyakarta",
		"Jl. Riau No. 7, Pekanbaru",
	}

	result := make([]models.LokasiMall, 0, len(addresses))
	for _, address := range addresses {
		lokasiMall := models.LokasiMall{AlamatLokasi: address}

		if err := db.Where("alamat_lokasi = ?", address).
			Assign(models.LokasiMall{AlamatLokasi: address}).
			FirstOrCreate(&lokasiMall).Error; err != nil {
			panic(fmt.Sprintf("Failed to seed lokasi mall %s: %v", address, err))
		}

		result = append(result, lokasiMall)
	}

	return result
}
