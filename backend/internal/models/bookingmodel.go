package models

import "time"

type Booking struct {
	IDBooking         uint      `gorm:"primaryKey;not null;autoIncrement"`
	IDPengunjung      uint      `gorm:"not null"`
	IDTempatParkir    uint      `gorm:"not null"`
	NamaPengguna      string    `gorm:"type:varchar(50); not null"`
	NoPengguna        string    `gorm:"type:varchar(30); not null"`
	KendaraanPengguna string    `gorm:"type:varchar(70); not null"`
	PlatPengguna      string    `gorm:"type:varchar(10); not null"`
	WaktuBooking      time.Time `gorm:"not null"`

	RiwayatBooking *RiwayatBooking `gorm:"foreignKey:IDBooking;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}
