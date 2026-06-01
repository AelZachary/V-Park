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

type KonfirmasiTibaPengunjungController struct {
	DB *gorm.DB
}

type KonfirmasiTibaResponse struct {
	RiwayatBooking RiwayatBookingResponse `json:"RiwayatBooking"`
	TempatParkir   TempatParkirResponse   `json:"TempatParkir"`
	LokasiMall     LokasiMallResponse     `json:"LokasiMall"`
	Pembayaran     PembayaranResponse     `json:"Pembayaran"`
}

type RiwayatBookingResponse struct {
	IDRiwayatBooking uint       `json:"IDRiwayatBooking"`
	IDBooking        uint       `json:"IDBooking"`
	WaktuMasuk       *time.Time `json:"WaktuMasuk,omitempty"`
	WaktuKeluar      *time.Time `json:"WaktuKeluar,omitempty"`
	DurasiParkir     int        `json:"DurasiParkir"`
	StatusBooking    string     `json:"StatusBooking"`
}

type TempatParkirResponse struct {
	IDTempatParkir     uint   `json:"IDTempatParkir"`
	KodeTempat         string `json:"KodeTempat"`
	StatusTempatParkir string `json:"StatusTempatParkir"`
}

type LokasiMallResponse struct {
	IDLokasiMall uint   `json:"IDLokasiMall"`
	AlamatLokasi string `json:"AlamatLokasi"`
}

type PembayaranResponse struct {
	IDPembayaran     uint       `json:"IDPembayaran"`
	IDRiwayatBooking uint       `json:"IDRiwayatBooking"`
	BiayaLayanan     int        `json:"BiayaLayanan"`
	BiayaPajak       int        `json:"BiayaPajak"`
	TotalPembayaran  int        `json:"TotalPembayaran"`
	WaktuPembayaran  *time.Time `json:"WaktuPembayaran"`
	StatusPembayaran string     `json:"StatusPembayaran"`
}

func (c *KonfirmasiTibaPengunjungController) CreateKonfirmasiTibaHandler(w http.ResponseWriter, r *http.Request) {
	logger := loggers.KonfirmasiPengunjungControllerLogger
	if logger != nil {
		logger.Info("request received", "handler", "CreateKonfirmasiTibaHandler", "method", r.Method, "path", r.URL.Path)
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

	var responseData KonfirmasiTibaResponse

	if err := c.DB.Transaction(func(tx *gorm.DB) error {
		if booking.RiwayatBooking == nil {
			return fmt.Errorf("riwayat booking not found")
		}

		if booking.RiwayatBooking.StatusBooking != "MenungguKonfirmasi" {
			return fmt.Errorf("status booking tidak dapat dikonfirmasi")
		}

		now := time.Now().UTC()

		if err := tx.Model(&models.RiwayatBooking{}).
			Where("id_booking = ?", booking.IDBooking).
			Updates(map[string]any{
				"waktu_masuk":    now,
				"status_booking": "KonfirmasiTiba",
			}).Error; err != nil {
			return err
		}

		var updatedRiwayat models.RiwayatBooking
		if err := tx.Where("id_booking = ?", booking.IDBooking).First(&updatedRiwayat).Error; err != nil {
			return err
		}

		// Create Pembayaran record
		const biayaLayanan = 15000
		const biayaPajak = 5000
		totalPembayaran := logic.CalculateTotalPembayaran(biayaLayanan, biayaPajak)

		pembayaranRecord := models.Pembayaran{
			IDRiwayatBooking: updatedRiwayat.IDRiwayatBooking,
			BiayaLayanan:     biayaLayanan,
			BiayaPajak:       biayaPajak,
			TotalPembayaran:  totalPembayaran,
			WaktuPembayaran:  nil,
			StatusPembayaran: "MemerlukanPembayaran",
		}

		if err := tx.Create(&pembayaranRecord).Error; err != nil {
			return err
		}

		var tempatParkir models.TempatParkir
		if err := tx.First(&tempatParkir, booking.IDTempatParkir).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				return fmt.Errorf("tempat parkir not found")
			}
			return err
		}

		if tempatParkir.StatusTempatParkir == "BookingOnline" {
			if err := tx.Model(&models.TempatParkir{}).
				Where("id_tempat_parkir = ?", tempatParkir.IDTempatParkir).
				Update("status_tempat_parkir", "Terisi").Error; err != nil {
				return err
			}

			tempatParkir.StatusTempatParkir = "Terisi"
		}

		var lokasiMall models.LokasiMall
		if err := tx.First(&lokasiMall, tempatParkir.IDLokasiMall).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				return fmt.Errorf("lokasi mall not found")
			}
			return err
		}

		responseData = KonfirmasiTibaResponse{
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
			Pembayaran: PembayaranResponse{
				IDPembayaran:     pembayaranRecord.IDPembayaran,
				IDRiwayatBooking: pembayaranRecord.IDRiwayatBooking,
				BiayaLayanan:     pembayaranRecord.BiayaLayanan,
				BiayaPajak:       pembayaranRecord.BiayaPajak,
				TotalPembayaran:  pembayaranRecord.TotalPembayaran,
				WaktuPembayaran:  pembayaranRecord.WaktuPembayaran,
				StatusPembayaran: pembayaranRecord.StatusPembayaran,
			},
		}

		return nil
	}); err != nil {
		statusCode := http.StatusInternalServerError
		message := "Failed to confirm arrival"
		switch err.Error() {
		case "booking not found", "riwayat booking not found", "tempat parkir not found", "lokasi mall not found":
			statusCode = http.StatusNotFound
			message = err.Error()
		case "status booking tidak dapat dikonfirmasi":
			statusCode = http.StatusBadRequest
			message = err.Error()
		}

		if logger != nil {
			logger.Error("failed to confirm arrival", "error", err)
		}
		response.JSON(w, statusCode, response.ControllerResponse{ResponseMessage: message})
		return
	}

	response.JSON(w, http.StatusOK, responseData)
}
