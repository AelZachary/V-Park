package riwayatcontroller

import (
	"net/http"
	"time"

	"v-park/internal/loggers"
	"v-park/internal/middleware"
	"v-park/internal/models"
	"v-park/internal/response"

	"gorm.io/gorm"
)

type RiwayatAktifController struct {
	DB *gorm.DB
}

func timePtr(value time.Time) *time.Time {
	if value.IsZero() {
		return nil
	}
	copyValue := value
	return &copyValue
}

type RiwayatAktifBookingResponse struct {
	IDBooking    uint      `json:"IDBooking"`
	PlatPengguna string    `json:"PlatPengguna"`
	WaktuBooking time.Time `json:"WaktuBooking"`
}

type RiwayatAktifRiwayatResponse struct {
	WaktuMasuk    *time.Time `json:"WaktuMasuk"`
	StatusBooking string     `json:"StatusBooking"`
}

type RiwayatAktifTempatParkirResponse struct {
	KodeTempat string `json:"KodeTempat"`
}

type RiwayatAktifLokasiMallResponse struct {
	AlamatLokasi string `json:"AlamatLokasi"`
}

type RiwayatAktifResponse struct {
	Booking        RiwayatAktifBookingResponse      `json:"Booking"`
	RiwayatBooking RiwayatAktifRiwayatResponse      `json:"RiwayatBooking"`
	TempatParkir   RiwayatAktifTempatParkirResponse `json:"TempatParkir"`
	LokasiMall     RiwayatAktifLokasiMallResponse   `json:"LokasiMall"`
}

func (c *RiwayatAktifController) GetRiwayatAktifByPengunjungHandler(w http.ResponseWriter, r *http.Request) {
	logger := loggers.RiwayatsControllerLogger
	if logger != nil {
		logger.Info("request received", "handler", "GetRiwayatAktifByPengunjungHandler", "method", r.Method, "path", r.URL.Path)
	}

	if r.Method != http.MethodGet {
		response.JSON(w, http.StatusMethodNotAllowed, response.ControllerResponse{ResponseMessage: "Method not allowed"})
		return
	}

	authInfo, ok := middleware.GetPengunjungAuthInfo(r.Context())
	if !ok || authInfo.User.Pengunjung == nil {
		response.JSON(w, http.StatusUnauthorized, response.ControllerResponse{ResponseMessage: "Unauthorized"})
		return
	}

	idPengunjung := authInfo.User.Pengunjung.IDPengunjung

	var bookings []models.Booking
	if err := c.DB.Preload("RiwayatBooking").Where("id_pengunjung = ?", uint(idPengunjung)).Order("id_booking DESC").Find(&bookings).Error; err != nil {
		if logger != nil {
			logger.Error("failed to load riwayat aktif", "error", err)
		}
		response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "Database error"})
		return
	}

	responseData := make([]RiwayatAktifResponse, 0)
	for i := range bookings {
		if bookings[i].RiwayatBooking == nil {
			continue
		}
		if bookings[i].RiwayatBooking.StatusBooking != "MenungguKonfirmasi" && bookings[i].RiwayatBooking.StatusBooking != "KonfirmasiTiba" {
			continue
		}

		var tempat models.TempatParkir
		if err := c.DB.First(&tempat, bookings[i].IDTempatParkir).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				continue
			}
			if logger != nil {
				logger.Error("failed to load tempat parkir for riwayat aktif", "error", err)
			}
			response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "Database error"})
			return
		}

		var lokasi models.LokasiMall
		if err := c.DB.First(&lokasi, tempat.IDLokasiMall).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				continue
			}
			if logger != nil {
				logger.Error("failed to load lokasi mall for riwayat aktif", "error", err)
			}
			response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "Database error"})
			return
		}

		responseData = append(responseData, RiwayatAktifResponse{
			Booking: RiwayatAktifBookingResponse{
				IDBooking:    bookings[i].IDBooking,
				PlatPengguna: bookings[i].PlatPengguna,
				WaktuBooking: bookings[i].WaktuBooking,
			},
			RiwayatBooking: RiwayatAktifRiwayatResponse{
				WaktuMasuk:    timePtr(bookings[i].RiwayatBooking.WaktuMasuk),
				StatusBooking: bookings[i].RiwayatBooking.StatusBooking,
			},
			TempatParkir: RiwayatAktifTempatParkirResponse{
				KodeTempat: tempat.KodeTempat,
			},
			LokasiMall: RiwayatAktifLokasiMallResponse{
				AlamatLokasi: lokasi.AlamatLokasi,
			},
		})
	}

	if len(responseData) == 0 {
		response.JSON(w, http.StatusNotFound, response.ControllerResponse{ResponseMessage: "Riwayat aktif not found"})
		return
	}

	response.JSON(w, http.StatusOK, responseData)
}
