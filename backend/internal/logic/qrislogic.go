package logic

import (
	"time"
)

// QRISPaymentConfig holds payment details for QRIS
type QRISPaymentConfig struct {
	Amount      int64
	Reference   string
	Description string
	ExpiresAt   time.Time
}

// CalculateExpiryTime returns expiry time (default 10 minutes from now)
func CalculateExpiryTime(minutes int) time.Time {
	if minutes == 0 {
		minutes = 10 // default
	}
	return time.Now().Add(time.Duration(minutes) * time.Minute)
}
