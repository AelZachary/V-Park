package seeders

import (
	"fmt"
	"time"

	"v-park/internal/models"

	"gorm.io/gorm"
)

func PetugasSeeders(db *gorm.DB, userID uint) models.Petugas {
	result := PetugasBulkSeeders(db, []uint{userID})
	if len(result) == 0 {
		panic("failed to seed petugas")
	}
	return result[0]
}

func PetugasBulkSeeders(db *gorm.DB, userIDs []uint) []models.Petugas {
	malls := []string{"Mall A", "Mall B", "Mall C", "Mall D", "Mall E", "Mall F"}
	baseTime := time.Date(2026, time.May, 12, 6, 0, 0, 0, time.Local)

	result := make([]models.Petugas, 0, len(userIDs))
	for i, userID := range userIDs {
		shiftStart := baseTime.Add(time.Duration((i%3)*8) * time.Hour)
		petugas := models.Petugas{
			IDUser:               userID,
			MallBertugas:         malls[i%len(malls)],
			ShiftMulaiBertugas:   shiftStart,
			ShiftSelesaiBertugas: shiftStart.Add(8 * time.Hour),
		}

		if err := db.Where("id_user = ?", userID).
			Assign(models.Petugas{
				MallBertugas:         petugas.MallBertugas,
				ShiftMulaiBertugas:   petugas.ShiftMulaiBertugas,
				ShiftSelesaiBertugas: petugas.ShiftSelesaiBertugas,
			}).
			FirstOrCreate(&petugas).Error; err != nil {
			panic(fmt.Sprintf("Failed to seed petugas user %d: %v", userID, err))
		}

		result = append(result, petugas)
	}

	return result
}
