package riwayatroutes

import (
	"net/http"

	riwayatcontroller "v-park/internal/controllers/riwayatcontroller"
	"v-park/internal/loggers"
)

func RegisterRiwayatBatalRoutes(mux *http.ServeMux, controller *riwayatcontroller.RiwayatBatalController) {
	if logger := loggers.RiwayatRoutesLogger; logger != nil {
		logger.Info("register routes")
	}
	mux.HandleFunc("GET /api/riwayatbatal/pengunjung/{IDPengunjung}", controller.GetRiwayatBatalByPengunjungHandler)
}
