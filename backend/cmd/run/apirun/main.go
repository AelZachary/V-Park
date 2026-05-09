package main

import (
	"log"
	"net/http"

	controllerauthentication "v-park/internal/controllers/authentication"
	database "v-park/internal/database"
	routesauthentication "v-park/internal/routes/authentication"
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

	log.Println("API server running on http://localhost:8080")
	if err := http.ListenAndServe(":8080", mux); err != nil {
	}
}
