package profilecontroller

import (
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"v-park/internal/loggers"
	"v-park/internal/models"
	"v-park/internal/response"

	"gorm.io/gorm"
)

type ProfileEditPengunjungController struct {
	DB *gorm.DB
}

type ProfileEditPengunjungRequest struct {
	JenisKendaraan string
	PlatKendaraan  string
}

type ProfileEditPengunjungDataResponse struct {
	IDPengunjung   uint    `json:"IDPengunjung"`
	JenisKendaraan string  `json:"JenisKendaraan"`
	PlatKendaraan  string  `json:"PlatKendaraan"`
	FotoPengunjung *string `json:"FotoPengunjung"`
}

func savePengunjungPhoto(file multipart.File, header *multipart.FileHeader) (string, error) {
	if err := os.MkdirAll(filepath.Join("..", "..", "..", "internal", "foto", "uploads", "fotoprofile"), 0755); err != nil {
		return "", err
	}

	ext := strings.ToLower(filepath.Ext(header.Filename))
	if ext == "" {
		ext = ".jpg"
	}

	fileName := fmt.Sprintf("pengunjung_%d%s", time.Now().UnixNano(), ext)
	fullPath := filepath.Join("..", "..", "..", "internal", "foto", "uploads", "fotoprofile", fileName)

	dst, err := os.Create(fullPath)
	if err != nil {
		return "", err
	}
	defer dst.Close()

	if _, err := io.Copy(dst, file); err != nil {
		return "", err
	}

	return "/uploads/fotoprofile/" + fileName, nil
}

func (c *ProfileEditPengunjungController) EditProfilePengunjungHandler(w http.ResponseWriter, r *http.Request) {
	logger := loggers.ProfileControllerLogger
	if logger != nil {
		logger.Info("request received", "handler", "EditProfilePengunjungHandler", "method", r.Method, "path", r.URL.Path)
	}

	if r.Method != http.MethodPost {
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

	var req ProfileEditPengunjungRequest
	var fotoPath string

	if strings.HasPrefix(r.Header.Get("Content-Type"), "multipart/form-data") {
		if err := r.ParseMultipartForm(10 << 20); err != nil {
			response.JSON(w, http.StatusBadRequest, response.ControllerResponse{ResponseMessage: "Invalid multipart form data"})
			return
		}

		req.JenisKendaraan = r.FormValue("JenisKendaraan")
		req.PlatKendaraan = r.FormValue("PlatKendaraan")

		file, header, err := r.FormFile("FotoPengunjung")
		if err == nil {
			defer file.Close()

			fotoPath, err = savePengunjungPhoto(file, header)
			if err != nil {
				response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "Failed to save photo"})
				return
			}
		}
	} else {
		if err := r.ParseForm(); err != nil {
			response.JSON(w, http.StatusBadRequest, response.ControllerResponse{ResponseMessage: "Invalid form data"})
			return
		}

		req.JenisKendaraan = r.FormValue("JenisKendaraan")
		req.PlatKendaraan = r.FormValue("PlatKendaraan")
	}

	if req.JenisKendaraan == "" || req.PlatKendaraan == "" {
		response.JSON(w, http.StatusBadRequest, response.ControllerResponse{ResponseMessage: "JenisKendaraan and PlatKendaraan are required"})
		return
	}

	var responseData ProfileEditPengunjungDataResponse

	var fotoResponse *string
	if fotoPath != "" {
		foto := fotoPath
		fotoResponse = &foto
	}

	if err := c.DB.Transaction(func(tx *gorm.DB) error {
		var pengunjung models.Pengunjung
		if err := tx.First(&pengunjung, uint(idPengunjung)).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				return gorm.ErrRecordNotFound
			}
			return err
		}

		if err := tx.Model(&models.Pengunjung{}).
			Where("id_pengunjung = ?", uint(idPengunjung)).
			Updates(map[string]any{
				"jenis_kendaraan": req.JenisKendaraan,
				"plat_kendaraan":  req.PlatKendaraan,
				"foto_pengunjung": fotoPath,
			}).Error; err != nil {
			return err
		}

		if err := tx.First(&pengunjung, uint(idPengunjung)).Error; err != nil {
			return err
		}

		responseData = ProfileEditPengunjungDataResponse{
			IDPengunjung:   pengunjung.IDPengunjung,
			JenisKendaraan: pengunjung.JenisKendaraan,
			PlatKendaraan:  pengunjung.PlatKendaraan,
			FotoPengunjung: fotoResponse,
		}

		return nil
	}); err != nil {
		if err == gorm.ErrRecordNotFound {
			response.JSON(w, http.StatusNotFound, response.ControllerResponse{ResponseMessage: "Pengunjung not found"})
			return
		}
		response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "Database error"})
		return
	}

	response.JSON(w, http.StatusOK, responseData)
}
