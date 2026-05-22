package models

type FotoLokasiMall struct {
	IDFotoLokasiMall uint   `gorm:"primaryKey;not null;autoIncrement"`
	IDLokasiMall     uint   `gorm:"not null"`
	FotoLokasi       string `gorm:"type:varchar(255); not null"`
}
