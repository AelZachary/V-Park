package pembayarancontroller

import (
	"net/http"
	"strconv"
	"time"

	"v-park/internal/models"
	"v-park/internal/response"

	"gorm.io/gorm"
)

type PembayaranInformasiController struct {
	DB *gorm.DB
}

// New nested response types for booking-based informasi
type LokasiResponse struct {
	AlamatLokasi string `json:"AlamatLokasi"`
}

type TempatParkirSimple struct {
	KodeTempat string `json:"KodeTempat"`
}

type BookingSimple struct {
	NoOrderan     int    `json:"NoOrderan"`
	PlatKendaraan string `json:"PlatKendaraan"`
}

type RiwayatSimple struct {
	WaktuTiba time.Time `json:"WaktuTiba"`
	Durasi    int       `json:"Durasi"`
}

type PembayaranSimple struct {
	TotalPembayaran  int        `json:"TotalPembayaran"`
	WaktuPembayaran  *time.Time `json:"WaktuPembayaran"`
	StatusPembayaran string     `json:"StatusPembayaran"`
}

type MetodePembayaranSimple struct {
	QRCodeBase64     string     `json:"QRCodeBase64"`
	ExpiresAt        *time.Time `json:"ExpiresAt"`
	ExpiresIn        int        `json:"ExpiresIn"`
	JumlahPembayaran int        `json:"JumlahPembayaran"`
	MetodePembayaran string     `json:"MetodePembayaran"`
}

type PembayaranByBookingResponse struct {
	Lokasi           LokasiResponse         `json:"Lokasi"`
	TempatParkir     TempatParkirSimple     `json:"TempatParkir"`
	Booking          BookingSimple          `json:"Booking"`
	RiwayatBooking   RiwayatSimple          `json:"RiwayatBooking"`
	Pembayaran       PembayaranSimple       `json:"Pembayaran"`
	MetodePembayaran MetodePembayaranSimple `json:"MetodePembayaran"`
}

func buildPembayaranByBookingResponse(db *gorm.DB, pembayaran *models.Pembayaran) (PembayaranByBookingResponse, error) {
	var riwayat models.RiwayatBooking
	if err := db.First(&riwayat, pembayaran.IDRiwayatBooking).Error; err != nil {
		return PembayaranByBookingResponse{}, err
	}

	var booking models.Booking
	if err := db.First(&booking, riwayat.IDBooking).Error; err != nil {
		return PembayaranByBookingResponse{}, err
	}

	var tempat models.TempatParkir
	if err := db.First(&tempat, booking.IDTempatParkir).Error; err != nil {
		return PembayaranByBookingResponse{}, err
	}

	var lokasi models.LokasiMall
	if err := db.First(&lokasi, tempat.IDLokasiMall).Error; err != nil {
		return PembayaranByBookingResponse{}, err
	}

	metode := MetodePembayaranSimple{}
	if pembayaran.MetodePembayaran != nil {
		expiresAt := pembayaran.MetodePembayaran.ExpiresAt
		expiresIn := 0
		if expiresAt != nil {
			expiresIn = int(expiresAt.Sub(time.Now()).Seconds())
			if expiresIn < 0 {
				expiresIn = 0
			}
		}
		metode = MetodePembayaranSimple{
			QRCodeBase64:     pembayaran.MetodePembayaran.QRCodeBase64,
			ExpiresAt:        expiresAt,
			ExpiresIn:        expiresIn,
			JumlahPembayaran: pembayaran.MetodePembayaran.JumlahPembayaran,
			MetodePembayaran: pembayaran.MetodePembayaran.PaymentMethod,
		}
	}

	return PembayaranByBookingResponse{
		Lokasi:           LokasiResponse{AlamatLokasi: lokasi.AlamatLokasi},
		TempatParkir:     TempatParkirSimple{KodeTempat: tempat.KodeTempat},
		Booking:          BookingSimple{NoOrderan: booking.NoOrderan, PlatKendaraan: booking.PlatPengguna},
		RiwayatBooking:   RiwayatSimple{WaktuTiba: riwayat.WaktuMasuk, Durasi: riwayat.DurasiParkir},
		Pembayaran:       PembayaranSimple{TotalPembayaran: pembayaran.TotalPembayaran, WaktuPembayaran: pembayaran.WaktuPembayaran, StatusPembayaran: pembayaran.StatusPembayaran},
		MetodePembayaran: metode,
	}, nil
}

// GetPembayaranDetailHandler GET /api/pembayaran/{IDPembayaran}
// Get current payment detail (for polling status, QR refresh)
func (c *PembayaranInformasiController) GetPembayaranDetailHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		response.JSON(w, http.StatusMethodNotAllowed, response.ControllerResponse{ResponseMessage: "Method not allowed"})
		return
	}

	idStr := r.PathValue("IDPembayaran")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		response.JSON(w, http.StatusBadRequest, response.ControllerResponse{ResponseMessage: "Invalid IDPembayaran"})
		return
	}

	var pembayaran models.Pembayaran
	if err := c.DB.Preload("MetodePembayaran").First(&pembayaran, uint(id)).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			response.JSON(w, http.StatusNotFound, response.ControllerResponse{ResponseMessage: "Pembayaran not found"})
			return
		}
		response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "Database error"})
		return
	}

	responseData, err := buildPembayaranByBookingResponse(c.DB, &pembayaran)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			response.JSON(w, http.StatusNotFound, response.ControllerResponse{ResponseMessage: "Related booking data not found"})
			return
		}
		response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "Database error"})
		return
	}

	response.JSON(w, http.StatusOK, responseData)

}

// GetPembayaranByRiwayatHandler GET /api/pembayaran/booking/{IDBooking}
// Returns the pembayaran record for a given riwayat booking id (useful to poll by booking)
func (c *PembayaranInformasiController) GetPembayaranByRiwayatHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		response.JSON(w, http.StatusMethodNotAllowed, response.ControllerResponse{ResponseMessage: "Method not allowed"})
		return
	}

	idStr := r.PathValue("IDBooking")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		response.JSON(w, http.StatusBadRequest, response.ControllerResponse{ResponseMessage: "Invalid IDBooking"})
		return
	}

	// Load booking with riwayat
	var booking models.Booking
	if err := c.DB.Preload("RiwayatBooking").First(&booking, uint(id)).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			response.JSON(w, http.StatusNotFound, response.ControllerResponse{ResponseMessage: "Booking not found"})
			return
		}
		response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "Database error"})
		return
	}

	if booking.RiwayatBooking == nil {
		response.JSON(w, http.StatusNotFound, response.ControllerResponse{ResponseMessage: "Riwayat booking not found"})
		return
	}

	// Load pembayaran and metode
	var pembayaran models.Pembayaran
	if err := c.DB.Preload("MetodePembayaran").Where("id_riwayat_booking = ?", booking.RiwayatBooking.IDRiwayatBooking).First(&pembayaran).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			response.JSON(w, http.StatusNotFound, response.ControllerResponse{ResponseMessage: "Pembayaran not found for given riwayat"})
			return
		}
		response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "Database error"})
		return
	}

	responseData, err := buildPembayaranByBookingResponse(c.DB, &pembayaran)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			response.JSON(w, http.StatusNotFound, response.ControllerResponse{ResponseMessage: "Related booking data not found"})
			return
		}
		response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "Database error"})
		return
	}

	response.JSON(w, http.StatusOK, responseData)
}
