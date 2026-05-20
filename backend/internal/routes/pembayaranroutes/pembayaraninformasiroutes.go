package pembayaranroutes

import (
	"net/http"

	"v-park/internal/controllers/pembayarancontroller"

	"gorm.io/gorm"
)

// RegisterPembayaranPengunjungRoutes registers the route for getting payment details
func PembayaranInformasiRoutes(mux *http.ServeMux, db *gorm.DB) {
	ctrl := &pembayarancontroller.PembayaranInformasiController{DB: db}

	// Get pembayaran detail by booking - GET /api/pembayaran/booking/{IDBooking}
	// Returns current status, QR, expiry, payment methods
	mux.HandleFunc("GET /api/pembayaran/booking/{IDBooking}", ctrl.GetPembayaranByRiwayatHandler)
}
