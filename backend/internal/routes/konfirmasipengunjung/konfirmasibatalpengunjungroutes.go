package konfirmasipengunjung

import (
	"net/http"

	konfirmasipengunjungcontroller "v-park/internal/controllers/konfirmasipengunjung"
)

func RegisterKonfirmasiBatalRoutes(mux *http.ServeMux, controller *konfirmasipengunjungcontroller.KonfirmasiBatalPengunjungController) {
	mux.HandleFunc("POST /api/konfirmasibatal/booking/{IDBooking}", controller.CreateKonfirmasiBatalHandler)
}
