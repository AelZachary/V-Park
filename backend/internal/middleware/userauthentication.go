package middleware

import (
	"context"
	"errors"
	"log/slog"
	"net/http"
	"strconv"
	"strings"
	"time"

	"v-park/internal/loggers"
	"v-park/internal/models"
	"v-park/internal/response"

	"gorm.io/gorm"
)

type pengunjungAuthContextKey struct{}

type petugasAuthContextKey struct{}

type anyAuthContextKey struct{}

type PengunjungAuthInfo struct {
	User  models.User
	Token models.Token
}

type PetugasAuthInfo struct {
	User    models.User
	Petugas models.Petugas
	Token   models.Token
}

type AnyAuthInfo struct {
	User  models.User
	Token models.Token
}

func GetPengunjungAuthInfo(ctx context.Context) (PengunjungAuthInfo, bool) {
	value := ctx.Value(pengunjungAuthContextKey{})
	info, ok := value.(PengunjungAuthInfo)
	return info, ok
}

func GetPetugasAuthInfo(ctx context.Context) (PetugasAuthInfo, bool) {
	value := ctx.Value(petugasAuthContextKey{})
	info, ok := value.(PetugasAuthInfo)
	return info, ok
}

func GetAnyAuthInfo(ctx context.Context) (AnyAuthInfo, bool) {
	if value := ctx.Value(anyAuthContextKey{}); value != nil {
		if info, ok := value.(AnyAuthInfo); ok {
			return info, true
		}
	}

	if value := ctx.Value(pengunjungAuthContextKey{}); value != nil {
		if info, ok := value.(PengunjungAuthInfo); ok {
			return AnyAuthInfo{User: info.User, Token: info.Token}, true
		}
	}

	if value := ctx.Value(petugasAuthContextKey{}); value != nil {
		if info, ok := value.(PetugasAuthInfo); ok {
			return AnyAuthInfo{User: info.User, Token: info.Token}, true
		}
	}

	return AnyAuthInfo{}, false
}

func ParseBookingIDFromPath(r *http.Request) (uint, error) {
	pathID := strings.TrimSpace(r.PathValue("IDBooking"))
	if pathID == "" {
		return 0, errors.New("missing booking id")
	}

	parsedID, err := strconv.ParseUint(pathID, 10, 64)
	if err != nil || parsedID == 0 {
		return 0, errors.New("invalid booking id")
	}

	return uint(parsedID), nil
}

func LoadPengunjungBookingByID(db *gorm.DB, pengunjungID, bookingID uint) (models.Booking, error) {
	var booking models.Booking
	if err := db.Preload("RiwayatBooking").Where("id_booking = ? AND id_pengunjung = ?", bookingID, pengunjungID).First(&booking).Error; err != nil {
		return models.Booking{}, err
	}

	return booking, nil
}

func RequirePengunjungToken(db *gorm.DB, next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		logger := loggers.MiddlewareAuthLogger
		if logger != nil {
			logger.Info("authentication request received", "role", "pengunjung", "method", r.Method, "path", r.URL.Path)
		}

		info, statusCode, message := authenticatePengunjung(db, r)
		if statusCode != http.StatusOK {
			logAuthOutcome(logger, "pengunjung", r, statusCode, message)
			response.JSON(w, statusCode, response.ControllerResponse{ResponseMessage: message})
			return
		}

		ctx := context.WithValue(r.Context(), pengunjungAuthContextKey{}, info)
		next(w, r.WithContext(ctx))
	}
}

func RequirePetugasToken(db *gorm.DB, next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		logger := loggers.MiddlewareAuthLogger
		if logger != nil {
			logger.Info("authentication request received", "role", "petugas", "method", r.Method, "path", r.URL.Path)
		}

		info, statusCode, message := authenticatePetugas(db, r)
		if statusCode != http.StatusOK {
			logAuthOutcome(logger, "petugas", r, statusCode, message)
			response.JSON(w, statusCode, response.ControllerResponse{ResponseMessage: message})
			return
		}

		ctx := context.WithValue(r.Context(), petugasAuthContextKey{}, info)
		next(w, r.WithContext(ctx))
	}
}

func RequireAnyUserToken(db *gorm.DB, next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		logger := loggers.MiddlewareAuthLogger
		if logger != nil {
			logger.Info("authentication request received", "role", "any", "method", r.Method, "path", r.URL.Path)
		}

		info, statusCode, message := authenticateAnyUser(db, r)
		if statusCode != http.StatusOK {
			logAuthOutcome(logger, "any", r, statusCode, message)
			response.JSON(w, statusCode, response.ControllerResponse{ResponseMessage: message})
			return
		}

		ctx := context.WithValue(r.Context(), anyAuthContextKey{}, info)
		next(w, r.WithContext(ctx))
	}
}

