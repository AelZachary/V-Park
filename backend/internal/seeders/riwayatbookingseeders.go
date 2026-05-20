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
		// Choose status with weighted probability (NEW flow)
		r := rand.Intn(100)
		var status string
		if r < 15 {
			status = "Dibatalkan"
		} else if r < 40 {
			status = "MenungguKonfirmasi"
		} else if r < 70 {
			status = "KonfirmasiTiba"
		} else {
			status = "KonfirmasiSelesai"
		}

		var waktuMasuk time.Time
		var waktuKeluar time.Time
		var durasi int

		if status == "Dibatalkan" || status == "MenungguKonfirmasi" {
			// No check-in yet
			durasi = 0
		} else if status == "KonfirmasiTiba" {
			// Check-in done, no check-out yet
			masukOffset := time.Duration(rand.Intn(120)) * time.Minute
			waktuMasuk = b.WaktuBooking.Add(masukOffset)
			durasi = 0
		} else if status == "KonfirmasiSelesai" {
			// Check-in and check-out done, with duration in seconds
			masukOffset := time.Duration(rand.Intn(120)) * time.Minute
			waktuMasuk = b.WaktuBooking.Add(masukOffset)
			// Duration: 30 minutes to 8 hours (in seconds)
			durasi = rand.Intn((8*3600)-(30*60)) + (30 * 60)
			waktuKeluar = waktuMasuk.Add(time.Duration(durasi) * time.Second)
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
