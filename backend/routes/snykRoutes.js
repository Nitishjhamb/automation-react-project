const express = require("express");
const snykController = require("../controllers/snykController");

const router = express.Router();

router.get("/snyk/project/:projectId/issues", snykController.getProjectVulnerabilities);

router.get("/snyk/project/:projectId/deps", snykController.getDependencyGraph);

router.post("/snyk/test", snykController.testRepository);

module.exports = router;
