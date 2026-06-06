package logic

import "v-park/internal/models"

// CalculateTotalJumlahPembayaran menjumlahkan nominal pembayaran Lunas milik pengunjung.
func CalculateTotalJumlahPembayaran(bookings []models.Booking) int {
	total := 0
	for _, booking := range bookings {
		if booking.RiwayatBooking == nil {
			continue
		}
		if booking.RiwayatBooking.Pembayaran == nil {
			continue
		}
		if booking.RiwayatBooking.Pembayaran.StatusPembayaran != "Lunas" {
			continue
		}

		amount := booking.RiwayatBooking.Pembayaran.TotalPembayaran
		if amount == 0 && booking.RiwayatBooking.Pembayaran.MetodePembayaran != nil {
			amount = booking.RiwayatBooking.Pembayaran.MetodePembayaran.JumlahPembayaran
		}

		total += amount
	}

	return total
}
