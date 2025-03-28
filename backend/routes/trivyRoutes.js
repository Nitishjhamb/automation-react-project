const express = require("express");
const router = express.Router();
const trivyController = require("../controllers/trivyController");

router.get("/vulnerabilities", trivyController.getVulnerabilities);
router.get("/vulnerabilities/:id", trivyController.getVulnerabilityById);
router.get("/vulnerabilities/stats", trivyController.getVulnerabilityStats);
router.get("/vulnerabilities/grouped", trivyController.getVulnerabilitiesBySeverity);
router.get("/vulnerabilities/sorted", trivyController.getSortedVulnerabilities);

module.exports = router;
