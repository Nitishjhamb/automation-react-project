import { sonarqubeService } from "../services/sonarqubeService.js";

export const getProjectMetrics = async (req, res) => {
    try {
        const { projectKey } = req.params;
        const data = await sonarqubeService.getProjectMetrics(projectKey);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Sonarqube metrics" });
    }
};

export const getQualityGateStatus = async (req, res) => {
    try {
        const { projectKey } = req.params;
        const data = await sonarqubeService.getQualityGateStatus(projectKey);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch quality gate status" });
    }
};

export const getIssuesSummary = async (req, res) => {
    try {
        const { projectKey } = req.params;
        const data = await sonarqubeService.getIssuesSummary(projectKey);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch issues summary" });
    }
};

export const getCoverageHistory = async (req, res) => {
    try {
        const { projectKey } = req.params;
        const data = await sonarqubeService.getCoverageHistory(projectKey);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch coverage history" });
    }
};
