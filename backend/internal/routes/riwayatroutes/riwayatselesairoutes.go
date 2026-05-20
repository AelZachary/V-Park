package riwayatroutes

import (
	"net/http"

	riwayatcontroller "v-park/internal/controllers/riwayatcontroller"
)

func RegisterRiwayatSelesaiRoutes(mux *http.ServeMux, controller *riwayatcontroller.RiwayatSelesaiController) {
	mux.HandleFunc("GET /api/riwayatselesai/pengunjung/{IDPengunjung}", controller.GetRiwayatSelesaiByPengunjungHandler)
}
