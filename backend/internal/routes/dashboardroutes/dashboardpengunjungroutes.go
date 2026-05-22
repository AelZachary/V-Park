package dashboardroutes

import (
	"net/http"

	dashboardcontroller "v-park/internal/controllers/dashboardcontroller"
	"v-park/internal/loggers"
)

func RegisterDashboardPengunjungRoutes(mux *http.ServeMux, controller *dashboardcontroller.DashboardPengunjungController) {
	if logger := loggers.DashboardRoutesLogger; logger != nil {
		logger.Info("register routes")
	}
	mux.HandleFunc("/api/dashboard/pengunjung", controller.GetAllPengunjungHandler)
}
