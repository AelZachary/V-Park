package profilecontroller

import (
	"net/http"

	"v-park/internal/loggers"
	"v-park/internal/logic"
	"v-park/internal/middleware"
	"v-park/internal/models"
	"v-park/internal/response"

	"gorm.io/gorm"
)

type ProfileInformasiPengunjungController struct {
	DB *gorm.DB
}

type ProfileInformasiPengunjungUserResponse struct {
	Username string `json:"Username"`
}

type ProfileInformasiPengunjungDataResponse struct {
	NoPengguna        string  `json:"NoPengguna"`
	KendaraanPengguna string  `json:"KendaraanPengguna"`
	PlatPengguna      string  `json:"PlatPengguna"`
	FotoPengunjung    *string `json:"FotoPengunjung"`
}

type ProfileInformasiPengunjungStatistikResponse struct {
	TotalBooking          int `json:"TotalBooking"`
	TotalJumlahPembayaran int `json:"TotalJumlahPembayaran"`
}

type ProfileInformasiPengunjungResponse struct {
	User       ProfileInformasiPengunjungUserResponse      `json:"User"`
	Pengunjung ProfileInformasiPengunjungDataResponse      `json:"Pengunjung"`
	Statistik  ProfileInformasiPengunjungStatistikResponse `json:"Statistik"`
}

func (c *ProfileInformasiPengunjungController) GetProfileInformasiPengunjungHandler(w http.ResponseWriter, r *http.Request) {
	logger := loggers.ProfileControllerLogger
	if logger != nil {
		logger.Info("request received", "handler", "GetProfileInformasiPengunjungHandler", "method", r.Method, "path", r.URL.Path)
	}

	if r.Method != http.MethodGet {
		response.JSON(w, http.StatusMethodNotAllowed, response.ControllerResponse{ResponseMessage: "Method not allowed"})
		return
	}

	authInfo, ok := middleware.GetPengunjungAuthInfo(r.Context())
	if !ok || authInfo.User.Pengunjung == nil {
		response.JSON(w, http.StatusUnauthorized, response.ControllerResponse{ResponseMessage: "Unauthorized"})
		return
	}

	pengunjungAuth := authInfo.User.Pengunjung
	if pengunjungAuth == nil {
		response.JSON(w, http.StatusForbidden, response.ControllerResponse{ResponseMessage: "Forbidden"})
		return
	}

	var pengunjung models.Pengunjung
	if err := c.DB.Preload("Booking.RiwayatBooking.Pembayaran.MetodePembayaran").First(&pengunjung, pengunjungAuth.IDPengunjung).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			response.JSON(w, http.StatusNotFound, response.ControllerResponse{ResponseMessage: "Pengunjung not found"})
			return
		}
		if logger != nil {
			logger.Error("failed to load pengunjung profile", "error", err)
		}
		response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "Database error"})
		return
	}

	totalBooking := logic.CalculateTotalBooking(pengunjung.Booking)
	totalJumlahPembayaran := logic.CalculateTotalJumlahPembayaran(pengunjung.Booking)
	var fotoPengunjung *string
	if pengunjung.FotoPengunjung != "" {
		foto := pengunjung.FotoPengunjung
		fotoPengunjung = &foto
	}

	responseData := ProfileInformasiPengunjungResponse{
		User: ProfileInformasiPengunjungUserResponse{
			Username: authInfo.User.Username,
		},
		Pengunjung: ProfileInformasiPengunjungDataResponse{
			NoPengguna:        pengunjung.NoHandphone,
			KendaraanPengguna: pengunjung.JenisKendaraan,
			PlatPengguna:      pengunjung.PlatKendaraan,
			FotoPengunjung:    fotoPengunjung,
		},
		Statistik: ProfileInformasiPengunjungStatistikResponse{
			TotalBooking:          totalBooking,
			TotalJumlahPembayaran: totalJumlahPembayaran,
		},
	}

	response.JSON(w, http.StatusOK, responseData)
}
