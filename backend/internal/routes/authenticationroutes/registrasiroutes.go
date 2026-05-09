package authenticationroutes

import (
	"net/http"
	controllerauth "v-park/internal/controllers/authenticationcontroller"
)

func RegisterRegistrasiRoutes(mux *http.ServeMux, controller *controllerauth.RegistrasiController) {
	mux.HandleFunc("POST /api/authentication/registrasi", controller.RegistrasiHandler)
}
