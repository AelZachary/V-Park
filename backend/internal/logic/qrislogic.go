package logic

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/skip2/go-qrcode"
)

// QRISPaymentConfig holds payment details for QRIS
type QRISPaymentConfig struct {
	Amount      int64
	Reference   string
	Description string
	ExpiresAt   time.Time
}

// GenerateQRCode creates a QR code image in base64 and returns it
// For QRIS, typically you'd integrate with a payment processor (Midtrans, Xendit, etc.)
// For now, this generates a simple QR code with reference
func GenerateQRCode(config QRISPaymentConfig) (qrCodeBase64 string, err error) {
	// Create QRIS payload (simplified format)
	qrisData := map[string]interface{}{
		"reference":  config.Reference,
		"amount":     float64(config.Amount) / 100, // Convert to decimal (IDR)
		"expires_at": config.ExpiresAt.Unix(),
	}

	qrisJSON, _ := json.Marshal(qrisData)
	qrisStr := string(qrisJSON)

	// Generate QR code
	qr, err := qrcode.New(qrisStr, qrcode.Medium)
	if err != nil {
		log.Printf("Failed to generate QR code: %v", err)
		return "", fmt.Errorf("qr code generation failed: %w", err)
	}

	// Convert to base64 PNG
	qr.DisableBorder = false
	png, err := qr.PNG(256)
	if err != nil {
		return "", fmt.Errorf("qr png conversion failed: %w", err)
	}

	// Encode to base64
	qrCodeBase64 = "data:image/png;base64," + ToBase64(png)
	return qrCodeBase64, nil
}

// ToBase64 converts bytes to base64 string
func ToBase64(data []byte) string {
	return base64.StdEncoding.EncodeToString(data)
}

// CalculateExpiryTime returns expiry time (default 10 minutes from now)
func CalculateExpiryTime(minutes int) time.Time {
	if minutes == 0 {
		minutes = 10 // default
	}
	return time.Now().Add(time.Duration(minutes) * time.Minute)
}
