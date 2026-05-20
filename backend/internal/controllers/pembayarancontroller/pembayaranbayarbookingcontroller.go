package pembayarancontroller

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"

	"v-park/internal/logic"
	"v-park/internal/models"
	"v-park/internal/response"

	"gorm.io/gorm"
)

// InitiatePembayaranRequest untuk inisiasi pembayaran QRIS
type PembayaranBayarBookingRequest struct {
	IDBooking uint `json:"IDBooking"`
	// PaymentMethod optional (e.g. "QRIS", "OVO") used to populate MetodePembayaran.PaymentMethod
	PaymentMethod string `json:"PaymentMethod"`
	// QRCodeBase64 is provided by the client request and will be stored directly.
	QRCodeBase64 string `json:"QRCodeBase64"`
}

// PembayaranBayarBookingRiwayatResponse membungkus data pembayaran utama.
type PembayaranBayarBookingRiwayatResponse struct {
	IDRiwayatBooking uint   `json:"IDRiwayatBooking"`
	IDPembayaran     uint   `json:"IDPembayaran"`
	BiayaLayanan     int    `json:"BiayaLayanan"`
	BiayaPajak       int    `json:"BiayaPajak"`
	TotalPembayaran  int    `json:"TotalPembayaran"`
	StatusPembayaran string `json:"StatusPembayaran"`
}

// PembayaranBayarBookingMetodeResponse membungkus detail QR dan metode pembayaran.
type PembayaranBayarBookingMetodeResponse struct {
	IDMetodePembayaran uint      `json:"IDMetodePembayaran"`
	QRCodeBase64       string    `json:"QRCodeBase64"`
	ExpiresAt          time.Time `json:"ExpiresAt"`
	ExpiresIn          int       `json:"ExpiresIn"`
	PaymentMethods     string    `json:"PaymentMethods"`
}

// PembayaranBayarBookingResponse response untuk inisiasi pembayaran.
type PembayaranBayarBookingResponse struct {
	RiwayatBooking   PembayaranBayarBookingRiwayatResponse `json:"RiwayatBooking"`
	MetodePembayaran PembayaranBayarBookingMetodeResponse  `json:"MetodePembayaran"`
}

// paymentCallbackURL returns the configured PAYMENT_CALLBACK_URL.
// If the env var is not set, it builds a sensible default from the request
// host: scheme://host/api/pembayaran/webhook so frontend does not need to supply it.
func getPaymentCallbackURL(r *http.Request) string {
	if v := os.Getenv("PAYMENT_CALLBACK_URL"); v != "" {
		return v
	}

	scheme := "http"
	if r != nil && r.TLS != nil {
		scheme = "https"
	}

	host := "localhost:8080"
	if r != nil && r.Host != "" {
		host = r.Host
	}

	return scheme + "://" + host + "/api/pembayaran/webhook"
}

