package pembayaranroutes

import (
	"net/http"

	"v-park/internal/controllers/pembayarancontroller"
	"v-park/internal/loggers"

	"gorm.io/gorm"
)

// RegisterPembayaranInisiasiRoutes registers the route for initiating payments
func PembayaranBayarBookingRoutes(mux *http.ServeMux, db *gorm.DB) {
	if logger := loggers.PembayaranRoutesLogger; logger != nil {
		logger.Info("register routes")
	}
	ctrl := &pembayarancontroller.PembayaranInformasiController{DB: db}

	// Inisiasi pembayaran - POST /api/pembayaran/bayar/booking/{IDBooking}
	// Body optional: { "PaymentMethod": "QRIS" }
	mux.HandleFunc("POST /api/pembayaran/bayar/booking/{IDBooking}", ctrl.InitiatePembayaranHandler)
}
