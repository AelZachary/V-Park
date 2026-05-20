package riwayatroutes

import (
	"net/http"

	riwayatcontroller "v-park/internal/controllers/riwayatcontroller"
)

func RegisterRiwayatAktifRoutes(mux *http.ServeMux, controller *riwayatcontroller.RiwayatAktifController) {
	mux.HandleFunc("GET /api/riwayataktif/pengunjung/{IDPengunjung}", controller.GetRiwayatAktifByPengunjungHandler)
}
