package main

import (
	"log"
	"net/http"

	controllerauthentication "v-park/internal/controllers/authenticationcontroller"
	database "v-park/internal/database"
	routesauthentication "v-park/internal/routes/authenticationroutes"
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

	loginController := &controllerauthentication.LoginPengunjung{DB: db}
	routesauthentication.RegisterLoginRoutes(mux, loginController)

	registrasiController := &controllerauthentication.RegistrasiController{DB: db}
	routesauthentication.RegisterRegistrasiRoutes(mux, registrasiController)

	log.Println("API server running on http://localhost:8080")
	log.Println("Available endpoints:")
	log.Println("  POST /api/authentication/login")
	log.Println("  POST /api/authentication/registrasi")

	if err := http.ListenAndServe(":8080", mux); err != nil {
		log.Fatal("Server error:", err)
	}
}
