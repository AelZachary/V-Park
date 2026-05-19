package statustempatparkirroutes

import (
	"net/http"

	statuscontroller "v-park/internal/controllers/statustempatparkircontroller"
)

func RegisterMonitoringPetugasRoutes(mux *http.ServeMux, controller *statuscontroller.MonitoringPetugasController) {
	mux.HandleFunc("POST /api/monitoring/petugas/{IDPetugas}", controller.ToggleMonitoringHandler)
}
