package profileroutes

import (
	"net/http"

	profilecontroller "v-park/internal/controllers/profilecontroller"
	"v-park/internal/loggers"
)

func RegisterProfileInformasiPetugasRoutes(mux *http.ServeMux, controller *profilecontroller.ProfileInformasiPetugasController) {
	if logger := loggers.ProfileRoutesLogger; logger != nil {
		logger.Info("register routes")
	}
	mux.HandleFunc("GET /api/profile/informasi/petugas/{IDPetugas}", controller.GetProfileInformasiPetugasHandler)
}
