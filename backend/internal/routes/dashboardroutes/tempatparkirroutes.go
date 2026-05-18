package dashboardroutes

import (
	"net/http"

	dashboardcontroller "v-park/internal/controllers/dashboardcontroller"
)

// RegisterTempatParkirRoutes registers routes for tempat parkir SSE
func TempatParkirRoutes(mux *http.ServeMux, controller *dashboardcontroller.TempatParkirController) {
	mux.HandleFunc("/api/tempatparkir", controller.GetByLokasiSSE)
}
