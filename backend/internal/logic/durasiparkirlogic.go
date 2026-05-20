package logic

import (
	"fmt"
	"time"
)

func CalculateDurasiParkir(waktuMasuk, waktuKeluar time.Time) (int, error) {
	if waktuKeluar.Before(waktuMasuk) {
		return 0, fmt.Errorf("waktu keluar tidak boleh lebih kecil dari waktu masuk")
	}

	duration := waktuKeluar.Sub(waktuMasuk)
	return int(duration.Seconds()), nil
}
