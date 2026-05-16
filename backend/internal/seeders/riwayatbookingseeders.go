package seeders

import (
	"fmt"
	"math/rand"
	"time"

	"v-park/internal/models"

	"gorm.io/gorm"
)

// RiwayatBookingBulkSeeders creates riwayat entries for bookings. It assigns realistic
// masuk/keluar times and status. For finished bookings it computes a duration in minutes.
func RiwayatBookingBulkSeeders(db *gorm.DB, bookings []models.Booking) []models.RiwayatBooking {
	rand.Seed(time.Now().UnixNano())

	riwayats := make([]models.RiwayatBooking, 0, len(bookings))

	for _, b := range bookings {
		// Choose status with weighted probability
		r := rand.Intn(100)
		status := "Selesai"
		if r < 10 {
			status = "Dibatalkan"
		} else if r < 40 {
			status = "Dalam Parkir"
		}

		// Waktu masuk shortly after booking
		masukOffset := time.Duration(rand.Intn(60)) * time.Minute
		waktuMasuk := b.WaktuBooking.Add(masukOffset)

		var waktuKeluar time.Time
		var durasi int
		if status == "Selesai" {
			// duration between 15 minutes and 8 hours
			durasi = rand.Intn((8*60)-15) + 15
			waktuKeluar = waktuMasuk.Add(time.Duration(durasi) * time.Minute)
		}

		riwayat := models.RiwayatBooking{
			IDBooking:     b.IDBooking,
			WaktuMasuk:    waktuMasuk,
			WaktuKeluar:   waktuKeluar,
			DurasiParkir:  durasi,
			StatusBooking: status,
		}

		if err := db.Where("id_booking = ?", riwayat.IDBooking).
			Assign(models.RiwayatBooking{
				WaktuMasuk:    riwayat.WaktuMasuk,
				WaktuKeluar:   riwayat.WaktuKeluar,
				DurasiParkir:  riwayat.DurasiParkir,
				StatusBooking: riwayat.StatusBooking,
			}).
			FirstOrCreate(&riwayat).Error; err != nil {
			panic(fmt.Sprintf("Failed to seed riwayat booking for booking %d: %v", b.IDBooking, err))
		}

		riwayats = append(riwayats, riwayat)
	}

	return riwayats
}
