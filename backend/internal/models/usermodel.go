package models

type User struct {
	IDUser       uint   `gorm:"primaryKey;not null;autoIncrement"`
	Username     string `gorm:"type:varchar(20);uniqueindex;not null"`
	Password     string `gorm:"type:varchar(100);not null"`
	IsPengunjung bool   `gorm:"not null"`

	Pengunjung *Pengunjung `gorm:"foreignKey:IDUser;references:IDUser"`
	Petugas    *Petugas    `gorm:"foreignKey:IDUser;references:IDUser"`
}
