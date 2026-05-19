package main

import (
	"log"
	"net/http"

	database "v-park/internal/database"

	authenticationcontroller "v-park/internal/controllers/authenticationcontroller"
	dashboardcontroller "v-park/internal/controllers/dashboardcontroller"
	statuscontroller "v-park/internal/controllers/statustempatparkircontroller"

	authenticationroutes "v-park/internal/routes/authenticationroutes"
	dashboardroutes "v-park/internal/routes/dashboardroutes"
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

	if err := http.ListenAndServe(":8080", mux); err != nil {
		log.Fatal("Server error:", err)
	}
}
