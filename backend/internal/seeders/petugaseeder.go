package seeders

import (
	"fmt"
	"time"

	"v-park/internal/models"

	"gorm.io/gorm"
)

func PetugasSeeders(db *gorm.DB, userID uint) models.Petugas {
	petugas := models.Petugas{
		IDUser:               userID,
		MallBertugas:         "Mall A",
		ShiftMulaiBertugas:   time.Now(),
		ShiftSelesaiBertugas: time.Now().Add(8 * time.Hour),
	}

	if err := db.Where("id_user = ?", userID).
		Assign(models.Petugas{
			MallBertugas:         "Mall A",
			ShiftMulaiBertugas:   time.Now(),
			ShiftSelesaiBertugas: time.Now().Add(8 * time.Hour),
		}).
		FirstOrCreate(&petugas).Error; err != nil {
		panic(fmt.Sprintf("Failed to seed petugas: %v", err))
	}

	return petugas
}
