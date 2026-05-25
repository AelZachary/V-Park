package pembayaranroutes

import (
	"net/http"

	"v-park/internal/controllers/pembayarancontroller"
	"v-park/internal/loggers"

	"gorm.io/gorm"
)

// RegisterPembayaranWebhookRoutes registers the webhook route
func PembayaranWebhookRoutes(mux *http.ServeMux, db *gorm.DB) {
	if logger := loggers.PembayaranRoutesLogger; logger != nil {
		logger.Info("register routes")
	}
	ctrl := &pembayarancontroller.PembayaranInformasiController{DB: db}

	// Webhook - POST /api/pembayaran/webhook
	// Body: { "id": "ext-id", "status": "SUCCESS|FAILED|EXPIRED", "payment_method": "QRIS|OVO|..." }
	mux.HandleFunc("POST /api/pembayaran/webhook", ctrl.PaymentWebhookHandler)
}
