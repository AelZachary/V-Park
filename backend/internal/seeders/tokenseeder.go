package seeders

import (
	"fmt"
	"time"

	"v-park/internal/models"

	"gorm.io/gorm"
)

func TokenSeeders(db *gorm.DB, userID uint) models.Token {
	result := TokenBulkSeeders(db, []uint{userID})
	if len(result) == 0 {
		panic("failed to seed token")
	}
	return result[0]
}

func TokenBulkSeeders(db *gorm.DB, userIDs []uint) []models.Token {
	result := make([]models.Token, 0, len(userIDs))
	baseExpiry := time.Now().Add(30 * 24 * time.Hour)

	for i, userID := range userIDs {
		tokenValue := fmt.Sprintf("token_user_%d_%d", userID, i+1)
		expiry := baseExpiry.Add(time.Duration(i) * time.Hour)
		token := models.Token{
			IDUser:    userID,
			Token:     tokenValue,
			ExpiredAt: &expiry,
		}

		if err := db.Where("id_user = ?", userID).
			Assign(models.Token{
				Token:     tokenValue,
				ExpiredAt: &expiry,
			}).
			FirstOrCreate(&token).Error; err != nil {
			panic(fmt.Sprintf("Failed to seed token for user %d: %v", userID, err))
		}

		result = append(result, token)
	}

	return result
}
