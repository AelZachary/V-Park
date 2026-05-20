package riwayatroutes

import (
	"net/http"

	riwayatcontroller "v-park/internal/controllers/riwayatcontroller"
)

func RegisterRiwayatBatalRoutes(mux *http.ServeMux, controller *riwayatcontroller.RiwayatBatalController) {
	mux.HandleFunc("GET /api/riwayatbatal/pengunjung/{IDPengunjung}", controller.GetRiwayatBatalByPengunjungHandler)
}
