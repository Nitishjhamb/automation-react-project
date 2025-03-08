import express from "express";
import { getProjectVulnerabilities, getDependencyGraph, testRepository } from "../controllers/snykController.js";

const router = express.Router();

router.get("/project/:projectId/issues", getProjectVulnerabilities);
router.get("/project/:projectId/deps", getDependencyGraph);
router.post("/test", testRepository);

export default router;
