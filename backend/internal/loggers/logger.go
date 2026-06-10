package loggers

import (
	"log/slog"
	"os"
	"time"

	"github.com/lmittmann/tint"
)

func Init(env string) {
	var handler slog.Handler
	level := slog.LevelInfo
	if env == "dev" {
		level = slog.LevelDebug
	}

	handler = tint.NewHandler(os.Stdout, &tint.Options{
		Level:      level,
		TimeFormat: time.Kitchen,
		AddSource:  true,
	})

	baseLogger := slog.New(handler).With(
		"env", env,
		"website", "V-Park",
	)

	slog.SetDefault(baseLogger)
}

func With(fields ...any) *slog.Logger {
	return slog.Default().With(fields...)
}

func WithModule(module string) *slog.Logger {
	return slog.Default().With("module", module)
}
