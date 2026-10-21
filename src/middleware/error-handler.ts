import type {ErrorRequestHandler} from "express";
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
const statusCode = typeof err.status ==="number" &&
err.status >= 400 &&
err.status< 600 ? err.status : 500;
const message =
    statusCode === 500
      ? "Internal server error"
      : err.message || "Request failed";

  if (statusCode === 500) {
    console.error("Unhandled application error:", err);
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};