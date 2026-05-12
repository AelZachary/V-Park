package seeders

import (
	"fmt"

	"v-park/internal/models"

	"gorm.io/gorm"
)

func TempatParkirSeeders(db *gorm.DB, lokasiMallID uint) []models.TempatParkir {
	samples := make([]models.TempatParkir, 0, 60)
	statuses := []string{"Tersedia", "Terisi", "Dipesan", "Perawatan"}
	for zone := 0; zone < 3; zone++ {
		zoneCode := string(rune('A' + zone))
		for n := 1; n <= 20; n++ {
			samples = append(samples, models.TempatParkir{
				IDLokasiMall:       lokasiMallID,
				KodeTempat:         fmt.Sprintf("%s-%02d", zoneCode, n),
				LokasiTempatParkir: fmt.Sprintf("Zona %s - Blok %d", zoneCode, n),
				StatusTempatParkir: statuses[(zone+n)%len(statuses)],
			})
		}
	}

	result := make([]models.TempatParkir, 0, len(samples))

	for _, sample := range samples {
		tempatParkir := sample

		if err := db.Where("id_lokasi_mall = ? AND kode_tempat = ?", lokasiMallID, sample.KodeTempat).
			Assign(models.TempatParkir{
				StatusTempatParkir: sample.StatusTempatParkir,
				LokasiTempatParkir: sample.LokasiTempatParkir,
			}).
			FirstOrCreate(&tempatParkir).Error; err != nil {
			panic(fmt.Sprintf("Failed to seed tempat parkir %s: %v", sample.KodeTempat, err))
		}

		result = append(result, tempatParkir)
	}

	return result
}
