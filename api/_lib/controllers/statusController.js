
const { sendSuccess } = require("../utils/apiResponse");

function getStatus(req, res) {
  return sendSuccess(res, {
    message: "Backend UPTD Puskesmas Kutawaluya berjalan normal.",
    data: {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime_seconds: Math.round(process.uptime()),
    },
  });
}

module.exports = { getStatus };
