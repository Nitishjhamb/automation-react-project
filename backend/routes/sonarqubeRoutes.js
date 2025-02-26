import express from "express";
import { getProjectMetrics, getQualityGateStatus, getIssuesSummary, getCoverageHistory } from "../controllers/sonarqubeController.js";

const router = express.Router();

router.get("/metrics/:projectKey", getProjectMetrics);
router.get("/quality-gate/:projectKey", getQualityGateStatus);
router.get("/issues-summary/:projectKey", getIssuesSummary);
router.get("/coverage-history/:projectKey", getCoverageHistory);

export default router;
