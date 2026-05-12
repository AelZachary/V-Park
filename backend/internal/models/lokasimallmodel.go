package models

type LokasiMall struct {
	IDLokasiMall uint   `gorm:"primaryKey;not null;autoIncrement"`
	AlamatLokasi string `gorm:"type:varchar(200); not null"`

	TempatParkir []TempatParkir `gorm:"foreignKey:IDLokasiMall;references:IDLokasiMall"`
}
