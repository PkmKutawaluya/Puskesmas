
const { ApiError } = require("../utils/apiResponse");


function errorHandler(err, req, res, next) {
  const isApiError = err instanceof ApiError;
  const status = isApiError ? err.status : 500;
  const message = isApiError ? err.message : "Terjadi kesalahan pada server.";

  if (!isApiError) {

    console.error("[UNHANDLED ERROR]", err);
  }

  const body = { success: false, message };
  if (isApiError && err.details !== undefined) {
    body.details = err.details;
  }
  if (process.env.NODE_ENV === "development" && !isApiError) {
    body.debug = err.message;
  }

  res.status(status).json(body);
}

/** Middleware untuk rute yang tidak ditemukan (404). */
function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.method} ${req.originalUrl} tidak ditemukan.`,
  });
}

module.exports = { errorHandler, notFoundHandler };