// InitiatePembayaranHandler POST /api/pembayaran/bayar/booking/{IDBooking}
// Inisiasi pembayaran QRIS setelah KonfirmasiTiba
func (c *PembayaranInformasiController) InitiatePembayaranHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		response.JSON(w, http.StatusMethodNotAllowed, response.ControllerResponse{ResponseMessage: "Method not allowed"})
		return
	}

	var req PembayaranBayarBookingRequest
	if idStr := r.PathValue("IDBooking"); idStr != "" {
		var pathBookingID uint
		if _, err := fmt.Sscanf(idStr, "%d", &pathBookingID); err == nil && pathBookingID > 0 {
			req.IDBooking = pathBookingID
		}
	}
	// Safely parse request body. Some middleware may provide a `bodyParser` in context.
	if bp := r.Context().Value("bodyParser"); bp != nil {
		if parser, ok := bp.(func(interface{}) error); ok {
			if err := parser(&req); err != nil {
				response.JSON(w, http.StatusBadRequest, response.ControllerResponse{ResponseMessage: "Invalid request body"})
				return
			}
		} else {
			// fallback to default JSON decoder
			if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
				response.JSON(w, http.StatusBadRequest, response.ControllerResponse{ResponseMessage: "Invalid request body"})
				return
			}
		}
	} else {
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			response.JSON(w, http.StatusBadRequest, response.ControllerResponse{ResponseMessage: "Invalid request body"})
			return
		}
	}

	if req.IDBooking == 0 {
		response.JSON(w, http.StatusBadRequest, response.ControllerResponse{ResponseMessage: "IDBooking is required"})
		return
	}

	callbackURL := getPaymentCallbackURL(r)
	if callbackURL == "" {
		response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "PAYMENT_CALLBACK_URL is not configured"})
		return
	}

	var responseData PembayaranBayarBookingResponse

	if err := c.DB.Transaction(func(tx *gorm.DB) error {
		// Check riwayat exists and status is KonfirmasiTiba
		var riwayat models.RiwayatBooking
		if err := tx.First(&riwayat, req.IDBooking).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				return fmt.Errorf("riwayat booking not found")
			}
			return err
		}

		if riwayat.StatusBooking != "KonfirmasiSelesai" {
			return fmt.Errorf("only KonfirmasiTiba bookings can initiate payment")
		}

		// Get or create Pembayaran for this riwayat
		var pembayaran models.Pembayaran
		if err := tx.Where("id_riwayat_booking = ?", req.IDBooking).First(&pembayaran).Error; err != nil {
			if err != gorm.ErrRecordNotFound {
				return err
			}
			// If not found, create a Pembayaran record now so clients can pay by IDBooking.
			pembayaran = models.Pembayaran{
				IDRiwayatBooking: req.IDBooking,
				BiayaLayanan:     0,
				BiayaPajak:       0,
				TotalPembayaran:  0,
				StatusPembayaran: "MemerlukanPembayaran",
			}
			if err := tx.Create(&pembayaran).Error; err != nil {
				return fmt.Errorf("failed to create pembayaran: %w", err)
			}
		}

		// Get existing MetodePembayaran linked to pembayaran, or create a new one.
		var metodePembayaran models.MetodePembayaran
		if pembayaran.MetodePembayaranID != nil && *pembayaran.MetodePembayaranID != 0 {
			if err := tx.First(&metodePembayaran, *pembayaran.MetodePembayaranID).Error; err != nil {
				if err != gorm.ErrRecordNotFound {
					return err
				}
				// if referenced metode not found, fallthrough to create new
			} else {
				// found existing metodePembayaran - we'll update it below
			}
		}
		if metodePembayaran.IDMetodePembayaran == 0 {
			metodePembayaran = models.MetodePembayaran{
				IDPembayaran:  pembayaran.IDPembayaran,
				QRCodeBase64:  "",
				QRCodeURL:     "",
				ExpiresAt:     nil,
				CallbackURL:   callbackURL,
				PaymentMethod: req.PaymentMethod,
			}
			if err := tx.Create(&metodePembayaran).Error; err != nil {
				return fmt.Errorf("failed to create metode pembayaran: %w", err)
			}
		}

		expiresAt := logic.CalculateExpiryTime(15) // 15 minutes expiry
		if req.QRCodeBase64 == "" {
			return fmt.Errorf("QRCodeBase64 is required")
		}

		// Update metodePembayaran with QR and expiry (store per-transaction details)
		if err := tx.Model(&metodePembayaran).Updates(map[string]any{
			"id_pembayaran":  pembayaran.IDPembayaran,
			"qr_code_base64": req.QRCodeBase64,
			"expires_at":     expiresAt,
			"callback_url":   callbackURL,
			"payment_method": req.PaymentMethod,
		}).Error; err != nil {
			return err
		}
		metodePembayaran.IDPembayaran = pembayaran.IDPembayaran

		if pembayaran.StatusPembayaran == "MemerlukanPembayaran" {
			if err := tx.Model(&pembayaran).Update("status_pembayaran", "MemprosesPembayaran").Error; err != nil {
				return err
			}
			pembayaran.StatusPembayaran = "MemprosesPembayaran"
		}

		// Link pembayaran -> metodePembayaran
		if err := tx.Model(&pembayaran).Update("id_metode_pembayaran", metodePembayaran.IDMetodePembayaran).Error; err != nil {
			return err
		}

		// Prepare response
		expiresIn := int(expiresAt.Sub(time.Now()).Seconds())
		responseData = PembayaranBayarBookingResponse{
			RiwayatBooking: PembayaranBayarBookingRiwayatResponse{
				IDRiwayatBooking: pembayaran.IDRiwayatBooking,
				IDPembayaran:     pembayaran.IDPembayaran,
				BiayaLayanan:     pembayaran.BiayaLayanan,
				BiayaPajak:       pembayaran.BiayaPajak,
				TotalPembayaran:  pembayaran.TotalPembayaran,
				StatusPembayaran: pembayaran.StatusPembayaran,
			},
			MetodePembayaran: PembayaranBayarBookingMetodeResponse{
				IDMetodePembayaran: metodePembayaran.IDMetodePembayaran,
				QRCodeBase64:       req.QRCodeBase64,
				ExpiresAt:          expiresAt,
				ExpiresIn:          expiresIn,
				PaymentMethods:     req.PaymentMethod,
			},
		}

		return nil
	}); err != nil {
		statusCode := http.StatusInternalServerError
		if err.Error() == "riwayat booking not found" {
			statusCode = http.StatusNotFound
		} else if err.Error() == "only KonfirmasiTiba bookings can initiate payment" {
			statusCode = http.StatusBadRequest
		}

		response.JSON(w, statusCode, response.ControllerResponse{ResponseMessage: err.Error()})
		return
	}

	response.JSON(w, http.StatusOK, responseData)
}
