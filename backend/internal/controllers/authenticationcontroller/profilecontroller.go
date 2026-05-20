package authenticationcontroller

import (
	"errors"
	"net/http"
	"v-park/internal/models"
	"v-park/internal/response"

	"gorm.io/gorm"
)

type ProfileController struct {
	DB *gorm.DB
}

func (controller *ProfileController) ProfileHandler(
	w http.ResponseWriter,
	r *http.Request,
) {
	if r.Method != http.MethodGet {
		response.JSON(w, http.StatusMethodNotAllowed, response.ControllerResponse{ResponseMessage: "Method not allowed"})
		return
	}

	username := r.URL.Query().Get("username")
	if username == "" {
		response.JSON(w, http.StatusBadRequest, response.ControllerResponse{ResponseMessage: "username is required"})
		return
	}

	var user models.User
	err := controller.DB.Preload("Pengunjung").Preload("Petugas").Where("username = ?", username).First(&user).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			response.JSON(w, http.StatusNotFound, response.ControllerResponse{ResponseMessage: "User not found"})
			return
		}

		response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "Failed to query user"})
		return
	}

	if user.IsPengunjung {
		if user.Pengunjung == nil {
			response.JSON(w, http.StatusNotFound, response.ControllerResponse{ResponseMessage: "Pengunjung profile not found"})
			return
		}

		resp := PengunjungEnvelope{
			User: PengunjungUserResponse{
				IDUser:   user.IDUser,
				Username: user.Username,
				Pengunjung: PengunjungLoginResponse{
					IDPengunjung:   user.Pengunjung.IDPengunjung,
					NoHandphone:    user.Pengunjung.NoHandphone,
					JenisKendaraan: user.Pengunjung.JenisKendaraan,
					PlatKendaraan:  user.Pengunjung.PlatKendaraan,
				},
			},
		}

		response.JSON(w, http.StatusOK, resp)
		return
	}

	if user.Petugas == nil {
		response.JSON(w, http.StatusNotFound, response.ControllerResponse{ResponseMessage: "Petugas profile not found"})
		return
	}

	resp := PetugasEnvelope{
		User: PetugasUserResponse{
			IDUser:   user.IDUser,
			Username: user.Username,
			Petugas: PetugasLoginResponse{
				IDPetugas:            user.Petugas.IDPetugas,
				MallBertugas:         user.Petugas.MallBertugas,
				ShiftMulaiBertugas:   user.Petugas.ShiftMulaiBertugas.Format("2006-01-02T15:04:05Z07:00"),
				ShiftSelesaiBertugas: user.Petugas.ShiftSelesaiBertugas.Format("2006-01-02T15:04:05Z07:00"),
			},
		},
	}

	response.JSON(w, http.StatusOK, resp)
}
