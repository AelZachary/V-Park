package konfirmasipengunjung

import (
	"net/http"

	konfirmasipengunjungcontroller "v-park/internal/controllers/konfirmasipengunjung"
	"v-park/internal/loggers"
)

func RegisterKonfirmasiBatalRoutes(mux *http.ServeMux, controller *konfirmasipengunjungcontroller.KonfirmasiBatalPengunjungController) {
	if logger := loggers.KonfirmasiPengunjungRoutesLogger; logger != nil {
		logger.Info("register routes")
	}
	mux.HandleFunc("POST /api/konfirmasibatal/booking/{IDBooking}", controller.CreateKonfirmasiBatalHandler)
}
