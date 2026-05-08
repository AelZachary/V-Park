package config

import (
	"log"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

type DBConfig struct {
	User     string
	Password string
	Host     string
	Port     int
	Name     string
}

func DatabaseConfig() *DBConfig {
	possibleEnv := []string{".env", "../.env", "../../.env", "../../../.env", "../../../../.env"}
	loaded := false
	for _, path := range possibleEnv {
		if err := godotenv.Load(path); err == nil {
			loaded = true
			break
		}
	}
	if !loaded {
		log.Println("Warning: .env file not found in expected paths; relying on system env vars")
	}

	port, err := strconv.Atoi(os.Getenv("MYSQL_PORT"))
	if err != nil {
		port = 3306
	}

	return &DBConfig{
		User:     os.Getenv("MYSQL_USER"),
		Password: os.Getenv("MYSQL_PASSWORD"),
		Host:     os.Getenv("MYSQL_HOST"),
		Port:     port,
		Name:     os.Getenv("MYSQL_DB"),
	}
}
