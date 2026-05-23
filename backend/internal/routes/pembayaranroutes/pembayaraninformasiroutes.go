package pembayaranroutes

import (
	"net/http"

	"v-park/internal/controllers/pembayarancontroller"
	"v-park/internal/loggers"
	"v-park/internal/middleware"

	"gorm.io/gorm"
)

// RegisterPembayaranPengunjungRoutes registers the route for getting payment details
func PembayaranInformasiRoutes(mux *http.ServeMux, db *gorm.DB) {
	if logger := loggers.PembayaranRoutesLogger; logger != nil {
		logger.Info("register routes")
	}
	ctrl := &pembayarancontroller.PembayaranInformasiController{DB: db}

	// Get pembayaran detail for the authenticated pengunjung's booking
	mux.HandleFunc("GET /api/pembayaran/informasi/booking/{IDBooking}", middleware.RequirePengunjungToken(db, ctrl.GetPembayaranByRiwayatHandler))
}
