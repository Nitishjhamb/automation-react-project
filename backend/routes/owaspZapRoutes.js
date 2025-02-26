const express = require("express");
const router = express.Router();
const { getZapScanResults } = require("../controllers/owaspZapController");

// Define route to fetch OWASP ZAP scan results
router.get("/zap-scan", getZapScanResults);

module.exports = router;
