package dashboardcontroller

import (
	"net/http"

	"v-park/internal/models"
	"v-park/internal/response"

	"gorm.io/gorm"
)

type DashboardPengunjungController struct {
	DB *gorm.DB
}

type LokasiMallDashboardResponse struct {
	IDLokasiMall uint   `json:"IDLokasiMall"`
	AlamatLokasi string `json:"AlamatLokasi"`
}

func (c *DashboardPengunjungController) GetAllPengunjungHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		response.JSON(w, http.StatusMethodNotAllowed, response.ControllerResponse{ResponseMessage: "Method not allowed"})
		return
	}

	var lokasiMalls []models.LokasiMall
	if err := c.DB.Order("id_lokasi_mall asc").Find(&lokasiMalls).Error; err != nil {
		response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "Failed to load lokasi mall data"})
		return
	}

	data := make([]LokasiMallDashboardResponse, 0, len(lokasiMalls))
	for _, item := range lokasiMalls {
		data = append(data, LokasiMallDashboardResponse{
			IDLokasiMall: item.IDLokasiMall,
			AlamatLokasi: item.AlamatLokasi,
		})
	}

	response.JSON(w, http.StatusOK, response.ControllerResponse{
		ResponseMessage: "Success",
		CoontrollerData: data,
	})
}
