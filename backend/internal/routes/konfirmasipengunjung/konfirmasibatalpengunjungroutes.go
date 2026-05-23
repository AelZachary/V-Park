package konfirmasipengunjung

import (
	"net/http"

	konfirmasipengunjungcontroller "v-park/internal/controllers/konfirmasipengunjung"
	"v-park/internal/loggers"
	"v-park/internal/middleware"
)

func RegisterKonfirmasiBatalRoutes(mux *http.ServeMux, controller *konfirmasipengunjungcontroller.KonfirmasiBatalPengunjungController) {
	if logger := loggers.KonfirmasiPengunjungRoutesLogger; logger != nil {
		logger.Info("register routes")
	}
	mux.HandleFunc("POST /api/konfirmasibatal/booking/{IDBooking}", middleware.RequirePengunjungToken(controller.DB, controller.CreateKonfirmasiBatalHandler))
}
