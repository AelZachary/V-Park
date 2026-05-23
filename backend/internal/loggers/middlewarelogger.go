package loggers

import "log/slog"

var MiddlewareLogger *slog.Logger
var MiddlewareAuthLogger *slog.Logger

func InitMiddleware() {
	MiddlewareLogger = WithModule("Middleware")
	MiddlewareAuthLogger = MiddlewareLogger.With("component", "Authentication")
}
