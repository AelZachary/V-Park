package models

import (
	"time"
)

type MetodePembayaran struct {
	IDMetodePembayaran uint       `gorm:"primaryKey;autoIncrement"`
	IDPembayaran       uint       `gorm:"not null;index"`
	QRCodeBase64       string     `gorm:"type:text;null"`
	QRCodeURL          string     `gorm:"type:varchar(500);null"`
	ExpiresAt          *time.Time `gorm:"null"`
	CallbackURL        string     `gorm:"type:varchar(500);null"`
	PaymentMethod      string     `gorm:"type:varchar(50);null"` // e.g. QRIS, OVO, GoPay
}
