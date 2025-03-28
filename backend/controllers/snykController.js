const snykService = require("../services/snykService");

const snykController = {
  async getProjectVulnerabilities(req, res) {
    try {
      const { projectId } = req.params;
      const data = await snykService.getProjectVulnerabilities(projectId);
      res.status(200).json(data);
    } catch (error) {
      res.status(error.response?.status || 500).json({
        error: "Failed to fetch vulnerabilities",
        details: error.response?.data || error.message,
      });
    }
  },

  async getDependencyGraph(req, res) {
    try {
      const { projectId } = req.params;
      const data = await snykService.getDependencyGraph(projectId);
      res.status(200).json(data);
    } catch (error) {
      res.status(error.response?.status || 500).json({
        error: "Failed to fetch dependency graph",
        details: error.response?.data || error.message,
      });
    }
  },

  async testRepository(req, res) {
    try {
      const { repoUrl } = req.body;
      if (!repoUrl) {
        return res.status(400).json({ error: "Repository URL is required" });
      }

      const data = await snykService.testRepository(repoUrl);
      res.status(200).json(data);
    } catch (error) {
      res.status(error.response?.status || 500).json({
        error: "Failed to test repository",
        details: error.response?.data || error.message,
      });
    }
  },
};

module.exports = snykController;
