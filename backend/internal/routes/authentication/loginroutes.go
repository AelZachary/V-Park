package authentication

import (
	"net/http"
	controllerauthentication "v-park/internal/controllers/authentication"
)

func RegisterLoginRoutes(mux *http.ServeMux, controller *controllerauthentication.LoginPengunjung) {
	mux.HandleFunc("/api/authentication/login", controller.LoginHandler)
}
