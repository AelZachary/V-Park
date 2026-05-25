package konfirmasipengunjung

import (
	"fmt"
	"net/http"
	"time"

	"v-park/internal/loggers"
	"v-park/internal/middleware"
	"v-park/internal/models"
	"v-park/internal/response"

	"gorm.io/gorm"
)

type KonfirmasiBatalPengunjungController struct {
	DB *gorm.DB
}

type RiwayatBatalResponse struct {
	StatusBooking string `json:"StatusBooking"`
}

type BookingResponse struct {
	IDBooking         uint      `json:"IDBooking"`
	IDPengunjung      uint      `json:"IDPengunjung"`
	NamaPengunjung    string    `json:"NamaPengunjung"`
	NoPengguna        string    `json:"NoPengguna"`
	KendaraanPengguna string    `json:"KendaraanPengguna"`
	PlatPengguna      string    `json:"PlatPengguna"`
	WaktuBooking      time.Time `json:"WaktuBooking"`
}

type KonfirmasiBatalResponse struct {
	Booking        BookingResponse      `json:"Booking"`
	RiwayatBooking RiwayatBatalResponse `json:"RiwayatBooking"`
	TempatParkir   TempatParkirResponse `json:"TempatParkir"`
	LokasiMall     LokasiMallResponse   `json:"LokasiMall"`
}

func (c *KonfirmasiBatalPengunjungController) CreateKonfirmasiBatalHandler(w http.ResponseWriter, r *http.Request) {
	logger := loggers.KonfirmasiPengunjungControllerLogger
	if logger != nil {
		logger.Info("request received", "handler", "CreateKonfirmasiBatalHandler", "method", r.Method, "path", r.URL.Path)
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

	var responseData KonfirmasiBatalResponse

	if err := c.DB.Transaction(func(tx *gorm.DB) error {
		if booking.RiwayatBooking == nil {
			return fmt.Errorf("riwayat booking not found")
		}

		if booking.RiwayatBooking.StatusBooking != "MenungguKonfirmasi" {
			return fmt.Errorf("status booking tidak dapat dibatalkan")
		}

		if err := tx.Model(&models.RiwayatBooking{}).
			Where("id_booking = ?", booking.IDBooking).
			Update("status_booking", "Dibatalkan").Error; err != nil {
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

		if tempatParkir.StatusTempatParkir == "BookingOnline" {
			if err := tx.Model(&models.TempatParkir{}).
				Where("id_tempat_parkir = ?", tempatParkir.IDTempatParkir).
				Update("status_tempat_parkir", "Kosong").Error; err != nil {
				return err
			}
			tempatParkir.StatusTempatParkir = "Kosong"
		}

		var lokasiMall models.LokasiMall
		if err := tx.First(&lokasiMall, tempatParkir.IDLokasiMall).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				return fmt.Errorf("lokasi mall not found")
			}
			return err
		}

		responseData = KonfirmasiBatalResponse{
			Booking: BookingResponse{
				IDBooking:         booking.IDBooking,
				IDPengunjung:      booking.IDPengunjung,
				NamaPengunjung:    booking.NamaPengguna,
				NoPengguna:        booking.NoPengguna,
				KendaraanPengguna: booking.KendaraanPengguna,
				PlatPengguna:      booking.PlatPengguna,
				WaktuBooking:      booking.WaktuBooking,
			},
			RiwayatBooking: RiwayatBatalResponse{
				StatusBooking: updatedRiwayat.StatusBooking,
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
		}

		return nil
	}); err != nil {
		statusCode := http.StatusInternalServerError
		message := "Failed to cancel booking"
		switch err.Error() {
		case "booking not found", "riwayat booking not found", "tempat parkir not found", "lokasi mall not found":
			statusCode = http.StatusNotFound
			message = err.Error()
		case "status booking tidak dapat dibatalkan":
			statusCode = http.StatusBadRequest
			message = err.Error()
		}

		if logger != nil {
			logger.Error("failed to cancel booking", "error", err)
		}
		response.JSON(w, statusCode, response.ControllerResponse{ResponseMessage: message})
		return
	}

	response.JSON(w, http.StatusOK, responseData)
}
