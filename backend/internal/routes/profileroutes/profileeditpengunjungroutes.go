package profileroutes

import (
	"net/http"

	profilecontroller "v-park/internal/controllers/profilecontroller"
	"v-park/internal/loggers"
)

func RegisterProfileEditPengunjungRoutes(mux *http.ServeMux, controller *profilecontroller.ProfileEditPengunjungController) {
	if logger := loggers.ProfileRoutesLogger; logger != nil {
		logger.Info("register routes")
	}
	mux.HandleFunc("POST /api/profile/edit/pengunjung/{IDPengunjung}", controller.EditProfilePengunjungHandler)
}
