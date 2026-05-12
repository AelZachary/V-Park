package seeders

import (
	"fmt"
	"time"

	"v-park/internal/models"

	"gorm.io/gorm"
)

func MonitoringSeeders(db *gorm.DB, petugasID uint, tempatParkirIDs []uint) []models.Monitoring {
	result := MonitoringBulkSeeders(db, []uint{petugasID}, tempatParkirIDs)
	return result
}

func MonitoringBulkSeeders(db *gorm.DB, petugasIDs []uint, tempatParkirIDs []uint) []models.Monitoring {
	samples := make([]models.Monitoring, 0, len(tempatParkirIDs))
	baseTime := time.Date(2026, time.May, 12, 6, 0, 0, 0, time.Local)

	if len(petugasIDs) == 0 || len(tempatParkirIDs) == 0 {
		return []models.Monitoring{}
	}

	for i, petugasID := range petugasIDs {
		maxSpotPerPetugas := 25
		if len(tempatParkirIDs) < maxSpotPerPetugas {
			maxSpotPerPetugas = len(tempatParkirIDs)
		}
		for j := 0; j < maxSpotPerPetugas; j++ {
			spotIdx := (i*7 + j) % len(tempatParkirIDs)
			samples = append(samples, models.Monitoring{
				IDPetugas:       petugasID,
				IDTempatParkir:  tempatParkirIDs[spotIdx],
				WaktuMonitoring: baseTime.Add(time.Duration(i*maxSpotPerPetugas+j) * 10 * time.Minute),
			})
		}
	}

	result := make([]models.Monitoring, 0, len(samples))

	for _, sample := range samples {
		monitoring := sample

		if err := db.Where("id_petugas = ? AND id_tempat_parkir = ?", sample.IDPetugas, sample.IDTempatParkir).
			Assign(models.Monitoring{
				WaktuMonitoring: sample.WaktuMonitoring,
			}).
			FirstOrCreate(&monitoring).Error; err != nil {
			panic(fmt.Sprintf("Failed to seed monitoring for petugas %d and tempat parkir %d: %v", sample.IDPetugas, sample.IDTempatParkir, err))
		}

		result = append(result, monitoring)
	}

	return result
}
