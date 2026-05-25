package konfirmasipengunjung

import (
	"net/http"

	konfirmasipengunjungcontroller "v-park/internal/controllers/konfirmasipengunjung"
	"v-park/internal/loggers"
	"v-park/internal/middleware"
)

func RegisterKonfirmasiTibaRoutes(mux *http.ServeMux, controller *konfirmasipengunjungcontroller.KonfirmasiTibaPengunjungController) {
	if logger := loggers.KonfirmasiPengunjungRoutesLogger; logger != nil {
		logger.Info("register routes")
	}
	mux.HandleFunc("POST /api/konfirmasitiba/booking/{IDBooking}", middleware.RequirePengunjungToken(controller.DB, controller.CreateKonfirmasiTibaHandler))
}
