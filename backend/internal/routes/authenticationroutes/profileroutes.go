package authenticationroutes

import (
	"net/http"
	controllerauthentication "v-park/internal/controllers/authenticationcontroller"
)

func RegisterProfileRoutes(mux *http.ServeMux, controller *controllerauthentication.ProfileController) {
	mux.HandleFunc("/api/authentication/profile", controller.ProfileHandler)
}
