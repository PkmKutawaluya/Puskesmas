
const express = require("express");
const { createSurvey, getSatisfaction } = require("../controllers/surveyController");
const { writeLimiter } = require("../middleware/rateLimiter");

const router = express.Router();

router.post("/", writeLimiter, createSurvey);
router.get("/satisfaction", getSatisfaction);

module.exports = router;
