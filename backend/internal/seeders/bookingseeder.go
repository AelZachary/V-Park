package seeders

import (
	"fmt"
	"math/rand"
	"time"

	"v-park/internal/models"

	"gorm.io/gorm"
)

// BookingBulkSeeders creates a set of bookings for the provided pengunjung and tempatParkir
// It simulates realistic usage over the last 90 days, creating 1-3 bookings per pengunjung.
func BookingBulkSeeders(db *gorm.DB, pengunjungIDs []uint, tempatParkirIDs []uint) []models.Booking {
	rand.Seed(time.Now().UnixNano())

	vehicles := []string{"Motor", "Mobil", "SUV", "Sedan"}
	bookings := make([]models.Booking, 0)

	if len(tempatParkirIDs) == 0 {
		return bookings
	}

	for i, pid := range pengunjungIDs {
		count := rand.Intn(3) + 1 // 1-3 bookings per pengunjung
		for j := 0; j < count; j++ {
			tempat := tempatParkirIDs[rand.Intn(len(tempatParkirIDs))]
			daysAgo := rand.Intn(90) // within last 90 days
			waktuBooking := time.Now().AddDate(0, 0, -daysAgo).Add(time.Duration(rand.Intn(24)) * time.Hour)
			noOrderan := generateUniqueNoOrderan(db)

			booking := models.Booking{
				NoOrderan:         noOrderan,
				IDPengunjung:      pid,
				IDTempatParkir:    tempat,
				NamaPengguna:      fmt.Sprintf("Pengunjung %d", pid),
				NoPengguna:        fmt.Sprintf("08123%06d", (i+1)*100+j),
				KendaraanPengguna: vehicles[(i+j)%len(vehicles)],
				PlatPengguna:      fmt.Sprintf("B %04d XX", 1000+rand.Intn(9000)),
				WaktuBooking:      waktuBooking,
			}

			if err := db.Where("id_pengunjung = ? AND id_tempat_parkir = ? AND waktu_booking = ?", booking.IDPengunjung, booking.IDTempatParkir, booking.WaktuBooking).
				Assign(models.Booking{
					NamaPengguna:      booking.NamaPengguna,
					NoPengguna:        booking.NoPengguna,
					KendaraanPengguna: booking.KendaraanPengguna,
					PlatPengguna:      booking.PlatPengguna,
				}).
				FirstOrCreate(&booking).Error; err != nil {
				panic(fmt.Sprintf("Failed to seed booking for pengunjung %d: %v", pid, err))
			}

			bookings = append(bookings, booking)
		}
	}

	return bookings
}

func generateUniqueNoOrderan(db *gorm.DB) int {
	for attempts := 0; attempts < 10; attempts++ {
		candidate := int(time.Now().UnixNano()/int64(time.Millisecond))%1000000000 + rand.Intn(9000)
		var existing models.Booking
		if err := db.Where("no_orderan = ?", candidate).First(&existing).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				return candidate
			}
			break
		}
		time.Sleep(2 * time.Millisecond)
	}

	return int(time.Now().UnixNano() % 1000000000)
}
