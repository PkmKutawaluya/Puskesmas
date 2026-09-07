
const express = require("express");
const { createComplaint } = require("../controllers/complaintController");
const { attachmentUpload } = require("../middleware/uploadMiddleware");
const { writeLimiter } = require("../middleware/rateLimiter");

const router = express.Router();


router.post("/", writeLimiter, attachmentUpload, createComplaint);

module.exports = router;
