package pembayaranroutes

import (
	"net/http"

	"v-park/internal/controllers/pembayarancontroller"
	"v-park/internal/loggers"

	"gorm.io/gorm"
)

// RegisterPembayaranPengunjungRoutes registers the route for getting payment details
func PembayaranInformasiRoutes(mux *http.ServeMux, db *gorm.DB) {
	if logger := loggers.PembayaranRoutesLogger; logger != nil {
		logger.Info("register routes")
	}
	ctrl := &pembayarancontroller.PembayaranInformasiController{DB: db}

	// Get pembayaran detail by booking - GET /api/pembayaran/informasi/booking/{IDBooking}
	// Returns response based on IDBooking from the path
	mux.HandleFunc("GET /api/pembayaran/informasi/booking/{IDBooking}", ctrl.GetPembayaranByRiwayatHandler)
}
