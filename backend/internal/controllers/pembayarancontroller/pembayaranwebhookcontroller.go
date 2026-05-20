package pembayarancontroller

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

	"v-park/internal/models"
	"v-park/internal/response"

	"gorm.io/gorm"
)

// PembayaranWebhook menerima notifikasi pembayaran dari payment gateway
type PembayaranWebhook struct {
	IDMetodePembayaran uint   `json:"id_metode_pembayaran"`
	Status             string `json:"status"` // SUCCESS, FAILED, PENDING, EXPIRED
	Amount             int64  `json:"amount"`
	PaymentMethod      string `json:"payment_method"` // QRIS, OVO, GoPay, Dana, BCA, Wanda
	SuccessTimestamp   int64  `json:"success_timestamp"`
}

// PaymentWebhookHandler POST /api/pembayaran/webhook
// Menerima notifikasi dari payment gateway tentang status pembayaran
func (c *PembayaranInformasiController) PaymentWebhookHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		response.JSON(w, http.StatusMethodNotAllowed, response.ControllerResponse{ResponseMessage: "Method not allowed"})
		return
	}

	var payload PembayaranWebhook
	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		response.JSON(w, http.StatusBadRequest, response.ControllerResponse{ResponseMessage: "Invalid payload"})
		return
	}

	if payload.IDMetodePembayaran == 0 {
		response.JSON(w, http.StatusBadRequest, response.ControllerResponse{ResponseMessage: "id_metode_pembayaran is required"})
		return
	}

	// Map external payment status to internal status (normalize to lower-case)
	var statusPembayaran string
	s := strings.ToLower(strings.TrimSpace(payload.Status))
	switch s {
	case "success", "paid", "settlement":
		statusPembayaran = "Lunas"
	case "failed", "deny", "cancel":
		statusPembayaran = "Gagal"
	case "expired":
		statusPembayaran = "Kadaluarsa"
	default:
		statusPembayaran = "Pending"
	}

	// Validate payment method exists
	if payload.PaymentMethod != "" {
		var metode models.MetodePembayaran
		if err := c.DB.Where("payment_method = ?", payload.PaymentMethod).First(&metode).Error; err != nil {
			if err != gorm.ErrRecordNotFound {
				response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "Database error"})
				return
			}
			// Method not found, but don't fail - just log and continue
			fmt.Printf("Warning: Payment method %s not found in database\n", payload.PaymentMethod)
		}
	}

	// Update Pembayaran record via MetodePembayaran id
	if err := c.DB.Transaction(func(tx *gorm.DB) error {
		// Find metode by provided id
		var metode models.MetodePembayaran
		if err := tx.First(&metode, payload.IDMetodePembayaran).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				return fmt.Errorf("metode pembayaran with id %d not found", payload.IDMetodePembayaran)
			}
			return err
		}

		// Find related pembayaran
		var pembayaran models.Pembayaran
		if err := tx.Where("id_metode_pembayaran = ?", metode.IDMetodePembayaran).First(&pembayaran).Error; err != nil {
			return fmt.Errorf("pembayaran for metode id %d not found", metode.IDMetodePembayaran)
		}

		// Update metode payment method if provided
		if payload.PaymentMethod != "" {
			if err := tx.Model(&metode).Update("payment_method", payload.PaymentMethod).Error; err != nil {
				return err
			}
		}

		// Update pembayaran status and waktu
		updateData := map[string]any{
			"status_pembayaran": statusPembayaran,
		}
		if statusPembayaran == "Lunas" {
			if payload.SuccessTimestamp > 0 {
				updateData["waktu_pembayaran"] = time.Unix(payload.SuccessTimestamp, 0).UTC()
			} else {
				updateData["waktu_pembayaran"] = time.Now().UTC()
			}
		}

		if err := tx.Model(&pembayaran).Updates(updateData).Error; err != nil {
			return err
		}

		// Optional: Update RiwayatBooking status if payment is lunas
		if statusPembayaran == "Lunas" {
			if err := tx.Model(&models.RiwayatBooking{}).
				Where("id_riwayat_booking = ?", pembayaran.IDRiwayatBooking).
				Update("status_booking", "PaymentComplete").Error; err != nil {
				// Log error but don't fail
				fmt.Printf("Failed to update riwayat status: %v\n", err)
			}
		}

		return nil
	}); err != nil {
		response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: fmt.Sprintf("Failed to update payment: %v", err)})
		return
	}

	// Return success response
	response.JSON(w, http.StatusOK, response.ControllerResponse{ResponseMessage: "Payment webhook processed successfully"})
}
