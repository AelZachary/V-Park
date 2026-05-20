package logic

import "v-park/internal/models"

// CalculateTotalBooking menghitung jumlah booking selesai milik pengunjung.
func CalculateTotalBooking(bookings []models.Booking) int {
	total := 0
	for _, booking := range bookings {
		if booking.RiwayatBooking == nil {
			continue
		}
		if booking.RiwayatBooking.StatusBooking == "Selesai" {
			total++
		}
	}

	return total
}
