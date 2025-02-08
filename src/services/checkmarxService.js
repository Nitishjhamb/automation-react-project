const API_BASE_URL = import.meta.env.VITE_CHECKMARX_API_URL;
const API_KEY = import.meta.env.VITE_CHECKMARX_API_KEY;

const headers = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json'
};

export const checkmarxService = {
  async createScan(projectId) {
    try {
      const response = await fetch(`${API_BASE_URL}/scans`, { 
        method: 'POST',
        headers,
        body: JSON.stringify({ projectId })
      });
      if (!response.ok) throw new Error('Failed to create scan');
      return await response.json();
    } catch (error) {
      console.error('Checkmarx API Error:', error);
      throw error;
    }
  },

  async getScanResults(scanId) {
    try {
      const response = await fetch(`${API_BASE_URL}/scans/${scanId}/results`, {  
        headers
      });
      if (!response.ok) throw new Error('Failed to fetch scan results');
      return await response.json();
    } catch (error) {
      console.error('Checkmarx API Error:', error);
      throw error;
    }
  },

  async getProjectStats(projectId) {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${projectId}/statistics`,{
        headers
      });
      if (!response.ok) throw new Error('Failed to fetch project statistics');
      return await response.json();
    } catch (error) {
      console.error('Checkmarx API Error:', error);
      throw error;
    }
  }
};