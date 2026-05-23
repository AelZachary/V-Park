package authenticationcontroller

import (
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"errors"
	"net/http"
	"time"

	"v-park/internal/loggers"
	"v-park/internal/models"
	"v-park/internal/response"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type LoginPengunjung struct {
	DB *gorm.DB
}

type LoginRequest struct {
	Username string `json:"Username"`
	Password string `json:"Password"`
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
	User  PengunjungUserResponse `json:"User"`
	Token LoginTokenResponse     `json:"Token"`
}

type PetugasEnvelope struct {
	User  PetugasUserResponse `json:"User"`
	Token LoginTokenResponse  `json:"Token"`
}

type LoginTokenResponse struct {
	Token string `json:"Token"`
}

func generateTokenValue(size int) (string, error) {
	raw := make([]byte, size)
	if _, err := rand.Read(raw); err != nil {
		return "", err
	}

	return hex.EncodeToString(raw), nil
}

func issueLoginToken(db *gorm.DB, userID uint) (models.Token, error) {
	tokenValue, err := generateTokenValue(32)
	if err != nil {
		return models.Token{}, err
	}

	expiredAt := time.Now().Add(24 * time.Hour).Unix()
	token := models.Token{
		IDUser:    userID,
		Token:     tokenValue,
		ExpiredAt: expiredAt,
	}

	if err := db.Where("id_user = ?", userID).
		Assign(models.Token{Token: tokenValue, ExpiredAt: expiredAt}).
		FirstOrCreate(&token).Error; err != nil {
		return models.Token{}, err
	}

	return token, nil
}

func (call *LoginPengunjung) LoginHandler(w http.ResponseWriter, r *http.Request) {
	logger := loggers.AuthenticationControllerLogger
	if logger != nil {
		logger.Info("request received", "handler", "LoginHandler", "method", r.Method, "path", r.URL.Path)
	}

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
		if logger != nil {
			logger.Error("failed to query user", "error", err)
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
			if logger != nil {
				logger.Error("failed to load pengunjung data", "error", err)
			}
			response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "Failed to load pengunjung data"})
			return
		}

		if loadedUser.Pengunjung == nil {
			response.JSON(w, http.StatusNotFound, response.ControllerResponse{ResponseMessage: "Pengunjung profile not found"})
			return
		}

		token, err := issueLoginToken(call.DB, loadedUser.IDUser)
		if err != nil {
			if logger != nil {
				logger.Error("failed to Login", "error", err)
			}
			response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "Failed to issue login token"})
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
			Token: LoginTokenResponse{
				Token: token.Token,
			},
		}

		response.JSON(w, http.StatusOK, resp)
		return
	}

	var loadedUser models.User
	err = call.DB.Preload("Petugas").Where("id_user = ?", user.IDUser).First(&loadedUser).Error
	if err != nil {
		if logger != nil {
			logger.Error("failed to load petugas data", "error", err)
		}
		response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "Failed to load petugas data"})
		return
	}

	if loadedUser.Petugas == nil {
		response.JSON(w, http.StatusNotFound, response.ControllerResponse{ResponseMessage: "Petugas profile not found"})
		return
	}

	token, err := issueLoginToken(call.DB, loadedUser.IDUser)
	if err != nil {
		if logger != nil {
			logger.Error("failed to issue login token", "error", err)
		}
		response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "Failed to issue login token"})
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
		Token: LoginTokenResponse{
			Token: token.Token,
		},
	}

	response.JSON(w, http.StatusOK, resp)
}
