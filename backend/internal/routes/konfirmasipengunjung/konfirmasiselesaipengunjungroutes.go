package konfirmasipengunjung

import (
	"net/http"

	konfirmasipengunjungcontroller "v-park/internal/controllers/konfirmasipengunjung"
	"v-park/internal/loggers"
)

func RegisterKonfirmasiSelesaiRoutes(mux *http.ServeMux, controller *konfirmasipengunjungcontroller.KonfirmasiSelesaiPengunjungController) {
	if logger := loggers.KonfirmasiPengunjungRoutesLogger; logger != nil {
		logger.Info("register routes")
	}
	mux.HandleFunc("POST /api/konfirmasiselesai/booking/{IDBooking}", controller.CreateKonfirmasiSelesaiHandler)
}
