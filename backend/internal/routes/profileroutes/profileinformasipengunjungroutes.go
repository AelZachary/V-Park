package profileroutes

import (
	"net/http"

	profilecontroller "v-park/internal/controllers/profilecontroller"
)

func RegisterProfileInformasiPengunjungRoutes(mux *http.ServeMux, controller *profilecontroller.ProfileInformasiPengunjungController) {
	mux.HandleFunc("GET /api/profile/informasi/pengunjung/{IDPengunjung}", controller.GetProfileInformasiPengunjungHandler)
}
