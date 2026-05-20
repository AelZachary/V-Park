package profilecontroller

import (
	"net/http"
	"strconv"
	"time"

	"v-park/internal/models"
	"v-park/internal/response"

	"gorm.io/gorm"
)

type ProfileInformasiPetugasController struct {
	DB *gorm.DB
}

type ProfileInformasiPetugasUserResponse struct {
	Username string `json:"Username"`
}

type ProfileInformasiPetugasDataResponse struct {
	MallBertugas         string    `json:"MallBertugas"`
	ShiftMulaiBertugas   time.Time `json:"ShiftMulaiBertugas"`
	ShiftSelesaiBertugas time.Time `json:"ShiftSelesaiBertugas"`
}

type ProfileInformasiPetugasResponse struct {
	User    ProfileInformasiPetugasUserResponse `json:"User"`
	Petugas ProfileInformasiPetugasDataResponse `json:"Petugas"`
}

func (c *ProfileInformasiPetugasController) GetProfileInformasiPetugasHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		response.JSON(w, http.StatusMethodNotAllowed, response.ControllerResponse{ResponseMessage: "Method not allowed"})
		return
	}

	pathID := r.PathValue("IDPetugas")
	if pathID == "" {
		response.JSON(w, http.StatusBadRequest, response.ControllerResponse{ResponseMessage: "IDPetugas is required"})
		return
	}

	idPetugas, err := strconv.ParseUint(pathID, 10, 64)
	if err != nil || idPetugas == 0 {
		response.JSON(w, http.StatusBadRequest, response.ControllerResponse{ResponseMessage: "IDPetugas is invalid"})
		return
	}

	var petugas models.Petugas
	if err := c.DB.First(&petugas, uint(idPetugas)).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			response.JSON(w, http.StatusNotFound, response.ControllerResponse{ResponseMessage: "Petugas not found"})
			return
		}
		response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "Database error"})
		return
	}

	var user models.User
	if err := c.DB.First(&user, petugas.IDUser).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			response.JSON(w, http.StatusNotFound, response.ControllerResponse{ResponseMessage: "Profile not found"})
			return
		}
		response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "Database error"})
		return
	}

	responseData := ProfileInformasiPetugasResponse{
		User: ProfileInformasiPetugasUserResponse{Username: user.Username},
		Petugas: ProfileInformasiPetugasDataResponse{
			MallBertugas:         petugas.MallBertugas,
			ShiftMulaiBertugas:   petugas.ShiftMulaiBertugas,
			ShiftSelesaiBertugas: petugas.ShiftSelesaiBertugas,
		},
	}

	response.JSON(w, http.StatusOK, responseData)
}
