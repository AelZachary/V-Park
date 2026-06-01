package statustempatparkircontroller

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"v-park/internal/loggers"
	"v-park/internal/middleware"
	"v-park/internal/models"
	"v-park/internal/response"

	"gorm.io/gorm"
)

type MonitoringPetugasController struct {
	DB *gorm.DB
}

type MonitoringPetugasRequest struct {
	IDTempatParkir uint `json:"IDTempatParkir"`
}

type MonitoringPetugasResponse struct {
	Monitoring   MonitoringResponse   `json:"Monitoring"`
	TempatParkir TempatParkirResponse `json:"TempatParkir"`
	LokasiMall   LokasiMallResponse   `json:"LokasiMall"`
}

type MonitoringResponse struct {
	IDMonitoring    uint      `json:"IDMonitoring"`
	IDPetugas       uint      `json:"IDPetugas"`
	IDTempatParkir  uint      `json:"IDTempatParkir"`
	WaktuMonitoring time.Time `json:"WaktuMonitoring"`
}

func (c *MonitoringPetugasController) ToggleMonitoringHandler(w http.ResponseWriter, r *http.Request) {
	logger := loggers.StatusTempatParkirControllerLogger
	if logger != nil {
		logger.Info("request received", "handler", "ToggleMonitoringHandler", "method", r.Method, "path", r.URL.Path)
	}

	if r.Method != http.MethodPost {
		response.JSON(w, http.StatusMethodNotAllowed, response.ControllerResponse{ResponseMessage: "Method not allowed"})
		return
	}

	authInfo, ok := middleware.GetPetugasAuthInfo(r.Context())
	if !ok {
		response.JSON(w, http.StatusUnauthorized, response.ControllerResponse{ResponseMessage: "Unauthorized"})
		return
	}

	idPetugas := authInfo.Petugas.IDPetugas

	var req MonitoringPetugasRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		response.JSON(w, http.StatusBadRequest, response.ControllerResponse{ResponseMessage: "Invalid JSON format"})
		return
	}

	if req.IDTempatParkir == 0 {
		response.JSON(w, http.StatusBadRequest, response.ControllerResponse{ResponseMessage: "IDTempatParkir is required"})
		return
	}

	var responseData MonitoringPetugasResponse

	if err := c.DB.Transaction(func(tx *gorm.DB) error {
		var petugas models.Petugas
		if err := tx.First(&petugas, uint(idPetugas)).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				return fmt.Errorf("petugas not found")
			}
			return err
		}

		var tempatParkir models.TempatParkir
		if err := tx.First(&tempatParkir, req.IDTempatParkir).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				return fmt.Errorf("tempat parkir not found")
			}
			return err
		}

		if tempatParkir.StatusTempatParkir == "BookingOnline" {
			return fmt.Errorf("status tempat parkir masih BookingOnline")
		}

		newStatus := ""
		switch tempatParkir.StatusTempatParkir {
		case "Terisi":
			newStatus = "Tersedia"
		case "Tersedia":
			newStatus = "Terisi"
		default:
			return fmt.Errorf("status tempat parkir tidak dapat diproses")
		}

		now := time.Now()

		monitoring := models.Monitoring{
			IDPetugas:       uint(idPetugas),
			IDTempatParkir:  req.IDTempatParkir,
			WaktuMonitoring: now,
		}

		if err := tx.Where("id_petugas = ? AND id_tempat_parkir = ?", uint(idPetugas), req.IDTempatParkir).
			Assign(models.Monitoring{WaktuMonitoring: now}).
			FirstOrCreate(&monitoring).Error; err != nil {
			return err
		}

		if err := tx.Model(&models.TempatParkir{}).
			Where("id_tempat_parkir = ?", req.IDTempatParkir).
			Update("status_tempat_parkir", newStatus).Error; err != nil {
			return err
		}

		var lokasiMall models.LokasiMall
		if err := tx.First(&lokasiMall, tempatParkir.IDLokasiMall).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				return fmt.Errorf("lokasi mall not found")
			}
			return err
		}

		responseData = MonitoringPetugasResponse{
			Monitoring: MonitoringResponse{
				IDMonitoring:    monitoring.IDMonitoring,
				IDPetugas:       monitoring.IDPetugas,
				IDTempatParkir:  monitoring.IDTempatParkir,
				WaktuMonitoring: now,
			},
			TempatParkir: TempatParkirResponse{
				IDTempatParkir:     tempatParkir.IDTempatParkir,
				KodeTempat:         tempatParkir.KodeTempat,
				StatusTempatParkir: newStatus,
			},
			LokasiMall: LokasiMallResponse{
				IDLokasiMall: lokasiMall.IDLokasiMall,
				AlamatLokasi: lokasiMall.AlamatLokasi,
			},
		}

		return nil
	}); err != nil {
		statusCode := http.StatusInternalServerError
		message := "Failed to toggle monitoring"
		switch err.Error() {
		case "petugas not found", "tempat parkir not found", "lokasi mall not found":
			statusCode = http.StatusNotFound
			message = err.Error()
		case "status tempat parkir masih BookingOnline", "status tempat parkir tidak dapat diproses":
			statusCode = http.StatusBadRequest
			message = err.Error()
		}

		if logger != nil {
			logger.Error("failed to toggle monitoring", "error", err)
		}
		response.JSON(w, statusCode, response.ControllerResponse{ResponseMessage: message})
		return
	}

	response.JSON(w, http.StatusCreated, responseData)
}
