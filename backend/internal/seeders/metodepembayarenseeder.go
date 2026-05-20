package seeders

import (
	"fmt"
	"math/rand"
	"time"

	"v-park/internal/models"

	"gorm.io/gorm"
)

// MetodePembayaranSeeders creates metode pembayaran rows for seeded pembayaran records.
// It must run after PembayaranBulkSeeders because MetodePembayaran now requires IDPembayaran.
func MetodePembayaranSeeders(db *gorm.DB, payments []models.Pembayaran) ([]models.MetodePembayaran, error) {
	paymentMethods := []string{"QRIS", "OVO", "GoPay", "Dana", "BCA", "Wanda"}
	created := make([]models.MetodePembayaran, 0)

	for _, payment := range payments {
		if payment.StatusPembayaran != "Lunas" {
			continue
		}

		var existingPayment models.Pembayaran
		if err := db.First(&existingPayment, payment.IDPembayaran).Error; err != nil {
			return nil, fmt.Errorf("failed to reload pembayaran %d: %w", payment.IDPembayaran, err)
		}

		if existingPayment.MetodePembayaranID != nil && *existingPayment.MetodePembayaranID != 0 {
			continue
		}

		methodName := paymentMethods[rand.Intn(len(paymentMethods))]
		expiresAt := time.Now().Add(15 * time.Minute)
		metode := models.MetodePembayaran{
			IDPembayaran:     payment.IDPembayaran,
			QRCodeBase64:     "",
			QRCodeURL:        "",
			ExpiresAt:        &expiresAt,
			CallbackURL:      "https://callback.v-park.local/payment",
			JumlahPembayaran: payment.TotalPembayaran,
			PaymentMethod:    methodName,
		}

		if err := db.Create(&metode).Error; err != nil {
			return nil, fmt.Errorf("failed to seed metode pembayaran for pembayaran %d: %w", payment.IDPembayaran, err)
		}

		if err := db.Model(&models.Pembayaran{}).
			Where("id_pembayaran = ?", payment.IDPembayaran).
			Update("id_metode_pembayaran", metode.IDMetodePembayaran).Error; err != nil {
			return nil, fmt.Errorf("failed to link pembayaran %d to metode %d: %w", payment.IDPembayaran, metode.IDMetodePembayaran, err)
		}

		created = append(created, metode)
	}

	return created, nil
}
