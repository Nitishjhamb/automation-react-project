const SNYK_API_BASE_URL = import.meta.env.VITE_SNYK_API_URL;
const SNYK_API_TOKEN = import.meta.env.VITE_SNYK_API_TOKEN;
const JENKINS_API_BASE_URL = import.meta.env.VITE_JENKINS_API_URL;
const JENKINS_USER = import.meta.env.VITE_JENKINS_USER;
const JENKINS_API_TOKEN = import.meta.env.VITE_JENKINS_API_TOKEN;

const snykHeaders = {
  "Authorization": `token ${SNYK_API_TOKEN}`,
  "Content-Type": "application/json",
};

const jenkinsHeaders = {
  "Authorization": `Basic ${btoa(`${JENKINS_USER}:${JENKINS_API_TOKEN}`)}`,
  "Content-Type": "application/json",
};

export const snykService = {
  async getProjectVulnerabilities(projectId) {
    try {
      const response = await fetch(`${API_BASE_URL}/project/${projectId}/issues`, {
        headers
      });
      if (!response.ok) throw new Error('Failed to fetch vulnerabilities');
      return await response.json();
    } catch (error) {
      console.error('Snyk API Error:', error);
      throw error;
    }
  },

  async getDependencyGraph(projectId) {
    try {
      const response = await fetch(`${API_BASE_URL}/project/${projectId}/deps`, {
        headers
      });
      if (!response.ok) throw new Error('Failed to fetch dependency graph');
      return await response.json();
    } catch (error) {
      console.error('Snyk API Error:', error);
      throw error;
    }
  },

  async testRepository(repoUrl) {
    try {
      const response = await fetch(`${API_BASE_URL}/test`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ repository: repoUrl })
      });
      if (!response.ok) throw new Error('Failed to test repository');
      return await response.json();
    } catch (error) {
      console.error('Snyk API Error:', error);
      throw error;
    }
  }
};
