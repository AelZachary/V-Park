package pembayaranroutes

import (
	"net/http"

	"v-park/internal/controllers/pembayarancontroller"

	"gorm.io/gorm"
)

// RegisterPembayaranInisiasiRoutes registers the route for initiating payments
func PembayaranBayarBookingRoutes(mux *http.ServeMux, db *gorm.DB) {
	ctrl := &pembayarancontroller.PembayaranInformasiController{DB: db}

	// Inisiasi pembayaran - POST /api/pembayaran/bayar/booking/{IDBooking}
	// Body optional: { "PaymentMethod": "QRIS" }
	mux.HandleFunc("POST /api/pembayaran/bayar/booking/{IDBooking}", ctrl.InitiatePembayaranHandler)
}
