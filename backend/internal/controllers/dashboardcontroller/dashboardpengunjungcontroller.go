package dashboardcontroller

import (
	"net/http"

	"v-park/internal/loggers"
	"v-park/internal/middleware"
	"v-park/internal/models"
	"v-park/internal/response"

	"gorm.io/gorm"
)

type DashboardPengunjungController struct {
	DB *gorm.DB
}

type FotoLokasiMallResponse struct {
	FotoLokasi string `json:"FotoLokasi"`
}

type LokasiMallDataResponse struct {
	IDLokasiMall uint   `json:"IDLokasiMall"`
	AlamatLokasi string `json:"AlamatLokasi"`
}

type LokasiMallDashboardResponse struct {
	LokasiMall     LokasiMallDataResponse   `json:"LokasiMall"`
	FotoLokasiMall []FotoLokasiMallResponse `json:"FotoLokasiMall"`
}

func (c *DashboardPengunjungController) GetAllPengunjungHandler(w http.ResponseWriter, r *http.Request) {
	logger := loggers.DashboardControllerLogger
	if logger != nil {
		logger.Info("request received", "handler", "GetAllPengunjungHandler", "method", r.Method, "path", r.URL.Path)
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

	var lokasiMalls []models.LokasiMall
	if err := c.DB.Preload("FotoLokasiMall").Order("id_lokasi_mall asc").Find(&lokasiMalls).Error; err != nil {
		if logger != nil {
			logger.Error("failed to load lokasi mall data", "error", err)
		}
		response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "Failed to load lokasi mall data"})
		return
	}

	data := make([]LokasiMallDashboardResponse, 0, len(lokasiMalls))
	for _, item := range lokasiMalls {
		fotoResponses := make([]FotoLokasiMallResponse, 0, len(item.FotoLokasiMall))
		for _, foto := range item.FotoLokasiMall {
			fotoResponses = append(fotoResponses, FotoLokasiMallResponse{
				FotoLokasi: foto.FotoLokasi,
			})
		}

		data = append(data, LokasiMallDashboardResponse{
			LokasiMall: LokasiMallDataResponse{
				IDLokasiMall: item.IDLokasiMall,
				AlamatLokasi: item.AlamatLokasi,
			},
			FotoLokasiMall: fotoResponses,
		})
	}

	response.JSON(w, http.StatusOK, response.ControllerResponse{
		ResponseMessage: "Success",
		CoontrollerData: data,
	})
}
