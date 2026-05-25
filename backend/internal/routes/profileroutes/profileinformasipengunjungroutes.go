package profileroutes

import (
	"net/http"

	profilecontroller "v-park/internal/controllers/profilecontroller"
	"v-park/internal/loggers"
	"v-park/internal/middleware"
)

func RegisterProfileInformasiPengunjungRoutes(mux *http.ServeMux, controller *profilecontroller.ProfileInformasiPengunjungController) {
	if logger := loggers.ProfileRoutesLogger; logger != nil {
		logger.Info("register routes")
	}
	mux.HandleFunc("GET /api/profile/informasi/pengunjung", middleware.RequirePengunjungToken(controller.DB, controller.GetProfileInformasiPengunjungHandler))
}
