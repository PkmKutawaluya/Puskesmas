
const rateLimit = require("express-rate-limit");


const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Terlalu banyak permintaan dari alamat ini. Silakan coba lagi nanti.",
  },
});


const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Terlalu banyak permintaan. Silakan coba lagi dalam beberapa menit.",
  },
});

module.exports = { generalLimiter, writeLimiter };
