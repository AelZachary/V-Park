package statustempatparkirroutes

import (
	"net/http"

	statuscontroller "v-park/internal/controllers/statustempatparkircontroller"
	"v-park/internal/loggers"
	"v-park/internal/middleware"
)

func RegisterBookingPengunjungRoutes(mux *http.ServeMux, controller *statuscontroller.BookingPengunjungController) {
	if logger := loggers.StatusTempatParkirRoutesLogger; logger != nil {
		logger.Info("register routes")
	}
	mux.HandleFunc("POST /api/booking/pengunjung", middleware.RequirePengunjungToken(controller.DB, controller.CreateBookingPengunjungHandler))
}
