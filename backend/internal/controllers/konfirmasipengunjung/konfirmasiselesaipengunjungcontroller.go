package konfirmasipengunjung

import (
	"fmt"
	"net/http"
	"time"

	"v-park/internal/loggers"
	"v-park/internal/logic"
	"v-park/internal/middleware"
	"v-park/internal/models"
	"v-park/internal/response"

	"gorm.io/gorm"
)

type KonfirmasiSelesaiPengunjungController struct {
	DB *gorm.DB
}

type PembayaranDetail struct {
	IDPembayaran     uint       `json:"IDPembayaran"`
	IDRiwayatBooking uint       `json:"IDRiwayatBooking"`
	BiayaLayanan     int        `json:"BiayaLayanan"`
	BiayaPajak       int        `json:"BiayaPajak"`
	TotalPembayaran  int        `json:"TotalPembayaran"`
	WaktuPembayaran  *time.Time `json:"WaktuPembayaran"`
	StatusPembayaran string     `json:"StatusPembayaran"`
}

type KonfirmasiSelesaiResponse struct {
	RiwayatBooking RiwayatBookingResponse `json:"RiwayatBooking"`
	TempatParkir   TempatParkirResponse   `json:"TempatParkir"`
	LokasiMall     LokasiMallResponse     `json:"LokasiMall"`
	Pembayaran     PembayaranDetail       `json:"Pembayaran"`
}

func (c *KonfirmasiSelesaiPengunjungController) CreateKonfirmasiSelesaiHandler(w http.ResponseWriter, r *http.Request) {
	logger := loggers.KonfirmasiPengunjungControllerLogger
	if logger != nil {
		logger.Info("request received", "handler", "CreateKonfirmasiSelesaiHandler", "method", r.Method, "path", r.URL.Path)
	}

	if r.Method != http.MethodPost {
		response.JSON(w, http.StatusMethodNotAllowed, response.ControllerResponse{ResponseMessage: "Method not allowed"})
		return
	}

	authInfo, ok := middleware.GetPengunjungAuthInfo(r.Context())
	if !ok || authInfo.User.Pengunjung == nil {
		response.JSON(w, http.StatusUnauthorized, response.ControllerResponse{ResponseMessage: "Unauthorized"})
		return
	}

	bookingID, err := middleware.ParseBookingIDFromPath(r)
	if err != nil {
		response.JSON(w, http.StatusBadRequest, response.ControllerResponse{ResponseMessage: "IDBooking is required"})
		return
	}

	booking, err := middleware.LoadPengunjungBookingByID(c.DB, authInfo.User.Pengunjung.IDPengunjung, bookingID)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			response.JSON(w, http.StatusNotFound, response.ControllerResponse{ResponseMessage: "Booking not found"})
			return
		}
		if logger != nil {
			logger.Error("failed to load booking from token", "error", err)
		}
		response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "Database error"})
		return
	}

	var responseData KonfirmasiSelesaiResponse

	if err := c.DB.Transaction(func(tx *gorm.DB) error {
		if booking.RiwayatBooking == nil {
			return fmt.Errorf("riwayat booking not found")
		}

		if booking.RiwayatBooking.StatusBooking != "KonfirmasiTiba" {
			return fmt.Errorf("status booking tidak dapat diselesaikan")
		}

		now := time.Now()
		durasiParkir, err := logic.CalculateDurasiParkir(booking.RiwayatBooking.WaktuMasuk, now)
		if err != nil {
			return err
		}

		if err := tx.Model(&models.RiwayatBooking{}).
			Where("id_booking = ?", booking.IDBooking).
			Updates(map[string]any{
				"waktu_keluar":   now,
				"durasi_parkir":  durasiParkir,
				"status_booking": "KonfirmasiSelesai",
			}).Error; err != nil {
			return err
		}

		var updatedRiwayat models.RiwayatBooking
		if err := tx.Where("id_booking = ?", booking.IDBooking).First(&updatedRiwayat).Error; err != nil {
			return err
		}

		var tempatParkir models.TempatParkir
		if err := tx.First(&tempatParkir, booking.IDTempatParkir).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				return fmt.Errorf("tempat parkir not found")
			}
			return err
		}

		if tempatParkir.StatusTempatParkir == "Terisi" {
			if err := tx.Model(&models.TempatParkir{}).
				Where("id_tempat_parkir = ?", tempatParkir.IDTempatParkir).
				Update("status_tempat_parkir", "Tersedia").Error; err != nil {
				return err
			}

			tempatParkir.StatusTempatParkir = "Tersedia"
		}

		var lokasiMall models.LokasiMall
		if err := tx.First(&lokasiMall, tempatParkir.IDLokasiMall).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				return fmt.Errorf("lokasi mall not found")
			}
			return err
		}

		var pembayaran models.Pembayaran
		if err := tx.Where("id_riwayat_booking = ?", updatedRiwayat.IDRiwayatBooking).First(&pembayaran).Error; err != nil {
			if err != gorm.ErrRecordNotFound {
				return err
			}
			// Pembayaran might not exist yet, set default values
			pembayaran = models.Pembayaran{
				IDRiwayatBooking: updatedRiwayat.IDRiwayatBooking,
				StatusPembayaran: "MemerlukanPembayaran",
			}
		}

		responseData = KonfirmasiSelesaiResponse{
			RiwayatBooking: RiwayatBookingResponse{
				IDRiwayatBooking: updatedRiwayat.IDRiwayatBooking,
				IDBooking:        updatedRiwayat.IDBooking,
				WaktuMasuk:       updatedRiwayat.WaktuMasuk,
				WaktuKeluar:      updatedRiwayat.WaktuKeluar,
				DurasiParkir:     updatedRiwayat.DurasiParkir,
				StatusBooking:    updatedRiwayat.StatusBooking,
			},
			TempatParkir: TempatParkirResponse{
				IDTempatParkir:     tempatParkir.IDTempatParkir,
				KodeTempat:         tempatParkir.KodeTempat,
				StatusTempatParkir: tempatParkir.StatusTempatParkir,
			},
			LokasiMall: LokasiMallResponse{
				IDLokasiMall: lokasiMall.IDLokasiMall,
				AlamatLokasi: lokasiMall.AlamatLokasi,
			},
			Pembayaran: PembayaranDetail{
				IDPembayaran:     pembayaran.IDPembayaran,
				IDRiwayatBooking: pembayaran.IDRiwayatBooking,
				BiayaLayanan:     pembayaran.BiayaLayanan,
				BiayaPajak:       pembayaran.BiayaPajak,
				TotalPembayaran:  pembayaran.TotalPembayaran,
				WaktuPembayaran:  pembayaran.WaktuPembayaran,
				StatusPembayaran: pembayaran.StatusPembayaran,
			},
		}

		return nil
	}); err != nil {
		statusCode := http.StatusInternalServerError
		message := "Failed to confirm completion"
		switch err.Error() {
		case "booking not found", "riwayat booking not found", "tempat parkir not found", "lokasi mall not found":
			statusCode = http.StatusNotFound
			message = err.Error()
		case "status booking tidak dapat diselesaikan":
			statusCode = http.StatusBadRequest
			message = err.Error()
		}

		if logger != nil {
			logger.Error("failed to confirm completion", "error", err)
		}
		response.JSON(w, statusCode, response.ControllerResponse{ResponseMessage: message})
		return
	}

	response.JSON(w, http.StatusOK, responseData)
}
