package seeders

import (
	"fmt"

	"v-park/internal/models"

	"gorm.io/gorm"
)

type tempatParkirSeedSpec struct {
	LeftCount  int
	RightCount int
}

var tempatParkirSeedSpecs = map[string]tempatParkirSeedSpec{
	"Ground Floor":          {LeftCount: 24, RightCount: 26},
	"Ground Floor - Area A": {LeftCount: 22, RightCount: 22},
	"Lantai P1":             {LeftCount: 18, RightCount: 21},
	"Lantai P1 - Area A":    {LeftCount: 27, RightCount: 21},
	"Lantai P2":             {LeftCount: 23, RightCount: 24},
	"Lantai P2 - Area A":    {LeftCount: 27, RightCount: 21},
	"Lantai P3":             {LeftCount: 23, RightCount: 24},
	"Lantai P3 - Area A":    {LeftCount: 27, RightCount: 21},
	"Lantai P4":             {LeftCount: 23, RightCount: 24},
	"Lantai P4 - Area A":    {LeftCount: 25, RightCount: 19},
	"Lantai P5":             {LeftCount: 21, RightCount: 22},
}

func TempatParkirSeeders(db *gorm.DB, lokasiMall models.LokasiMall) []models.TempatParkir {
	spec, ok := tempatParkirSeedSpecs[lokasiMall.KodeLokasi]
	if !ok {
		panic(fmt.Sprintf("missing tempat parkir seeder spec for lokasi mall %s", lokasiMall.KodeLokasi))
	}

	samples := make([]models.TempatParkir, 0, spec.LeftCount+spec.RightCount)
	statuses := []string{"Tersedia", "Terisi", "Dipesan", "Perawatan"}

	for n := 1; n <= spec.LeftCount; n++ {
		samples = append(samples, models.TempatParkir{
			IDLokasiMall:       lokasiMall.IDLokasiMall,
			KodeTempat:         fmt.Sprintf("L%d", n),
			LokasiTempatParkir: fmt.Sprintf("%s - L%d", lokasiMall.KodeLokasi, n),
			StatusTempatParkir: statuses[(n-1)%len(statuses)],
		})
	}

	for n := 1; n <= spec.RightCount; n++ {
		samples = append(samples, models.TempatParkir{
			IDLokasiMall:       lokasiMall.IDLokasiMall,
			KodeTempat:         fmt.Sprintf("R%d", n),
			LokasiTempatParkir: fmt.Sprintf("%s - R%d", lokasiMall.KodeLokasi, n),
			StatusTempatParkir: statuses[(spec.LeftCount+n-1)%len(statuses)],
		})
	}

	result := make([]models.TempatParkir, 0, len(samples))

	for _, sample := range samples {
		tempatParkir := sample

		if err := db.Where("id_lokasi_mall = ? AND kode_tempat = ?", lokasiMall.IDLokasiMall, sample.KodeTempat).
			Assign(models.TempatParkir{
				StatusTempatParkir: sample.StatusTempatParkir,
				LokasiTempatParkir: sample.LokasiTempatParkir,
			}).
			FirstOrCreate(&tempatParkir).Error; err != nil {
			panic(fmt.Sprintf("Failed to seed tempat parkir %s for lokasi mall %s: %v", sample.KodeTempat, lokasiMall.KodeLokasi, err))
		}

		result = append(result, tempatParkir)
	}

	return result
}
