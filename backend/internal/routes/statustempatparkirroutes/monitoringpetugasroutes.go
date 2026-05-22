package statustempatparkirroutes

import (
	"net/http"

	statuscontroller "v-park/internal/controllers/statustempatparkircontroller"
	"v-park/internal/loggers"
)

func RegisterMonitoringPetugasRoutes(mux *http.ServeMux, controller *statuscontroller.MonitoringPetugasController) {
	if logger := loggers.StatusTempatParkirRoutesLogger; logger != nil {
		logger.Info("register routes")
	}
	mux.HandleFunc("POST /api/monitoring/petugas/{IDPetugas}", controller.ToggleMonitoringHandler)
}
