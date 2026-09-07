
const express = require("express");
const {
  uploadHealthData,
  getVisits,
  getDiseases,
  getSummary,
  getHealthStatus,
  listSources,
  deleteSource,
} = require("../controllers/healthController");
const { excelUpload } = require("../middleware/uploadMiddleware");
const { requireAdmin } = require("../middleware/authMiddleware");
const { writeLimiter } = require("../middleware/rateLimiter");

const router = express.Router();

// Hanya admin yang sudah login (requireAdmin) yang boleh mengunggah data.
// Urutan penting: cek token dulu (requireAdmin) sebelum memproses file (excelUpload).
router.post("/upload", writeLimiter, requireAdmin, excelUpload, uploadHealthData);
router.get("/visits", getVisits);
router.get("/diseases", getDiseases);
router.get("/summary", getSummary);
router.get("/sources", requireAdmin, listSources);
router.delete("/sources", writeLimiter, requireAdmin, deleteSource);
router.get("/status", getHealthStatus);

module.exports = router;
