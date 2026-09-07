
const express = require("express");
const { login } = require("../controllers/authController");
const rateLimit = require("express-rate-limit");

const router = express.Router();


const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Terlalu banyak percobaan login. Silakan coba lagi dalam 15 menit.",
  },
});

router.post("/login", loginLimiter, login);

module.exports = router;
