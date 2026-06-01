package models

import "time"

type RiwayatBooking struct {
	IDRiwayatBooking uint       `gorm:"primaryKey;not null;autoIncrement"`
	IDBooking        uint       `gorm:"not null"`
	WaktuMasuk       *time.Time `gorm:"default:null"`
	WaktuKeluar      *time.Time `gorm:"default:null"`
	DurasiParkir     int        `gorm:" null"`
	StatusBooking    string     `gorm:"type:varchar(20);not null"`

	Pembayaran *Pembayaran `gorm:"foreignKey:IDRiwayatBooking;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}
