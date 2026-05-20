package profilecontroller

import (
	"encoding/json"
	"net/http"
	"strconv"

	"v-park/internal/models"
	"v-park/internal/response"

	"gorm.io/gorm"
)

type ProfileEditPengunjungController struct {
	DB *gorm.DB
}

type ProfileEditPengunjungRequest struct {
	JenisKendaraan string `json:"JenisKendaraan"`
	PlatKendaraan  string `json:"PlatKendaraan"`
}

type ProfileEditPengunjungDataResponse struct {
	IDPengunjung   uint   `json:"IDPengunjung"`
	JenisKendaraan string `json:"JenisKendaraan"`
	PlatKendaraan  string `json:"PlatKendaraan"`
}

func (c *ProfileEditPengunjungController) EditProfilePengunjungHandler(w http.ResponseWriter, r *http.Request) {
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

	var req ProfileEditPengunjungRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		response.JSON(w, http.StatusBadRequest, response.ControllerResponse{ResponseMessage: "Invalid JSON format"})
		return
	}

	if req.JenisKendaraan == "" || req.PlatKendaraan == "" {
		response.JSON(w, http.StatusBadRequest, response.ControllerResponse{ResponseMessage: "JenisKendaraan and PlatKendaraan are required"})
		return
	}

	var responseData ProfileEditPengunjungDataResponse

	if err := c.DB.Transaction(func(tx *gorm.DB) error {
		var pengunjung models.Pengunjung
		if err := tx.First(&pengunjung, uint(idPengunjung)).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				return gorm.ErrRecordNotFound
			}
			return err
		}

		if err := tx.Model(&models.Pengunjung{}).
			Where("id_pengunjung = ?", uint(idPengunjung)).
			Updates(map[string]any{
				"jenis_kendaraan": req.JenisKendaraan,
				"plat_kendaraan":  req.PlatKendaraan,
			}).Error; err != nil {
			return err
		}

		if err := tx.First(&pengunjung, uint(idPengunjung)).Error; err != nil {
			return err
		}

		responseData = ProfileEditPengunjungDataResponse{
			IDPengunjung:   pengunjung.IDPengunjung,
			JenisKendaraan: pengunjung.JenisKendaraan,
			PlatKendaraan:  pengunjung.PlatKendaraan,
		}

		return nil
	}); err != nil {
		if err == gorm.ErrRecordNotFound {
			response.JSON(w, http.StatusNotFound, response.ControllerResponse{ResponseMessage: "Pengunjung not found"})
			return
		}
		response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "Database error"})
		return
	}

	response.JSON(w, http.StatusOK, responseData)
}
