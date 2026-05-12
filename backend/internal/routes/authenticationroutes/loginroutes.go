package authenticationroutes

import (
	"net/http"
	controllerauthentication "v-park/internal/controllers/authenticationcontroller"
)

func RegisterLoginRoutes(mux *http.ServeMux, controller *controllerauthentication.LoginPengunjung) {
	mux.HandleFunc("/api/authentication/login", controller.LoginHandler)
}
