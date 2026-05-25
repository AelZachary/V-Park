package loggers

import (
	"log/slog"
)

var ControllerLogger *slog.Logger
var AuthenticationControllerLogger *slog.Logger
var DashboardControllerLogger *slog.Logger
var KonfirmasiPengunjungControllerLogger *slog.Logger
var PembayaranControllerLogger *slog.Logger
var ProfileControllerLogger *slog.Logger
var RiwayatsControllerLogger *slog.Logger
var StatusTempatParkirControllerLogger *slog.Logger

func InitController() {
	ControllerLogger = WithModule("Controller")

	AuthenticationControllerLogger = ControllerLogger.With("component", "Authentication")
	DashboardControllerLogger = ControllerLogger.With("component", "Dashboard")
	KonfirmasiPengunjungControllerLogger = ControllerLogger.With("component", "KonfirmasiPengunjung")
	PembayaranControllerLogger = ControllerLogger.With("component", "Pembayaran")
	ProfileControllerLogger = ControllerLogger.With("component", "Profile")
	RiwayatsControllerLogger = ControllerLogger.With("component", "Riwayats")
	StatusTempatParkirControllerLogger = ControllerLogger.With("component", "StatusTempatParkir")

}
