package models

type Token struct {
	IDToken   uint   `gorm:"primaryKey;not null;autoIncrement"`
	IDUser    uint   `gorm:"not null"`
	Token     string `gorm:"type:varchar(255); not null; unique"`
	ExpiredAt int64  `gorm:"not null"`
}
