package riwayatroutes

import (
	"net/http"

	riwayatcontroller "v-park/internal/controllers/riwayatcontroller"
	"v-park/internal/loggers"
)

func RegisterRiwayatSelesaiRoutes(mux *http.ServeMux, controller *riwayatcontroller.RiwayatSelesaiController) {
	if logger := loggers.RiwayatRoutesLogger; logger != nil {
		logger.Info("register routes")
	}
	mux.HandleFunc("GET /api/riwayatselesai/pengunjung/{IDPengunjung}", controller.GetRiwayatSelesaiByPengunjungHandler)
}
