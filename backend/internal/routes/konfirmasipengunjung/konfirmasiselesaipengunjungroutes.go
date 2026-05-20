package konfirmasipengunjung

import (
	"net/http"

	konfirmasipengunjungcontroller "v-park/internal/controllers/konfirmasipengunjung"
)

func RegisterKonfirmasiSelesaiRoutes(mux *http.ServeMux, controller *konfirmasipengunjungcontroller.KonfirmasiSelesaiPengunjungController) {
	mux.HandleFunc("POST /api/konfirmasiselesai/booking/{IDBooking}", controller.CreateKonfirmasiSelesaiHandler)
}
