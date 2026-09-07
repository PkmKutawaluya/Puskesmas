
const express = require("express");
const {
  getAllContent, getSection, putSection, uploadContentFile, getContentFile,
} = require("../controllers/contentController");
const { requireAdmin } = require("../middleware/authMiddleware");
const { writeLimiter } = require("../middleware/rateLimiter");
const { documentUpload } = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/", getAllContent);
router.post("/files", writeLimiter, requireAdmin, documentUpload, uploadContentFile);
router.get("/files/:id", getContentFile);
router.get("/:section", requireAdmin, getSection);
router.put("/:section", writeLimiter, requireAdmin, putSection);

module.exports = router;
