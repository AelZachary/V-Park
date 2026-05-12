package models

import (
	"time"
)

type Monitoring struct {
	IDMonitoring    uint      `gorm:"primaryKey;not null;autoIncrement"`
	IDPetugas       uint      `gorm:"not null;uniqueIndex:idx_monitoring_petugas_tempat"`
	IDTempatParkir  uint      `gorm:"not null;uniqueIndex:idx_monitoring_petugas_tempat"`
	WaktuMonitoring time.Time `gorm:"type:varchar(50); not null"`
}
