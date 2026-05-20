package riwayatcontroller

import (
	"net/http"
	"strconv"
	"time"

	"v-park/internal/models"
	"v-park/internal/response"

	"gorm.io/gorm"
)

type RiwayatSelesaiController struct {
	DB *gorm.DB
}

type RiwayatSelesaiBookingResponse struct {
	IDBooking    uint      `json:"IDBooking"`
	PlatPengguna string    `json:"PlatPengguna"`
	WaktuBooking time.Time `json:"WaktuBooking"`
}

type RiwayatSelesaiRiwayatResponse struct {
	WaktuMasuk    *time.Time `json:"WaktuMasuk"`
	WaktuKeluar   *time.Time `json:"WaktuKeluar,omitempty"`
	DurasiParkir  *int       `json:"DurasiParkir,omitempty"`
	StatusBooking string     `json:"StatusBooking"`
}

type RiwayatSelesaiTempatParkirResponse struct {
	KodeTempat string `json:"KodeTempat"`
}

type RiwayatSelesaiLokasiMallResponse struct {
	AlamatLokasi string `json:"AlamatLokasi"`
}

type RiwayatSelesaiMetodePembayaranResponse struct {
	JumlahPembayaran int `json:"JumlahPembayaran"`
}

type RiwayatSelesaiResponse struct {
	Booking          RiwayatSelesaiBookingResponse           `json:"Booking"`
	RiwayatBooking   RiwayatSelesaiRiwayatResponse           `json:"RiwayatBooking"`
	TempatParkir     RiwayatSelesaiTempatParkirResponse      `json:"TempatParkir"`
	LokasiMall       RiwayatSelesaiLokasiMallResponse        `json:"LokasiMall"`
	MetodePembayaran *RiwayatSelesaiMetodePembayaranResponse `json:"MetodePembayaran,omitempty"`
}

func timePtrSelesai(value time.Time) *time.Time {
	if value.IsZero() {
		return nil
	}
	copyValue := value
	return &copyValue
}

func intPtrSelesai(value int) *int {
	copyValue := value
	return &copyValue
}

func (c *RiwayatSelesaiController) GetRiwayatSelesaiByPengunjungHandler(w http.ResponseWriter, r *http.Request) {
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
	if err := c.DB.Preload("RiwayatBooking.Pembayaran.MetodePembayaran").Where("id_pengunjung = ?", uint(idPengunjung)).Order("id_booking DESC").Find(&bookings).Error; err != nil {
		response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "Database error"})
		return
	}

	responseData := make([]RiwayatSelesaiResponse, 0)
	for _, booking := range bookings {
		if booking.RiwayatBooking == nil {
			continue
		}
		if booking.RiwayatBooking.StatusBooking != "KonfirmasiSelesai" {
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

		item := RiwayatSelesaiResponse{
			Booking: RiwayatSelesaiBookingResponse{
				IDBooking:    booking.IDBooking,
				PlatPengguna: booking.PlatPengguna,
				WaktuBooking: booking.WaktuBooking,
			},
			RiwayatBooking: RiwayatSelesaiRiwayatResponse{
				WaktuMasuk:    timePtrSelesai(booking.RiwayatBooking.WaktuMasuk),
				StatusBooking: booking.RiwayatBooking.StatusBooking,
			},
			TempatParkir: RiwayatSelesaiTempatParkirResponse{
				KodeTempat: tempat.KodeTempat,
			},
			LokasiMall: RiwayatSelesaiLokasiMallResponse{
				AlamatLokasi: lokasi.AlamatLokasi,
			},
		}

		if booking.RiwayatBooking.StatusBooking == "Selesai" {
			item.RiwayatBooking.WaktuKeluar = timePtrSelesai(booking.RiwayatBooking.WaktuKeluar)
			item.RiwayatBooking.DurasiParkir = intPtrSelesai(booking.RiwayatBooking.DurasiParkir)
		}

		if booking.RiwayatBooking.Pembayaran != nil && booking.RiwayatBooking.Pembayaran.MetodePembayaran != nil {
			item.MetodePembayaran = &RiwayatSelesaiMetodePembayaranResponse{
				JumlahPembayaran: booking.RiwayatBooking.Pembayaran.MetodePembayaran.JumlahPembayaran,
			}
		}

		responseData = append(responseData, item)
	}

	if len(responseData) == 0 {
		response.JSON(w, http.StatusNotFound, response.ControllerResponse{ResponseMessage: "Riwayat selesai not found"})
		return
	}

	response.JSON(w, http.StatusOK, responseData)
}
