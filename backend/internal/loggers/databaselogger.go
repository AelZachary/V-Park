package loggers

import "log/slog"

var DatabaseLogger *slog.Logger
var DatabaseGormLogger *slog.Logger
var DatabaseMigrateLogger *slog.Logger
var DatabaseSeedLogger *slog.Logger

func InitDatabase() {
	DatabaseLogger = WithModule("Database")

	DatabaseGormLogger = DatabaseLogger.With("component", "Gorm")
	DatabaseMigrateLogger = DatabaseLogger.With("component", "Migrations")
	DatabaseSeedLogger = DatabaseLogger.With("component", "Seeds")
}
