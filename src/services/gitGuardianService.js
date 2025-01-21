const API_BASE_URL = process.env.REACT_APP_GITGUARDIAN_API_URL;
const API_KEY = process.env.REACT_APP_GITGUARDIAN_API_KEY;

const headers = {
  'Authorization': Bearer ${API_KEY},
  'Content-Type': 'application/json'
};

export const gitGuardianService = {
  async getScanResults() {
    try {
      const response = await fetch(${API_BASE_URL}/scans, {
        headers
      });
      if (!response.ok) throw new Error('Failed to fetch scan results');
      return await response.json();
    } catch (error) {
      console.error('GitGuardian API Error:', error);
      throw error;
    }
  },

  async getSecrets(repoId) {
    try {
      const response = await fetch(${API_BASE_URL}/repositories/${repoId}/secrets, {
        headers
      });
      if (!response.ok) throw new Error('Failed to fetch secrets');
      return await response.json();
    } catch (error) {
      console.error('GitGuardian API Error:', error);
      throw error;
    }
  },

  async initiateNewScan(repositoryUrl) {
    try {
      const response = await fetch(${API_BASE_URL}/scans, {
        method: 'POST',
        headers,
        body: JSON.stringify({ repository_url: repositoryUrl })
      });
      if (!response.ok) throw new Error('Failed to initiate scan');
      return await response.json();
    } catch (error) {
      console.error('GitGuardian API Error:', error);
      throw error;
    }
  }
};