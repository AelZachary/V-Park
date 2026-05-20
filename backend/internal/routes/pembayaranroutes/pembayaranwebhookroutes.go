package pembayaranroutes

import (
	"net/http"

	"v-park/internal/controllers/pembayarancontroller"

	"gorm.io/gorm"
)

// RegisterPembayaranWebhookRoutes registers the webhook route
func PembayaranWebhookRoutes(mux *http.ServeMux, db *gorm.DB) {
	ctrl := &pembayarancontroller.PembayaranInformasiController{DB: db}

	// Webhook - POST /api/pembayaran/webhook
	// Body: { "id": "ext-id", "status": "SUCCESS|FAILED|EXPIRED", "payment_method": "QRIS|OVO|..." }
	mux.HandleFunc("POST /api/pembayaran/webhook", ctrl.PaymentWebhookHandler)
}
