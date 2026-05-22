package authenticationroutes

import (
	"net/http"

	controllerauthentication "v-park/internal/controllers/authenticationcontroller"
	"v-park/internal/loggers"
)

func RegisterLoginRoutes(mux *http.ServeMux, controller *controllerauthentication.LoginPengunjung) {
	if logger := loggers.AuthenticationRoutesLogger; logger != nil {
		logger.Info("register routes")
	}
	mux.HandleFunc("/api/authentication/login", controller.LoginHandler)
}
