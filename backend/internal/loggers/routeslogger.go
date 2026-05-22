package loggers

import (
	"log/slog"
)

var RoutesLogger *slog.Logger
var AuthenticationRoutesLogger *slog.Logger
var DashboardRoutesLogger *slog.Logger
var KonfirmasiPengunjungRoutesLogger *slog.Logger
var PembayaranRoutesLogger *slog.Logger
var ProfileRoutesLogger *slog.Logger
var RiwayatRoutesLogger *slog.Logger
var StatusTempatParkirRoutesLogger *slog.Logger

func InitRoutes() {
	RoutesLogger = WithModule("Routes")

	AuthenticationRoutesLogger = RoutesLogger.With("component", "Authentication")
	DashboardRoutesLogger = RoutesLogger.With("component", "Dashboard")
	KonfirmasiPengunjungRoutesLogger = RoutesLogger.With("component", "KonfirmasiPengunjung")
	PembayaranRoutesLogger = RoutesLogger.With("component", "Pembayaran")
	ProfileRoutesLogger = RoutesLogger.With("component", "Profile")
	RiwayatRoutesLogger = RoutesLogger.With("component", "Riwayat")
	StatusTempatParkirRoutesLogger = RoutesLogger.With("component", "StatusTempatParkir")
}
