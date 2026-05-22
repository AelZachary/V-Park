package seeders

import (
	"fmt"
	"path/filepath"

	"v-park/internal/models"

	"gorm.io/gorm"
)

const fotoLokasiMallDir = "internal/foto/internal/fotolokasimall"

type fotoLokasiMallSeedSpec struct {
	Code string
}

var fotoLokasiMallSeedSpecs = []fotoLokasiMallSeedSpec{
	{Code: "Ground Floor"},
	{Code: "Ground Floor - Area A"},
	{Code: "Lantai P1"},
	{Code: "Lantai P1 - Area A"},
	{Code: "Lantai P2"},
	{Code: "Lantai P2 - Area A"},
	{Code: "Lantai P3"},
	{Code: "Lantai P3 - Area A"},
	{Code: "Lantai P4"},
	{Code: "Lantai P4 - Area A"},
	{Code: "Lantai P5"},
}

var fotoLokasiMallSeedFiles = map[string][]string{
	"Ground Floor":          {"G_FOTO1.JPG", "G_FOTO2.JPG", "G_FOTO3.JPG", "G_FOTO4.JPG"},
	"Ground Floor - Area A": {"GA_FOTO1.JPG", "GA_FOTO2.JPG", "GA_FOTO3.JPG", "GA_FOTO4.JPG"},
	"Lantai P1":             {"P1_FOTO1.JPG", "P1_FOTO2.JPG", "P1_FOTO3.JPG", "P1_FOTO4.JPG"},
	"Lantai P1 - Area A":    {"P1A_FOTO1.JPG", "P1A_FOTO2.JPG", "P1A_FOTO3.JPG", "P1A_FOTO4.JPG"},
	"Lantai P2":             {"P2_FOTO1.JPG", "P2_FOTO2.JPG", "P2_FOTO3.JPG", "P2_FOTO4.JPG"},
	"Lantai P2 - Area A":    {"IMG_6169.JPG", "IMG_6170.JPG", "IMG_6171.JPG", "IMG_6172.JPG"},
	"Lantai P3":             {"IMG_6173.JPG", "IMG_6174.JPG", "IMG_6175.JPG", "IMG_6176.JPG"},
	"Lantai P3 - Area A":    {"IMG_6177.JPG", "IMG_6178.JPG", "IMG_6179.JPG", "IMG_6180.JPG"},
	"Lantai P4":             {"IMG_6181.JPG", "IMG_6182.JPG", "IMG_6183.JPG", "IMG_6184.JPG"},
	"Lantai P4 - Area A":    {"P4A_FOTO1.JPG", "P4A_FOTO2.JPG", "P4A_FOTO3.JPG", "P4A_FOTO4.JPG"},
	"Lantai P5":             {"P5_FOTO1.JPG", "P5_FOTO2.JPG", "P5_FOTO3.JPG", "P5_FOTO4.JPG"},
}

func FotoLokasiMallBulkSeeders(db *gorm.DB, lokasiMalls []models.LokasiMall) []models.FotoLokasiMall {
	created := make([]models.FotoLokasiMall, 0, len(lokasiMalls)*4)

	for idx, spec := range fotoLokasiMallSeedSpecs {
		if idx >= len(lokasiMalls) {
			break
		}

		files, ok := fotoLokasiMallSeedFiles[spec.Code]
		if !ok {
			panic(fmt.Sprintf("missing foto seeder files for lokasi mall %s", spec.Code))
		}

		lokasiMall := lokasiMalls[idx]
		for _, fileName := range files {
			fotoPath := filepath.ToSlash(filepath.Join(fotoLokasiMallDir, fileName))
			fotoLokasiMall := models.FotoLokasiMall{
				IDLokasiMall: lokasiMall.IDLokasiMall,
				FotoLokasi:   fotoPath,
			}

			if err := db.Where("id_lokasi_mall = ? AND foto_lokasi = ?", lokasiMall.IDLokasiMall, fotoPath).
				Assign(models.FotoLokasiMall{
					IDLokasiMall: lokasiMall.IDLokasiMall,
					FotoLokasi:   fotoPath,
				}).
				FirstOrCreate(&fotoLokasiMall).Error; err != nil {
				panic(fmt.Sprintf("Failed to seed foto lokasi mall %s for lokasi mall %d: %v", fileName, lokasiMall.IDLokasiMall, err))
			}

			created = append(created, fotoLokasiMall)
		}
	}

	return created
}
