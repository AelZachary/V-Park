package statustempatparkircontroller

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"v-park/internal/models"
	"v-park/internal/response"

	"gorm.io/gorm"
)

type BookingPengunjungController struct {
	DB *gorm.DB
}

type BookingPengunjungRequest struct {
	IDTempatParkir    uint   `json:"IDTempatParkir"`
	NamaPengguna      string `json:"NamaPengguna"`
	NoPengguna        string `json:"NoPengguna"`
	KendaraanPengguna string `json:"KendaraanPengguna"`
	PlatPengguna      string `json:"PlatPengguna"`
}

type BookingPengunjungResponse struct {
	Booking      BookingResponse      `json:"Booking"`
	TempatParkir TempatParkirResponse `json:"TempatParkir"`
	LokasiMall   LokasiMallResponse   `json:"LokasiMall"`
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

type TempatParkirResponse struct {
	IDTempatParkir     uint   `json:"IDTempatParkir"`
	KodeTempat         string `json:"KodeTempat"`
	StatusTempatParkir string `json:"StatusTempatParkir"`
}

type LokasiMallResponse struct {
	IDLokasiMall uint   `json:"IDLokasiMall"`
	AlamatLokasi string `json:"AlamatLokasi"`
}

func (c *BookingPengunjungController) CreateBookingPengunjungHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		response.JSON(w, http.StatusMethodNotAllowed, response.ControllerResponse{ResponseMessage: "Method not allowed"})
		return
	}

	pathID := r.PathValue("IDPengunjung")
	if pathID == "" {
		response.JSON(w, http.StatusBadRequest, response.ControllerResponse{ResponseMessage: "IDPengunjung is required"})
		return
	}

	idPengunjung, err := strconv.ParseUint(pathID, 10, 64)
	if err != nil || idPengunjung == 0 {
		response.JSON(w, http.StatusBadRequest, response.ControllerResponse{ResponseMessage: "IDPengunjung is invalid"})
		return
	}

	var req BookingPengunjungRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		response.JSON(w, http.StatusBadRequest, response.ControllerResponse{ResponseMessage: "Invalid JSON format"})
		return
	}

	if req.IDTempatParkir == 0 || req.NamaPengguna == "" || req.NoPengguna == "" || req.KendaraanPengguna == "" || req.PlatPengguna == "" {
		response.JSON(w, http.StatusBadRequest, response.ControllerResponse{ResponseMessage: "IDTempatParkir, NamaPengguna, NoPengguna, KendaraanPengguna, and PlatPengguna are required"})
		return
	}

	var responseData BookingPengunjungResponse

	if err := c.DB.Transaction(func(tx *gorm.DB) error {
		var tempatParkir models.TempatParkir
		if err := tx.First(&tempatParkir, req.IDTempatParkir).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				return fmt.Errorf("tempat parkir not found")
			}
			return err
		}

		var lokasiMall models.LokasiMall
		if err := tx.First(&lokasiMall, tempatParkir.IDLokasiMall).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				return fmt.Errorf("lokasi mall not found")
			}
			return err
		}

		booking := models.Booking{
			IDPengunjung:      uint(idPengunjung),
			IDTempatParkir:    req.IDTempatParkir,
			NamaPengguna:      req.NamaPengguna,
			NoPengguna:        req.NoPengguna,
			KendaraanPengguna: req.KendaraanPengguna,
			PlatPengguna:      req.PlatPengguna,
			WaktuBooking:      time.Now().UTC(),
		}

		if err := tx.Create(&booking).Error; err != nil {
			return err
		}

		if err := tx.Model(&models.TempatParkir{}).
			Where("id_tempat_parkir = ?", req.IDTempatParkir).
			Update("status_tempat_parkir", "BookingOnline").Error; err != nil {
			return err
		}

		responseData = BookingPengunjungResponse{
			Booking: BookingResponse{
				IDBooking:         booking.IDBooking,
				IDPengunjung:      booking.IDPengunjung,
				NamaPengunjung:    booking.NamaPengguna,
				NoPengguna:        booking.NoPengguna,
				KendaraanPengguna: booking.KendaraanPengguna,
				PlatPengguna:      booking.PlatPengguna,
				WaktuBooking:      booking.WaktuBooking,
			},
			TempatParkir: TempatParkirResponse{
				IDTempatParkir:     tempatParkir.IDTempatParkir,
				KodeTempat:         tempatParkir.KodeTempat,
				StatusTempatParkir: "BookingOnline",
			},
			LokasiMall: LokasiMallResponse{
				IDLokasiMall: lokasiMall.IDLokasiMall,
				AlamatLokasi: lokasiMall.AlamatLokasi,
			},
		}

		return nil
	}); err != nil {
		statusCode := http.StatusInternalServerError
		if err.Error() == "tempat parkir not found" || err.Error() == "lokasi mall not found" {
			statusCode = http.StatusNotFound
		}
		response.JSON(w, statusCode, response.ControllerResponse{ResponseMessage: err.Error()})
		return
	}

	response.JSON(w, http.StatusCreated, responseData)
}
