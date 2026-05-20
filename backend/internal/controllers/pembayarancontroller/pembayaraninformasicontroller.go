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

// GetPembayaranDetailResponse untuk GET detail pembayaran
type GetPembayaranDetailResponse struct {
	IDPembayaran     uint       `json:"IDPembayaran"`
	IDRiwayatBooking uint       `json:"IDRiwayatBooking"`
	TotalPembayaran  int        `json:"TotalPembayaran"`
	StatusPembayaran string     `json:"StatusPembayaran"`
	QRCodeBase64     string     `json:"QRCodeBase64"`
	ExpiresAt        *time.Time `json:"ExpiresAt"`
	ExpiresIn        int        `json:"ExpiresIn"` // seconds remaining
	PaymentMethods   []string   `json:"PaymentMethods"`
	PaymentMethod    *string    `json:"PaymentMethod"` // selected method (if any)
	WaktuPembayaran  *time.Time `json:"WaktuPembayaran"`
	MetodePembayaran string     `json:"MetodePembayaran"`
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

	// Prefer getting QR and expiry from related MetodePembayaran (per-transaction details)
	qrCode := ""
	var expiresAt *time.Time
	metodeName := ""
	expiresIn := 0
	if pembayaran.MetodePembayaran != nil {
		qrCode = pembayaran.MetodePembayaran.QRCodeBase64
		expiresAt = pembayaran.MetodePembayaran.ExpiresAt
		metodeName = pembayaran.MetodePembayaran.PaymentMethod
		if expiresAt != nil {
			expiresIn = int(expiresAt.Sub(time.Now()).Seconds())
			if expiresIn < 0 {
				expiresIn = 0
			}
		}
	}

	// prepare pointer for selected payment method name (if any)
	var paymentMethodPtr *string
	if metodeName != "" {
		paymentMethodPtr = &metodeName
	}

	responseData := GetPembayaranDetailResponse{
		IDPembayaran:     pembayaran.IDPembayaran,
		IDRiwayatBooking: pembayaran.IDRiwayatBooking,
		TotalPembayaran:  pembayaran.TotalPembayaran,
		StatusPembayaran: pembayaran.StatusPembayaran,
		QRCodeBase64:     qrCode,
		ExpiresAt:        expiresAt,
		ExpiresIn:        expiresIn,
		PaymentMethods:   []string{"QRIS", "OVO", "GoPay", "Dana", "BCA", "Wanda"},
		PaymentMethod:    paymentMethodPtr,
		WaktuPembayaran:  pembayaran.WaktuPembayaran,
		MetodePembayaran: metodeName,
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

	var pembayaran models.Pembayaran
	if err := c.DB.Preload("MetodePembayaran").Where("id_riwayat_booking = ?", uint(id)).First(&pembayaran).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			response.JSON(w, http.StatusNotFound, response.ControllerResponse{ResponseMessage: "Pembayaran not found for given riwayat"})
			return
		}
		response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "Database error"})
		return
	}

	// Build same response structure as GetPembayaranDetailHandler
	qrCode := ""
	var expiresAt *time.Time
	metodeName := ""
	expiresIn := 0
	if pembayaran.MetodePembayaran != nil {
		qrCode = pembayaran.MetodePembayaran.QRCodeBase64
		expiresAt = pembayaran.MetodePembayaran.ExpiresAt
		metodeName = pembayaran.MetodePembayaran.PaymentMethod
		if expiresAt != nil {
			expiresIn = int(expiresAt.Sub(time.Now()).Seconds())
			if expiresIn < 0 {
				expiresIn = 0
			}
		}
	}

	var paymentMethodPtr *string
	if metodeName != "" {
		paymentMethodPtr = &metodeName
	}

	responseData := GetPembayaranDetailResponse{
		IDPembayaran:     pembayaran.IDPembayaran,
		IDRiwayatBooking: pembayaran.IDRiwayatBooking,
		TotalPembayaran:  pembayaran.TotalPembayaran,
		StatusPembayaran: pembayaran.StatusPembayaran,
		QRCodeBase64:     qrCode,
		ExpiresAt:        expiresAt,
		ExpiresIn:        expiresIn,
		PaymentMethods:   []string{"QRIS", "OVO", "GoPay", "Dana", "BCA", "Wanda"},
		PaymentMethod:    paymentMethodPtr,
		WaktuPembayaran:  pembayaran.WaktuPembayaran,
		MetodePembayaran: metodeName,
	}

	response.JSON(w, http.StatusOK, responseData)
}
