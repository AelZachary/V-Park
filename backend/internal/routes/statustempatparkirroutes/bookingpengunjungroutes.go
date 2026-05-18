package statustempatparkirroutes

import (
	"net/http"

	statuscontroller "v-park/internal/controllers/statustempatparkircontroller"
)

func RegisterBookingPengunjungRoutes(mux *http.ServeMux, controller *statuscontroller.BookingPengunjungController) {
	mux.HandleFunc("POST /api/booking/pengunjung/{IDPengunjung}", controller.CreateBookingPengunjungHandler)
}
