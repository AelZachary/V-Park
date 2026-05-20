package dashboardcontroller

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"v-park/internal/logic"
	"v-park/internal/models"
	"v-park/internal/response"

	"gorm.io/gorm"
)

type TempatParkirController struct {
	DB *gorm.DB
}


type TempatParkir struct {
	IDTempatParkir     uint   `json:"IDTempatParkir"`
	IDLokasiMall       uint   `json:"IDLokasiMall"`
	KodeTempat         string `json:"KodeTempat"`
	LokasiTempatParkir string `json:"LokasiTempatParkir"`
	StatusTempatParkir string `json:"StatusTempatParkir"`
}

type TempatParkirPayload struct {
	TempatParkir []TempatParkir `json:"tempat_parkir"`
}

type TempatParkirPayloadWithTotal struct {
	TempatParkir      []TempatParkir `json:"tempat_parkir"`
	TotalSlotTersedia int            `json:"TotalSlotTersedia"`
}

func (c *TempatParkirController) GetByLokasiSSE(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		response.JSON(w, http.StatusMethodNotAllowed, response.ControllerResponse{ResponseMessage: "Method not allowed"})
		return
	}

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

	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")

	flusher, ok := w.(http.Flusher)
	if !ok {
		response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "Streaming unsupported"})
		return
	}

	ctx := r.Context()

	ticker := time.NewTicker(5 * time.Second)
	defer ticker.Stop()

	send := func(ctx context.Context) error {
		var spots []models.TempatParkir
		if err := c.DB.Where("id_lokasi_mall = ?", id).Order("id_tempat_parkir asc").Find(&spots).Error; err != nil {
			return err
		}

		dto := make([]TempatParkir, 0, len(spots))
		for _, s := range spots {
			dto = append(dto, TempatParkir{
				IDTempatParkir:     s.IDTempatParkir,
				IDLokasiMall:       s.IDLokasiMall,
				KodeTempat:         s.KodeTempat,
				LokasiTempatParkir: s.LokasiTempatParkir,
				StatusTempatParkir: s.StatusTempatParkir,
			})
		}

		totalInt64, err := logic.CountAvailableSlots(c.DB, id)
		if err != nil {
			return err
		}
		payload := TempatParkirPayloadWithTotal{TempatParkir: dto, TotalSlotTersedia: int(totalInt64)}
		b, err := json.Marshal(payload)
		if err != nil {
			return err
		}

		fmt.Fprintf(w, "event: update\n")
		fmt.Fprintf(w, "data: %s\n\n", b)
		flusher.Flush()
		return nil
	}

	if err := send(ctx); err != nil {
		response.JSON(w, http.StatusInternalServerError, response.ControllerResponse{ResponseMessage: "Failed to load tempat parkir"})
		return
	}

	for {
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			if err := send(ctx); err != nil {
				fmt.Fprintf(w, "event: error\n")
				fmt.Fprintf(w, "data: %q\n\n", "failed to query data")
				flusher.Flush()
				return
			}
		}
	}
}
