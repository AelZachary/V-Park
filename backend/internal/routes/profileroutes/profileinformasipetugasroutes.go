package profileroutes

import (
	"net/http"

	profilecontroller "v-park/internal/controllers/profilecontroller"
	"v-park/internal/loggers"
	"v-park/internal/middleware"
)

func RegisterProfileInformasiPetugasRoutes(mux *http.ServeMux, controller *profilecontroller.ProfileInformasiPetugasController) {
	if logger := loggers.ProfileRoutesLogger; logger != nil {
		logger.Info("register routes")
	}
	mux.HandleFunc("GET /api/profile/informasi/petugas", middleware.RequirePetugasToken(controller.DB, controller.GetProfileInformasiPetugasHandler))
}
