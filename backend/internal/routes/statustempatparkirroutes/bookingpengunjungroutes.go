package statustempatparkirroutes

import (
	"net/http"

	statuscontroller "v-park/internal/controllers/statustempatparkircontroller"
	"v-park/internal/loggers"
)

func RegisterBookingPengunjungRoutes(mux *http.ServeMux, controller *statuscontroller.BookingPengunjungController) {
	if logger := loggers.StatusTempatParkirRoutesLogger; logger != nil {
		logger.Info("register routes")
	}
	mux.HandleFunc("POST /api/booking/pengunjung/{IDPengunjung}", controller.CreateBookingPengunjungHandler)
}
