package models

import "time"

type Pembayaran struct {
	IDPembayaran     uint      `gorm:"primaryKey;not null;autoIncrement"`
	IDRiwayatBooking uint      `gorm:"not null"`
	BiayaLayanan     int       `gorm:"null"`
	BiayaPajak       int       `gorm:"null"`
	TotalPembayaran  int       `gorm:"null"`
	WaktuPembayaran  time.Time `gorm:"null"`
	StatusPembayaran string    `gorm:"type:varchar(20); not null"`
}
