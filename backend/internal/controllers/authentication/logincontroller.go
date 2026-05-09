package authentication

import (
	"encoding/json"
	"errors"
	"net/http"
	"v-park/internal/models"
	"v-park/internal/response"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type LoginPengunjung struct {
	DB *gorm.DB
}

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type PengunjungLoginResponse struct {
	IDPengunjung   uint   `json:"IDPengunjung"`
	NoHandphone    string `json:"NoHandphone"`
	JenisKendaraan string `json:"JenisKendaraan"`
	PlatKendaraan  string `json:"PlatKendaraan"`
}

type PetugasLoginResponse struct {
	IDPetugas            uint   `json:"IDPetugas"`
	MallBertugas         string `json:"MallBertugas"`
	ShiftMulaiBertugas   string `json:"ShiftMulaiBertugas"`
	ShiftSelesaiBertugas string `json:"ShiftSelesaiBertugas"`
}

type PengunjungUserResponse struct {
	IDUser     uint                    `json:"IDUser"`
	Username   string                  `json:"Username"`
	Pengunjung PengunjungLoginResponse `json:"Pengunjung"`
}

type PetugasUserResponse struct {
	IDUser   uint                 `json:"IDUser"`
	Username string               `json:"Username"`
	Petugas  PetugasLoginResponse `json:"Petugas"`
}

type PengunjungEnvelope struct {
	User PengunjungUserResponse `json:"User"`
}

type PetugasEnvelope struct {
	User PetugasUserResponse `json:"User"`
}

func (call *LoginPengunjung) LoginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		response.JSON(w, http.StatusMethodNotAllowed, response.ControllerResponse{ResponseMessage: "Method not allowed"})
		return
	}

	var loginReq LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&loginReq); err != nil {
		response.JSON(w, http.StatusBadRequest, response.ControllerResponse{ResponseMessage: "Invalid JSON format"})
		return
	}

	if loginReq.Username == "" || loginReq.Password == "" {
		response.JSON(w, http.StatusBadRequest, response.ControllerResponse{ResponseMessage: "Username and password are required"})
		return
	}

	var user models.User
	err := call.DB.Where("username = ?", loginReq.Username).First(&user).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			response.JSON(w, http.StatusUnauthorized, response.ControllerResponse{ResponseMessage: "Invalid username or password"})
			return
		}
		response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "Failed to query user"})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginReq.Password)); err != nil {
		response.JSON(w, http.StatusUnauthorized, response.ControllerResponse{ResponseMessage: "Invalid username or password"})
		return
	}

	if user.IsPengunjung {
		var loadedUser models.User
		err = call.DB.Preload("Pengunjung").Where("id_user = ?", user.IDUser).First(&loadedUser).Error
		if err != nil {
			response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "Failed to load pengunjung data"})
			return
		}

		if loadedUser.Pengunjung == nil {
			response.JSON(w, http.StatusNotFound, response.ControllerResponse{ResponseMessage: "Pengunjung profile not found"})
			return
		}

		resp := PengunjungEnvelope{
			User: PengunjungUserResponse{
				IDUser:   loadedUser.IDUser,
				Username: loadedUser.Username,
				Pengunjung: PengunjungLoginResponse{
					IDPengunjung:   loadedUser.Pengunjung.IDPengunjung,
					NoHandphone:    loadedUser.Pengunjung.NoHandphone,
					JenisKendaraan: loadedUser.Pengunjung.JenisKendaraan,
					PlatKendaraan:  loadedUser.Pengunjung.PlatKendaraan,
				},
			},
		}

		response.JSON(w, http.StatusOK, resp)
		return
	}

	var loadedUser models.User
	err = call.DB.Preload("Petugas").Where("id_user = ?", user.IDUser).First(&loadedUser).Error
	if err != nil {
		response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "Failed to load petugas data"})
		return
	}

	if loadedUser.Petugas == nil {
		response.JSON(w, http.StatusNotFound, response.ControllerResponse{ResponseMessage: "Petugas profile not found"})
		return
	}

	resp := PetugasEnvelope{
		User: PetugasUserResponse{
			IDUser:   loadedUser.IDUser,
			Username: loadedUser.Username,
			Petugas: PetugasLoginResponse{
				IDPetugas:            loadedUser.Petugas.IDPetugas,
				MallBertugas:         loadedUser.Petugas.MallBertugas,
				ShiftMulaiBertugas:   loadedUser.Petugas.ShiftMulaiBertugas.Format("2006-01-02T15:04:05Z07:00"),
				ShiftSelesaiBertugas: loadedUser.Petugas.ShiftSelesaiBertugas.Format("2006-01-02T15:04:05Z07:00"),
			},
		},
	}

	response.JSON(w, http.StatusOK, resp)
}
