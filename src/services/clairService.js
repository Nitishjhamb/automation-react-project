const API_BASE_URL = process.env.REACT_APP_CLAIR_API_URL;

export const clairService = {
  async analyzeImage(imageUrl) {
    try {
      const response = await fetch(${API_BASE_URL}/analyze, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image_url: imageUrl })
      });
      if (!response.ok) throw new Error('Failed to analyze image');
      return await response.json();
    } catch (error) {
      console.error('Clair API Error:', error);
      throw error;
    }
  },

  async getVulnerabilities(imageId) {
    try {
      const response = await fetch(${API_BASE_URL}/vulnerabilities/${imageId});
      if (!response.ok) throw new Error('Failed to fetch vulnerabilities');
      return await response.json();
    } catch (error) {
      console.error('Clair API Error:', error);
      throw error;
    }
  },

  async getImageReport(imageId) {
    try {
      const response = await fetch(${API_BASE_URL}/report/${imageId});
      if (!response.ok) throw new Error('Failed to fetch image report');
      return await response.json();
    } catch (error) {
      console.error('Clair API Error:', error);
      throw error;
    }
  }
};