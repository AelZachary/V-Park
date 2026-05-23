package models

import "time"

type Token struct {
	IDToken   uint       `gorm:"primaryKey;not null;autoIncrement"`
	IDUser    uint       `gorm:"not null;index"`
	Token     string     `gorm:"type:varchar(255);not null"`
	ExpiredAt *time.Time `gorm:"null"`
}
