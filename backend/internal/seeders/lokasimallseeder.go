package seeders

import (
	"fmt"

	"v-park/internal/models"

	"gorm.io/gorm"
)

type lokasiMallSeedSpec struct {
	Code    string
	Address string
}

var lokasiMallSeedSpecs = []lokasiMallSeedSpec{
	{Code: "Ground Floor", Address: "Area parkir dasar yang berada dekat akses masuk utama mall. Memiliki akses langsung ke lobby mall serta lift utama pengunjung"},
	{Code: "Ground Floor - Area A", Address: "Zona parkir transisi setelah Ground Floor dengan posisi setengah lantai di atas area G"},
	{Code: "Lantai P1", Address: "Area parkir utama yang memiliki akses langsung ke dalam mall serta terhubung dengan lift utama pengunjung"},
	{Code: "Lantai P1 - Area A", Address: "Zona parkir tambahan setelah area P1 dengan posisi setengah lantai lebih tinggi"},
	{Code: "Lantai P2", Address: "Area parkir lantai 2 yang terhubung dengan lift utama"},
	{Code: "Lantai P2 - Area A", Address: "Zona parkir tambahan setelah area P2 dengan kondisi parkiran lebih longgar"},
	{Code: "Lantai P3", Address: "Area parkir utama lantai 3 dengan akses lift menuju lantai mall"},
	{Code: "Lantai P3 - Area A", Address: "Zona parkir split-level setelah P3 dengan kondisi parkiran lebih tenang"},
	{Code: "Lantai P4", Address: "Area parkir utama dekat lift dengan suasana lebih tenang"},
	{Code: "Lantai P4 - Area A", Address: "Zona tambahan setelah P4 dengan akses kendaraan lebih lancar"},
	{Code: "Lantai P5", Address: "Area parkir paling atas dengan akses lift menuju lantai utama mall"},
}

func LokasiMallSeeders(db *gorm.DB) models.LokasiMall {
	result := LokasiMallBulkSeeders(db)
	if len(result) == 0 {
		panic("failed to seed lokasi mall")
	}
	return result[0]
}

func LokasiMallBulkSeeders(db *gorm.DB) []models.LokasiMall {
	result := make([]models.LokasiMall, 0, len(lokasiMallSeedSpecs))
	for _, spec := range lokasiMallSeedSpecs {
		lokasiMall := models.LokasiMall{
			KodeLokasi:   spec.Code,
			AlamatLokasi: spec.Address,
		}

		if err := db.Where("alamat_lokasi = ?", spec.Address).
			Assign(models.LokasiMall{
				KodeLokasi:   spec.Code,
				AlamatLokasi: spec.Address,
			}).
			FirstOrCreate(&lokasiMall).Error; err != nil {
			panic(fmt.Sprintf("Failed to seed lokasi mall %s: %v", spec.Address, err))
		}

		result = append(result, lokasiMall)
	}

	return result
}
