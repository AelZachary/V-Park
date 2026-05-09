package authenticationcontroller

import (
	"encoding/json"
	"fmt"
	"net/http"
	"v-park/internal/models"
	"v-park/internal/response"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type RegistrasiController struct {
	DB *gorm.DB
}

type RegistrasiRequest struct {
	Username     string `json:"Username"`
	Password     string `json:"Password"`
	NoHandphone  string `json:"NoHandphone"`
	IsPengunjung bool   `json:"IsPengunjung"`
}

func (reg *RegistrasiController) RegistrasiHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		response.JSON(w, http.StatusMethodNotAllowed, response.ControllerResponse{ResponseMessage: "Method not allowed"})
		return
	}

	var regReq RegistrasiRequest
	if err := json.NewDecoder(r.Body).Decode(&regReq); err != nil {
		response.JSON(w, http.StatusBadRequest, response.ControllerResponse{ResponseMessage: "Invalid JSON format"})
		return
	}

	// Validasi input
	if regReq.Username == "" || regReq.Password == "" || regReq.NoHandphone == "" {
		response.JSON(w, http.StatusBadRequest, response.ControllerResponse{ResponseMessage: "Username, password, and nohandphone are required"})
		return
	}

	// Check apakah username sudah ada
	var existingUser models.User
	if err := reg.DB.Where("username = ?", regReq.Username).First(&existingUser).Error; err == nil {
		response.JSON(w, http.StatusBadRequest, response.ControllerResponse{ResponseMessage: "Username already exists"})
		return
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(regReq.Password), bcrypt.DefaultCost)
	if err != nil {
		response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "Failed to process password"})
		return
	}

	// Transaction: buat User dan Pengunjung sekaligus
	if err := reg.DB.Transaction(func(tx *gorm.DB) error {
		// Buat user
		newUser := models.User{
			Username:     regReq.Username,
			Password:     string(hashedPassword),
			IsPengunjung: true, // Selalu true untuk registrasi
		}

		if err := tx.Create(&newUser).Error; err != nil {
			return err
		}

		// Buat pengunjung dengan JenisKendaraan dan PlatKendaraan kosong
		newPengunjung := models.Pengunjung{
			IDUser:         newUser.IDUser,
			NoHandphone:    regReq.NoHandphone,
			JenisKendaraan: "", // Kosong
			PlatKendaraan:  "", // Kosong
		}

		if err := tx.Create(&newPengunjung).Error; err != nil {
			return err
		}

		// Load user dengan pengunjung relation
		var loadedUser models.User
		if err := tx.Preload("Pengunjung").First(&loadedUser, newUser.IDUser).Error; err != nil {
			return err
		}

		// Return response
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

		response.JSON(w, http.StatusCreated, resp)
		return nil

	}); err != nil {
		response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: fmt.Sprintf("Failed to register: %v", err)})
		return
	}
}
