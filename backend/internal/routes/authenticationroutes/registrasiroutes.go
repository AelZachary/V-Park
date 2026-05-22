package authenticationroutes

import (
	"net/http"

	controllerauth "v-park/internal/controllers/authenticationcontroller"
	"v-park/internal/loggers"
)

func RegisterRegistrasiRoutes(mux *http.ServeMux, controller *controllerauth.RegistrasiController) {
	if logger := loggers.AuthenticationRoutesLogger; logger != nil {
		logger.Info("register routes")
	}
	mux.HandleFunc("/api/authentication/registrasi", controller.RegistrasiHandler)
}
