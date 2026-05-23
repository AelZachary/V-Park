package riwayatroutes

import (
	"net/http"

	riwayatcontroller "v-park/internal/controllers/riwayatcontroller"
	"v-park/internal/loggers"
	"v-park/internal/middleware"
)

func RegisterRiwayatAktifRoutes(mux *http.ServeMux, controller *riwayatcontroller.RiwayatAktifController) {
	if logger := loggers.RiwayatRoutesLogger; logger != nil {
		logger.Info("register routes")
	}
	mux.HandleFunc("GET /api/riwayataktif/pengunjung", middleware.RequirePengunjungToken(controller.DB, controller.GetRiwayatAktifByPengunjungHandler))
}
