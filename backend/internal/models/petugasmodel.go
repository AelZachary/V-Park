package models

import "time"

type Petugas struct {
	IDPetugas            uint      `gorm:"primaryKey;not null;autoIncrement"`
	IDUser               uint      `gorm:"uniqueIndex;not null"`
	FotoPetugas          string    `gorm:"type:varchar(255); null"`
	MallBertugas         string    `gorm:"type:varchar(50); not null"`
	ShiftMulaiBertugas   time.Time `gorm:"not null"`
	ShiftSelesaiBertugas time.Time `gorm:"not null"`

	Monitoring []Monitoring `gorm:"foreignKey:IDPetugas;references:IDPetugas"`
}
