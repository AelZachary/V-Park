package profileroutes

import (
	"net/http"

	profilecontroller "v-park/internal/controllers/profilecontroller"
)

func RegisterProfileInformasiPetugasRoutes(mux *http.ServeMux, controller *profilecontroller.ProfileInformasiPetugasController) {
	mux.HandleFunc("GET /api/profile/informasi/petugas/{IDPetugas}", controller.GetProfileInformasiPetugasHandler)
}
