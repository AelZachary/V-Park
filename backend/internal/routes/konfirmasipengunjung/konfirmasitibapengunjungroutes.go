package konfirmasipengunjung

import (
	"net/http"

	konfirmasipengunjungcontroller "v-park/internal/controllers/konfirmasipengunjung"
)

func RegisterKonfirmasiTibaRoutes(mux *http.ServeMux, controller *konfirmasipengunjungcontroller.KonfirmasiTibaPengunjungController) {
	mux.HandleFunc("POST /api/konfirmasitiba/booking/{IDBooking}", controller.CreateKonfirmasiTibaHandler)
}
