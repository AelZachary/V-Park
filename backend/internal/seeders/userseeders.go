package seeders

import (
	"fmt"

	"v-park/internal/models"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func UsersSeeders(db *gorm.DB) (models.User, models.User) {
	pengunjungUsers, petugasUsers := UsersBulkSeeders(db)
	if len(pengunjungUsers) == 0 || len(petugasUsers) == 0 {
		panic("failed to seed users")
	}
	return pengunjungUsers[0], petugasUsers[0]
}

func UsersBulkSeeders(db *gorm.DB) ([]models.User, []models.User) {
	password := "password123"

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		panic(fmt.Sprintf("Failed to hash password: %v", err))
	}

	pengunjungUsers := make([]models.User, 0, 30)
	for i := 1; i <= 30; i++ {
		username := fmt.Sprintf("pengunjung_%02d", i)
		user := models.User{
			Username:     username,
			Password:     string(hashedPassword),
			IsPengunjung: true,
		}

		if err := db.Where("username = ?", username).
			Assign(models.User{Password: string(hashedPassword), IsPengunjung: true}).
			FirstOrCreate(&user).Error; err != nil {
			panic(fmt.Sprintf("Failed to seed user %s: %v", username, err))
		}

		if err := db.Where("username = ?", username).First(&user).Error; err != nil {
			panic(fmt.Sprintf("Failed to load user %s: %v", username, err))
		}

		pengunjungUsers = append(pengunjungUsers, user)
	}

	petugasUsers := make([]models.User, 0, 12)
	for i := 1; i <= 12; i++ {
		username := fmt.Sprintf("petugas_%02d", i)
		user := models.User{
			Username:     username,
			Password:     string(hashedPassword),
			IsPengunjung: false,
		}

		if err := db.Where("username = ?", username).
			Assign(models.User{Password: string(hashedPassword), IsPengunjung: false}).
			FirstOrCreate(&user).Error; err != nil {
			panic(fmt.Sprintf("Failed to seed user %s: %v", username, err))
		}

		if err := db.Where("username = ?", username).First(&user).Error; err != nil {
			panic(fmt.Sprintf("Failed to load user %s: %v", username, err))
		}

		petugasUsers = append(petugasUsers, user)
	}

	return pengunjungUsers, petugasUsers
}
