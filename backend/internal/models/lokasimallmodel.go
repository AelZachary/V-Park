package models

type LokasiMall struct {
	IDLokasiMall uint   `gorm:"primaryKey;not null;autoIncrement"`
	KodeLokasi   string `gorm:"type:varchar(50); not null; unique"`
	AlamatLokasi string `gorm:"type:varchar(200); not null"`

	TempatParkir   []TempatParkir   `gorm:"foreignKey:IDLokasiMall;references:IDLokasiMall"`
	FotoLokasiMall []FotoLokasiMall `gorm:"foreignKey:IDLokasiMall;references:IDLokasiMall"`
}
