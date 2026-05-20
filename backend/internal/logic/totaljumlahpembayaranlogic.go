package logic

import "v-park/internal/models"

// CalculateTotalJumlahPembayaran menjumlahkan semua JumlahPembayaran milik pengunjung.
func CalculateTotalJumlahPembayaran(bookings []models.Booking) int {
	total := 0
	for _, booking := range bookings {
		if booking.RiwayatBooking == nil {
			continue
		}
		if booking.RiwayatBooking.Pembayaran == nil {
			continue
		}
		if booking.RiwayatBooking.Pembayaran.MetodePembayaran == nil {
			continue
		}
		total += booking.RiwayatBooking.Pembayaran.MetodePembayaran.JumlahPembayaran
	}

	return total
}
