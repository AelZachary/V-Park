package profilecontroller

import (
	"net/http"
	"time"

	"v-park/internal/loggers"
	"v-park/internal/middleware"
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
	FotoPetugas          *string   `json:"FotoPetugas"`
}

type ProfileInformasiPetugasResponse struct {
	User    ProfileInformasiPetugasUserResponse `json:"User"`
	Petugas ProfileInformasiPetugasDataResponse `json:"Petugas"`
}

func (c *ProfileInformasiPetugasController) GetProfileInformasiPetugasHandler(w http.ResponseWriter, r *http.Request) {
	logger := loggers.ProfileControllerLogger
	if logger != nil {
		logger.Info("request received", "handler", "GetProfileInformasiPetugasHandler", "method", r.Method, "path", r.URL.Path)
	}

	if r.Method != http.MethodGet {
		response.JSON(w, http.StatusMethodNotAllowed, response.ControllerResponse{ResponseMessage: "Method not allowed"})
		return
	}

	authInfo, ok := middleware.GetPetugasAuthInfo(r.Context())
	if !ok {
		response.JSON(w, http.StatusUnauthorized, response.ControllerResponse{ResponseMessage: "Unauthorized"})
		return
	}

	petugasAuth := authInfo.Petugas
	var petugas models.Petugas
	if err := c.DB.First(&petugas, petugasAuth.IDPetugas).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			response.JSON(w, http.StatusNotFound, response.ControllerResponse{ResponseMessage: "Petugas not found"})
			return
		}
		if logger != nil {
			logger.Error("failed to load petugas profile", "error", err)
		}
		response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "Database error"})
		return
	}

	var fotoPetugas *string
	if petugas.FotoPetugas != "" {
		foto := petugas.FotoPetugas
		fotoPetugas = &foto
	}

	responseData := ProfileInformasiPetugasResponse{
		User: ProfileInformasiPetugasUserResponse{Username: authInfo.User.Username},
		Petugas: ProfileInformasiPetugasDataResponse{
			MallBertugas:         petugas.MallBertugas,
			ShiftMulaiBertugas:   petugas.ShiftMulaiBertugas,
			ShiftSelesaiBertugas: petugas.ShiftSelesaiBertugas,
			FotoPetugas:          fotoPetugas,
		},
	}

	response.JSON(w, http.StatusOK, responseData)
}
