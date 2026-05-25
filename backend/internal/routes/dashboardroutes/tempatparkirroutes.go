package dashboardroutes

import (
	"net/http"

	dashboardcontroller "v-park/internal/controllers/dashboardcontroller"
	"v-park/internal/loggers"
	"v-park/internal/middleware"
)

// RegisterTempatParkirRoutes registers routes for tempat parkir SSE
func TempatParkirRoutes(mux *http.ServeMux, controller *dashboardcontroller.TempatParkirController) {
	if logger := loggers.DashboardRoutesLogger; logger != nil {
		logger.Info("register routes")
	}
	mux.HandleFunc("/api/tempatparkir", middleware.RequireAnyUserToken(controller.DB, controller.GetByLokasiSSE))
}
