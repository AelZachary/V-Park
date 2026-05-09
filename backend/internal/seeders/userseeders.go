package seeders

import (
	"fmt"

	"v-park/internal/models"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func UsersSeeders(db *gorm.DB) (models.User, models.User) {
	password := "password123"

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		panic(fmt.Sprintf("Failed to hash password: %v", err))
	}

	// Seed pengunjung user
	pengunjung := models.User{
		Username:     "Pengunjung1",
		Password:     string(hashedPassword),
		IsPengunjung: true,
	}
	if err := db.Where("username = ?", pengunjung.Username).
		Assign(models.User{
			Password: string(hashedPassword),
		}).
		FirstOrCreate(&pengunjung).Error; err != nil {
		panic(fmt.Sprintf("Failed to seed pengunjung: %v", err))
	}

	// Refresh pengunjung dari database untuk mendapatkan ID
	if err := db.Where("username = ?", pengunjung.Username).First(&pengunjung).Error; err != nil {
		panic(fmt.Sprintf("Failed to load pengunjung: %v", err))
	}

	// Seed petugas user
	petugas := models.User{
		Username:     "Petugas1",
		Password:     string(hashedPassword),
		IsPengunjung: false,
	}
	if err := db.Where("username = ?", petugas.Username).
		Assign(models.User{
			Password: string(hashedPassword),
		}).
		FirstOrCreate(&petugas).Error; err != nil {
		panic(fmt.Sprintf("Failed to seed petugas: %v", err))
	}

	// Refresh petugas dari database untuk mendapatkan ID
	if err := db.Where("username = ?", petugas.Username).First(&petugas).Error; err != nil {
		panic(fmt.Sprintf("Failed to load petugas: %v", err))
	}

	return pengunjung, petugas
}
