package main

import (
	"log"
	"net/http"

<<<<<<< Updated upstream
	controllerauthentication "v-park/internal/controllers/authentication"
	database "v-park/internal/database"
	routesauthentication "v-park/internal/routes/authentication"
=======
	controllerauthentication "v-park/internal/controllers/authenticationcontroller"
	dashboardcontroller "v-park/internal/controllers/dashboardcontroller"
	database "v-park/internal/database"
	routesauthentication "v-park/internal/routes/authenticationroutes"
	routesdashboard "v-park/internal/routes/dashboardcontroller"
>>>>>>> Stashed changes
)

func main() {
	db, err := database.DatabaseConnect()
	if err != nil {
	}

	if err := database.MigrateAllModels(db); err != nil {
	}

	mux := http.NewServeMux()
	loginController := &controllerauthentication.LoginPengunjung{DB: db}
	routesauthentication.RegisterLoginRoutes(mux, loginController)

<<<<<<< Updated upstream
	log.Println("API server running on http://localhost:8080")
=======
	registrasiController := &controllerauthentication.RegistrasiController{DB: db}
	routesauthentication.RegisterRegistrasiRoutes(mux, registrasiController)

	dashboardPengunjungController := &dashboardcontroller.DashboardPengunjungController{DB: db}
	routesdashboard.RegisterDashboardPengunjungRoutes(mux, dashboardPengunjungController)

	tempatParkirController := &dashboardcontroller.TempatParkirController{DB: db}
	routesdashboard.TempatParkirRoutes(mux, tempatParkirController)

>>>>>>> Stashed changes
	if err := http.ListenAndServe(":8080", mux); err != nil {
	}
}
