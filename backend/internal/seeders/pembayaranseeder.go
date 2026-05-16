package seeders

import (
	"fmt"
	"math"
	"math/rand"
	"time"

	"v-park/internal/models"

	"gorm.io/gorm"
)

// PembayaranBulkSeeders creates pembayaran records for completed riwayat bookings.
// It calculates totals based on duration and a simple hourly rate.
func PembayaranBulkSeeders(db *gorm.DB, riwayats []models.RiwayatBooking) []models.Pembayaran {
	rand.Seed(time.Now().UnixNano())

	ratePerHour := 5000 // example rate in currency units per hour
	payments := make([]models.Pembayaran, 0)

	for _, r := range riwayats {
		if r.StatusBooking != "Selesai" || r.DurasiParkir <= 0 {
			continue
		}

		// bill by rounding up to the next hour
		hours := int(math.Ceil(float64(r.DurasiParkir) / 60.0))
		total := hours * ratePerHour

		// simulate payment time shortly after exit
		waktuPembayaran := r.WaktuKeluar.Add(time.Duration(rand.Intn(60)) * time.Minute)

		pembayaran := models.Pembayaran{
			IDRiwayatBooking: r.IDRiwayatBooking,
			TotalPembayaran:  total,
			WaktuPembayaran:  waktuPembayaran,
			StatusPembayaran: "Lunas",
		}

		if err := db.Where("id_riwayat_booking = ?", pembayaran.IDRiwayatBooking).
			Assign(models.Pembayaran{
				TotalPembayaran:  pembayaran.TotalPembayaran,
				WaktuPembayaran:  pembayaran.WaktuPembayaran,
				StatusPembayaran: pembayaran.StatusPembayaran,
			}).
			FirstOrCreate(&pembayaran).Error; err != nil {
			panic(fmt.Sprintf("Failed to seed pembayaran for riwayat %d: %v", r.IDRiwayatBooking, err))
		}

		payments = append(payments, pembayaran)
	}

	return payments
}
