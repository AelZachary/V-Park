package main

import (
	"log"
	"net/http"

	database "v-park/internal/database"

	authenticationcontroller "v-park/internal/controllers/authenticationcontroller"
	dashboardcontroller "v-park/internal/controllers/dashboardcontroller"
	konfirmasiController "v-park/internal/controllers/konfirmasipengunjung"
	statuscontroller "v-park/internal/controllers/statustempatparkircontroller"

	authenticationroutes "v-park/internal/routes/authenticationroutes"
	dashboardroutes "v-park/internal/routes/dashboardroutes"
	konfirmasiRoutes "v-park/internal/routes/konfirmasipengunjung"
	pembayaranroutes "v-park/internal/routes/pembayaranroutes"
	statusroutes "v-park/internal/routes/statustempatparkirroutes"
)

func main() {
	db, err := database.DatabaseConnect()
	if err != nil {
		log.Fatal("Failed to connect database:", err)
	}

	if err := database.MigrateAllModels(db); err != nil {
		log.Fatal("Failed to migrate models:", err)
	}

	mux := http.NewServeMux()

	loginController := &authenticationcontroller.LoginPengunjung{DB: db}
	authenticationroutes.RegisterLoginRoutes(mux, loginController)

	registrasiController := &authenticationcontroller.RegistrasiController{DB: db}
	authenticationroutes.RegisterRegistrasiRoutes(mux, registrasiController)

	dashboardPengunjungController := &dashboardcontroller.DashboardPengunjungController{DB: db}
	dashboardroutes.RegisterDashboardPengunjungRoutes(mux, dashboardPengunjungController)

	tempatParkirController := &dashboardcontroller.TempatParkirController{DB: db}
	dashboardroutes.TempatParkirRoutes(mux, tempatParkirController)

	bookingPengunjungController := &statuscontroller.BookingPengunjungController{DB: db}
	statusroutes.RegisterBookingPengunjungRoutes(mux, bookingPengunjungController)

	monitoringPetugasController := &statuscontroller.MonitoringPetugasController{DB: db}
	statusroutes.RegisterMonitoringPetugasRoutes(mux, monitoringPetugasController)

	konfirmasiTibaController := &konfirmasiController.KonfirmasiTibaPengunjungController{DB: db}
	konfirmasiRoutes.RegisterKonfirmasiTibaRoutes(mux, konfirmasiTibaController)

	konfirmasiBatalController := &konfirmasiController.KonfirmasiBatalPengunjungController{DB: db}
	konfirmasiRoutes.RegisterKonfirmasiBatalRoutes(mux, konfirmasiBatalController)

	konfirmasiSelesaiController := &konfirmasiController.KonfirmasiSelesaiPengunjungController{DB: db}
	konfirmasiRoutes.RegisterKonfirmasiSelesaiRoutes(mux, konfirmasiSelesaiController)

	// Register pembayaran routes using the informasi controller-backed route registrations
	pembayaranroutes.PembayaranInformasiRoutes(mux, db)
	pembayaranroutes.PembayaranBayarBookingRoutes(mux, db)
	pembayaranroutes.PembayaranWebhookRoutes(mux, db)

	if err := http.ListenAndServe(":8080", mux); err != nil {
		log.Fatal("Server error:", err)
	}
}
