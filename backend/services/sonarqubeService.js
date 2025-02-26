const SONARQUBE_API_BASE_URL = import.meta.env.VITE_SONARQUBE_API_URL || 'http://localhost:9000/api';

export const sonarqubeService = {
    async getProjectMetrics(projectKey) {
        try {
            const response = await fetch(`${SONARQUBE_API_BASE_URL}/measures/component?component=${projectKey}&metricKeys=bugs,vulnerabilities,code_smells,coverage,duplicated_lines_density,security_hotspots`);
            if (!response.ok) throw new Error('Failed to fetch metrics');
            return await response.json();
        } catch (error) {
            console.error('Error fetching Sonarqube metrics:', error);
            throw error;
        }
    },
    async getQualityGateStatus(projectKey) {
        try {
            const response = await fetch(`${SONARQUBE_API_BASE_URL}/qualitygates/project_status?projectKey=${projectKey}`);
            if (!response.ok) throw new Error('Failed to fetch quality gate status');
            return await response.json();
        } catch (error) {
            console.error('Error fetching quality gate status:', error);
            throw error;
        }
    },
    async getIssuesSummary(projectKey) {
        try {
            const response = await fetch(`${SONARQUBE_API_BASE_URL}/issues/search?componentKeys=${projectKey}&facets=severities`);
            if (!response.ok) throw new Error('Failed to fetch issues');
            return await response.json();
        } catch (error) {
            console.error('Error fetching issues summary:', error);
            throw error;
        }
    },
    async getCoverageHistory(projectKey) {
        try {
            const response = await fetch(`${SONARQUBE_API_BASE_URL}/measures/search_history?component=${projectKey}&metrics=coverage`);
            if (!response.ok) throw new Error('Failed to fetch coverage history');
            return await response.json();
        } catch (error) {
            console.error('Error fetching coverage history:', error);
            throw error;
        }
    }
};