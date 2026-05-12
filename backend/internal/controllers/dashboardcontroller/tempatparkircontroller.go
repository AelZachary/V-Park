package dashboardcontroller

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"v-park/internal/models"
	"v-park/internal/response"

	"gorm.io/gorm"
)

type TempatParkirController struct {
	DB *gorm.DB
}

// DTO excludes Monitoring field for client responses
type TempatParkirDTO struct {
	IDTempatParkir     uint   `json:"IDTempatParkir"`
	IDLokasiMall       uint   `json:"IDLokasiMall"`
	KodeTempat         string `json:"KodeTempat"`
	LokasiTempatParkir string `json:"LokasiTempatParkir"`
	StatusTempatParkir string `json:"StatusTempatParkir"`
}

type TempatParkirPayload struct {
	TempatParkir []TempatParkirDTO `json:"tempat_parkir"`
}

// GetByLokasiSSE streams TempatParkir rows for a given id_lokasi_mall as SSE events.
// Query param: id_lokasi_mall (uint)
func (c *TempatParkirController) GetByLokasiSSE(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		response.JSON(w, http.StatusMethodNotAllowed, response.ControllerResponse{ResponseMessage: "Method not allowed"})
		return
	}

	// accept `idlokasimall` (preferred) or legacy `id_lokasi_mall` / `id_lokasi`
	q := r.URL.Query().Get("idlokasimall")
	if q == "" {
		q = r.URL.Query().Get("id_lokasi_mall")
	}
	if q == "" {
		q = r.URL.Query().Get("id_lokasi")
	}
	if q == "" {
		response.JSON(w, http.StatusBadRequest, response.ControllerResponse{ResponseMessage: "Missing id_lokasi_mall query parameter"})
		return
	}

	id64, err := strconv.ParseUint(q, 10, 64)
	if err != nil {
		response.JSON(w, http.StatusBadRequest, response.ControllerResponse{ResponseMessage: "Invalid id_lokasi_mall"})
		return
	}
	id := uint(id64)

	// Prepare SSE headers
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")

	flusher, ok := w.(http.Flusher)
	if !ok {
		response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "Streaming unsupported"})
		return
	}

	ctx := r.Context()

	// send initial snapshot and then periodic updates
	ticker := time.NewTicker(5 * time.Second)
	defer ticker.Stop()

	send := func(ctx context.Context) error {
		var spots []models.TempatParkir
		if err := c.DB.Where("id_lokasi_mall = ?", id).Order("id_tempat_parkir asc").Find(&spots).Error; err != nil {
			return err
		}

		// map to DTO to exclude Monitoring
		dto := make([]TempatParkirDTO, 0, len(spots))
		for _, s := range spots {
			dto = append(dto, TempatParkirDTO{
				IDTempatParkir:     s.IDTempatParkir,
				IDLokasiMall:       s.IDLokasiMall,
				KodeTempat:         s.KodeTempat,
				LokasiTempatParkir: s.LokasiTempatParkir,
				StatusTempatParkir: s.StatusTempatParkir,
			})
		}

		payload := TempatParkirPayload{TempatParkir: dto}
		b, err := json.Marshal(payload)
		if err != nil {
			return err
		}

		// SSE event (type "update")
		fmt.Fprintf(w, "event: update\n")
		fmt.Fprintf(w, "data: %s\n\n", b)
		flusher.Flush()
		return nil
	}

	// initial send
	if err := send(ctx); err != nil {
		response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "Failed to load tempat parkir"})
		return
	}

	// loop until client disconnects
	for {
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			if err := send(ctx); err != nil {
				// send error event then stop
				fmt.Fprintf(w, "event: error\n")
				fmt.Fprintf(w, "data: %q\n\n", "failed to query data")
				flusher.Flush()
				return
			}
		}
	}
}
