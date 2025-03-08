import axios from "axios";

const BASE_URL = "http://localhost:5000/api/snyk"; // Adjust as per your backend URL

export const snykService = {
  async getProjectVulnerabilities(projectId) {
    try {
      const response = await axios.get(`${BASE_URL}/project/${projectId}/issues`);
      return response.data;
    } catch (error) {
      console.error("Error fetching vulnerabilities:", error);
      throw error;
    }
  },

  async getDependencyGraph(projectId) {
    try {
      const response = await axios.get(`${BASE_URL}/project/${projectId}/deps`);
      return response.data;
    } catch (error) {
      console.error("Error fetching dependency graph:", error);
      throw error;
    }
  },

  async testRepository(repository) {
    try {
      const response = await axios.post(`${BASE_URL}/test`, { repository });
      return response.data;
    } catch (error) {
      console.error("Error testing repository:", error);
      throw error;
    }
  },
};
