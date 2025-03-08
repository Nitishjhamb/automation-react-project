import express from "express";
import {
    getVulnerabilities,
    getVulnerabilityById,
    getVulnerabilityStats,
    getVulnerabilitiesBySeverity,
    getSortedVulnerabilities
} from "../controllers/trivyController.js";

const router = express.Router();

router.get("/vulnerabilities", getVulnerabilities);
router.get("/vulnerabilities/:id", getVulnerabilityById);
router.get("/vulnerabilities/stats", getVulnerabilityStats);
router.get("/vulnerabilities/grouped", getVulnerabilitiesBySeverity);
router.get("/vulnerabilities/sorted", getSortedVulnerabilities);

export default router;
