

function sendSuccess(res, { data = undefined, message = undefined, status = 200 } = {}) {
  const body = { success: true };
  if (message !== undefined) body.message = message;
  if (data !== undefined) body.data = data;
  res.set("Cache-Control", "no-store");
  return res.status(status).json(body);
}

function sendError(res, { message = "Terjadi kesalahan.", status = 400, details = undefined } = {}) {
  const body = { success: false, message };
  if (details !== undefined) body.details = details;
  return res.status(status).json(body);
}


class ApiError extends Error {
  constructor(message, status = 400, details = undefined) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

module.exports = { sendSuccess, sendError, ApiError };