func authenticatePengunjung(db *gorm.DB, r *http.Request) (PengunjungAuthInfo, int, string) {
	if db == nil {
		return PengunjungAuthInfo{}, http.StatusInternalServerError, "Database unavailable"
	}

	authHeader := strings.TrimSpace(r.Header.Get("Authorization"))
	if authHeader == "" {
		return PengunjungAuthInfo{}, http.StatusUnauthorized, "Unauthorized"
	}

	parts := strings.SplitN(authHeader, " ", 2)
	if len(parts) != 2 || !strings.EqualFold(parts[0], "Bearer") {
		return PengunjungAuthInfo{}, http.StatusUnauthorized, "Unauthorized"
	}

	tokenValue := strings.TrimSpace(parts[1])
	if tokenValue == "" {
		return PengunjungAuthInfo{}, http.StatusUnauthorized, "Unauthorized"
	}

	var token models.Token
	if err := db.Where("token = ?", tokenValue).First(&token).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return PengunjungAuthInfo{}, http.StatusUnauthorized, "Unauthorized"
		}
		return PengunjungAuthInfo{}, http.StatusInternalServerError, "Database error"
	}

	if token.ExpiredAt != nil && time.Now().After(*token.ExpiredAt) {
		return PengunjungAuthInfo{}, http.StatusUnauthorized, "Token expired"
	}

	var user models.User
	if err := db.Preload("Pengunjung").First(&user, token.IDUser).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return PengunjungAuthInfo{}, http.StatusUnauthorized, "Unauthorized"
		}
		return PengunjungAuthInfo{}, http.StatusInternalServerError, "Database error"
	}

	if !user.IsPengunjung || user.Pengunjung == nil {
		return PengunjungAuthInfo{}, http.StatusForbidden, "Forbidden"
	}

	return PengunjungAuthInfo{User: user, Token: token}, http.StatusOK, ""
}

func authenticatePetugas(db *gorm.DB, r *http.Request) (PetugasAuthInfo, int, string) {
	if db == nil {
		return PetugasAuthInfo{}, http.StatusInternalServerError, "Database unavailable"
	}

	authHeader := strings.TrimSpace(r.Header.Get("Authorization"))
	if authHeader == "" {
		return PetugasAuthInfo{}, http.StatusUnauthorized, "Unauthorized"
	}

	parts := strings.SplitN(authHeader, " ", 2)
	if len(parts) != 2 || !strings.EqualFold(parts[0], "Bearer") {
		return PetugasAuthInfo{}, http.StatusUnauthorized, "Unauthorized"
	}

	tokenValue := strings.TrimSpace(parts[1])
	if tokenValue == "" {
		return PetugasAuthInfo{}, http.StatusUnauthorized, "Unauthorized"
	}

	var token models.Token
	if err := db.Where("token = ?", tokenValue).First(&token).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return PetugasAuthInfo{}, http.StatusUnauthorized, "Unauthorized"
		}
		return PetugasAuthInfo{}, http.StatusInternalServerError, "Database error"
	}

	if token.ExpiredAt != nil && time.Now().After(*token.ExpiredAt) {
		return PetugasAuthInfo{}, http.StatusUnauthorized, "Token expired"
	}

	var user models.User
	if err := db.Preload("Petugas").First(&user, token.IDUser).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return PetugasAuthInfo{}, http.StatusUnauthorized, "Unauthorized"
		}
		return PetugasAuthInfo{}, http.StatusInternalServerError, "Database error"
	}

	if user.IsPengunjung || user.Petugas == nil {
		return PetugasAuthInfo{}, http.StatusForbidden, "Forbidden"
	}

	return PetugasAuthInfo{User: user, Petugas: *user.Petugas, Token: token}, http.StatusOK, ""
}

func authenticateAnyUser(db *gorm.DB, r *http.Request) (AnyAuthInfo, int, string) {
	if db == nil {
		return AnyAuthInfo{}, http.StatusInternalServerError, "Database unavailable"
	}

	authHeader := strings.TrimSpace(r.Header.Get("Authorization"))
	if authHeader == "" {
		return AnyAuthInfo{}, http.StatusUnauthorized, "Unauthorized"
	}

	parts := strings.SplitN(authHeader, " ", 2)
	if len(parts) != 2 || !strings.EqualFold(parts[0], "Bearer") {
		return AnyAuthInfo{}, http.StatusUnauthorized, "Unauthorized"
	}

	tokenValue := strings.TrimSpace(parts[1])
	if tokenValue == "" {
		return AnyAuthInfo{}, http.StatusUnauthorized, "Unauthorized"
	}

	var token models.Token
	if err := db.Where("token = ?", tokenValue).First(&token).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return AnyAuthInfo{}, http.StatusUnauthorized, "Unauthorized"
		}
		return AnyAuthInfo{}, http.StatusInternalServerError, "Database error"
	}

	if token.ExpiredAt != nil && time.Now().After(*token.ExpiredAt) {
		return AnyAuthInfo{}, http.StatusUnauthorized, "Token expired"
	}

	var user models.User
	if err := db.Preload("Pengunjung").Preload("Petugas").First(&user, token.IDUser).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return AnyAuthInfo{}, http.StatusUnauthorized, "Unauthorized"
		}
		return AnyAuthInfo{}, http.StatusInternalServerError, "Database error"
	}

	if !user.IsPengunjung && user.Petugas == nil {
		return AnyAuthInfo{}, http.StatusForbidden, "Forbidden"
	}

	return AnyAuthInfo{User: user, Token: token}, http.StatusOK, ""
}

func logAuthOutcome(logger *slog.Logger, role string, r *http.Request, statusCode int, message string) {
	if logger == nil {
		return
	}

	attrs := []any{
		"role", role,
		"method", r.Method,
		"path", r.URL.Path,
		"status_code", statusCode,
		"message", message,
	}

	if statusCode >= http.StatusInternalServerError {
		logger.Error("authentication failed", attrs...)
		return
	}

	logger.Warn("authentication rejected", attrs...)
}
