package profilecontroller

import (
	"net/http"
	"strconv"

	"v-park/internal/logic"
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
	NoPengguna        string `json:"NoPengguna"`
	KendaraanPengguna string `json:"KendaraanPengguna"`
	PlatPengguna      string `json:"PlatPengguna"`
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
	if r.Method != http.MethodGet {
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

	var pengunjung models.Pengunjung
	if err := c.DB.Preload("Booking.RiwayatBooking.Pembayaran.MetodePembayaran").First(&pengunjung, uint(idPengunjung)).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			response.JSON(w, http.StatusNotFound, response.ControllerResponse{ResponseMessage: "Pengunjung not found"})
			return
		}
		response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "Database error"})
		return
	}

	var user models.User
	if err := c.DB.First(&user, pengunjung.IDUser).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			response.JSON(w, http.StatusNotFound, response.ControllerResponse{ResponseMessage: "Profile not found"})
			return
		}
		response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "Database error"})
		return
	}

	totalBooking := logic.CalculateTotalBooking(pengunjung.Booking)
	totalJumlahPembayaran := logic.CalculateTotalJumlahPembayaran(pengunjung.Booking)

	responseData := ProfileInformasiPengunjungResponse{
		User: ProfileInformasiPengunjungUserResponse{
			Username: user.Username,
		},
		Pengunjung: ProfileInformasiPengunjungDataResponse{
			NoPengguna:        pengunjung.NoHandphone,
			KendaraanPengguna: pengunjung.JenisKendaraan,
			PlatPengguna:      pengunjung.PlatKendaraan,
		},
		Statistik: ProfileInformasiPengunjungStatistikResponse{
			TotalBooking:          totalBooking,
			TotalJumlahPembayaran: totalJumlahPembayaran,
		},
	}

	response.JSON(w, http.StatusOK, responseData)
}
