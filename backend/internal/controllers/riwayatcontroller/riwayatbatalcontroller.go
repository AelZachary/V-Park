package riwayatcontroller

import (
	"net/http"
	"strconv"
	"time"

	"v-park/internal/models"
	"v-park/internal/response"

	"gorm.io/gorm"
)

type RiwayatBatalController struct {
	DB *gorm.DB
}

type RiwayatBatalBookingResponse struct {
	IDBooking    uint      `json:"IDBooking"`
	PlatPengguna string    `json:"PlatPengguna"`
	WaktuBooking time.Time `json:"WaktuBooking"`
}

type RiwayatBatalRiwayatResponse struct {
	StatusBooking string     `json:"StatusBooking"`
}

type RiwayatBatalTempatParkirResponse struct {
	KodeTempat string `json:"KodeTempat"`
}

type RiwayatBatalLokasiMallResponse struct {
	AlamatLokasi string `json:"AlamatLokasi"`
}

type RiwayatBatalResponse struct {
	Booking        RiwayatBatalBookingResponse      `json:"Booking"`
	RiwayatBooking RiwayatBatalRiwayatResponse      `json:"RiwayatBooking"`
	TempatParkir   RiwayatBatalTempatParkirResponse `json:"TempatParkir"`
	LokasiMall     RiwayatBatalLokasiMallResponse   `json:"LokasiMall"`
}

func timePtrBatal(value time.Time) *time.Time {
	if value.IsZero() {
		return nil
	}
	copyValue := value
	return &copyValue
}

func (c *RiwayatBatalController) GetRiwayatBatalByPengunjungHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
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

	var bookings []models.Booking
	if err := c.DB.Preload("RiwayatBooking").Where("id_pengunjung = ?", uint(idPengunjung)).Order("id_booking DESC").Find(&bookings).Error; err != nil {
		response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "Database error"})
		return
	}

	responseData := make([]RiwayatBatalResponse, 0)
	for _, booking := range bookings {
		if booking.RiwayatBooking == nil || booking.RiwayatBooking.StatusBooking != "Dibatalkan" {
			continue
		}

		var tempat models.TempatParkir
		if err := c.DB.First(&tempat, booking.IDTempatParkir).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				continue
			}
			response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "Database error"})
			return
		}

		var lokasi models.LokasiMall
		if err := c.DB.First(&lokasi, tempat.IDLokasiMall).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				continue
			}
			response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "Database error"})
			return
		}

		responseData = append(responseData, RiwayatBatalResponse{
			Booking: RiwayatBatalBookingResponse{
				IDBooking:    booking.IDBooking,
				PlatPengguna: booking.PlatPengguna,
				WaktuBooking: booking.WaktuBooking,
			},
			RiwayatBooking: RiwayatBatalRiwayatResponse{
				StatusBooking: booking.RiwayatBooking.StatusBooking,
			},
			TempatParkir: RiwayatBatalTempatParkirResponse{
				KodeTempat: tempat.KodeTempat,
			},
			LokasiMall: RiwayatBatalLokasiMallResponse{
				AlamatLokasi: lokasi.AlamatLokasi,
			},
		})
	}

	if len(responseData) == 0 {
		response.JSON(w, http.StatusNotFound, response.ControllerResponse{ResponseMessage: "Riwayat batal not found"})
		return
	}

	response.JSON(w, http.StatusOK, responseData)
}
