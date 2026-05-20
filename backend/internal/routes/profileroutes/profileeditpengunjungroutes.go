package profileroutes

import (
	"net/http"

	profilecontroller "v-park/internal/controllers/profilecontroller"
)

func RegisterProfileEditPengunjungRoutes(mux *http.ServeMux, controller *profilecontroller.ProfileEditPengunjungController) {
	mux.HandleFunc("POST /api/profile/edit/pengunjung/{IDPengunjung}", controller.EditProfilePengunjungHandler)
}
