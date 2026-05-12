package models

type TempatParkir struct {
	IDTempatParkir     uint   `gorm:"primaryKey;not null;autoIncrement"`
	IDLokasiMall       uint   `gorm:"not null"`
	KodeTempat         string `gorm:"type:varchar(10); not null"`
	LokasiTempatParkir string `gorm:"type:varchar(30); not null"`
	StatusTempatParkir string `gorm:"type:varchar(20); not null"`

	Monitoring []Monitoring `gorm:"foreignKey:IDTempatParkir;references:IDTempatParkir"`
}
