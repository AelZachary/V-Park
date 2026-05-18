package dashboardroutes

import (
	"net/http"

	dashboardcontroller "v-park/internal/controllers/dashboardcontroller"
)

func RegisterDashboardPengunjungRoutes(mux *http.ServeMux, controller *dashboardcontroller.DashboardPengunjungController) {
	mux.HandleFunc("/api/dashboard/pengunjung", controller.GetAllPengunjungHandler)
}
