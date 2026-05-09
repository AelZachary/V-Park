package models

type Pengunjung struct {
	IDPengunjung   uint   `gorm:"primaryKey;not null;autoIncrement"`
	IDUser         uint   `gorm:"uniqueIndex;not null"`
	NoHandphone    string `gorm:"type:varchar(30); not null"`
	JenisKendaraan string `gorm:"type:varchar(50); null"`
	PlatKendaraan  string `gorm:"type:varchar(10); null"`
}
