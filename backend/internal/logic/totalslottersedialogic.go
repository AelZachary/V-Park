package logic

import (
	"v-park/internal/models"

	"gorm.io/gorm"
)

// CountAvailableSlots returns the number of TempatParkir in a lokasi mall
// that have StatusTempatParkir == "Tersedia".
func CountAvailableSlots(db *gorm.DB, lokasiMallID uint) (int64, error) {
	var count int64
	if err := db.Model(&models.TempatParkir{}).
		Where("id_lokasi_mall = ? AND status_tempat_parkir = ?", lokasiMallID, "Tersedia").
		Count(&count).Error; err != nil {
		return 0, err
	}
	return count, nil
}
