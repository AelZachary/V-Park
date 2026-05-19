package seeders

import (
	"fmt"
	"math/rand"
	"time"

	"v-park/internal/models"

	"gorm.io/gorm"
)

func PembayaranBulkSeeders(db *gorm.DB, riwayats []models.RiwayatBooking) []models.Pembayaran {
	payments := make([]models.Pembayaran, 0, len(riwayats))

	const tarifPerJam = 5000
	const tarifLayanan = 1000
	const tarifPajakRate = 0.1

	statusPaymentList := []string{"Lunas", "Pending", "Tertunda"}

	for _, r := range riwayats {
		if r.StatusBooking != "KonfirmasiSelesai" {
			continue
		}

		if r.DurasiParkir <= 0 {
			continue
		}

		durasiJam := (r.DurasiParkir + 3599) / 3600

		tarifParkir := durasiJam * tarifPerJam

		biayaLayanan := tarifLayanan

		biayaPajak := int(float64(tarifParkir) * tarifPajakRate)
		totalBiaya := tarifParkir + biayaLayanan + biayaPajak

		if rand.Intn(10) < 2 {
			biayaLayanan += 2000 // Add late fee
			totalBiaya += 2000
		}

		waktuPembayaran := r.WaktuKeluar.Add(time.Duration(rand.Intn(60)) * time.Minute)

		pembayaran := models.Pembayaran{
			IDRiwayatBooking: r.IDRiwayatBooking,
			BiayaLayanan:     biayaLayanan,
			BiayaPajak:       biayaPajak,
			TotalPembayaran:  totalBiaya,
			WaktuPembayaran:  waktuPembayaran,
			StatusPembayaran: statusPaymentList[rand.Intn(len(statusPaymentList))],
		}

		if err := db.Create(&pembayaran).Error; err != nil {
			panic(fmt.Sprintf("Failed to seed pembayaran for riwayat %d: %v", r.IDRiwayatBooking, err))
		}

		payments = append(payments, pembayaran)
	}

	return payments
}
