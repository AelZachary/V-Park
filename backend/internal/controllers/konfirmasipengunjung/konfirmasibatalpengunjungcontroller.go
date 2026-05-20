package konfirmasipengunjung

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

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
	if r.Method != http.MethodPost {
		response.JSON(w, http.StatusMethodNotAllowed, response.ControllerResponse{ResponseMessage: "Method not allowed"})
		return
	}

	pathID := r.PathValue("IDBooking")
	if pathID == "" {
		response.JSON(w, http.StatusBadRequest, response.ControllerResponse{ResponseMessage: "IDBooking is required"})
		return
	}

	idBooking, err := strconv.ParseUint(pathID, 10, 64)
	if err != nil || idBooking == 0 {
		response.JSON(w, http.StatusBadRequest, response.ControllerResponse{ResponseMessage: "IDBooking is invalid"})
		return
	}

	var responseData KonfirmasiBatalResponse

	if err := c.DB.Transaction(func(tx *gorm.DB) error {
		var booking models.Booking
		if err := tx.Preload("RiwayatBooking").First(&booking, uint(idBooking)).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				return fmt.Errorf("booking not found")
			}
			return err
		}

		if booking.RiwayatBooking == nil {
			return fmt.Errorf("riwayat booking not found")
		}

		if booking.RiwayatBooking.StatusBooking != "MenungguKonfirmasi" {
			return fmt.Errorf("status booking tidak dapat dibatalkan")
		}

		if err := tx.Model(&models.RiwayatBooking{}).
			Where("id_booking = ?", uint(idBooking)).
			Update("status_booking", "Dibatalkan").Error; err != nil {
			return err
		}

		var updatedRiwayat models.RiwayatBooking
		if err := tx.Where("id_booking = ?", uint(idBooking)).First(&updatedRiwayat).Error; err != nil {
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
		switch err.Error() {
		case "booking not found", "riwayat booking not found", "tempat parkir not found", "lokasi mall not found":
			statusCode = http.StatusNotFound
		case "status booking tidak dapat dibatalkan":
			statusCode = http.StatusBadRequest
		}

		response.JSON(w, statusCode, response.ControllerResponse{ResponseMessage: err.Error()})
		return
	}

	response.JSON(w, http.StatusOK, responseData)
}
