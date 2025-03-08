import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const SNYK_API_BASE_URL = process.env.VITE_SNYK_API_URL;
const SNYK_API_TOKEN = process.env.VITE_SNYK_API_TOKEN;

const snykHeaders = {
  Authorization: `token ${SNYK_API_TOKEN}`,
  "Content-Type": "application/json",
};

export async function getProjectVulnerabilities(req, res) {
  try {
    const { projectId } = req.params;
    const response = await axios.get(`${SNYK_API_BASE_URL}/project/${projectId}/issues`, {
      headers: snykHeaders,
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch vulnerabilities", details: error.message });
  }
}

export async function getDependencyGraph(req, res) {
  try {
    const { projectId } = req.params;
    const response = await axios.get(`${SNYK_API_BASE_URL}/project/${projectId}/deps`, {
      headers: snykHeaders,
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch dependency graph", details: error.message });
  }
}

export async function testRepository(req, res) {
  try {
    const { repository } = req.body;
    const response = await axios.post(`${SNYK_API_BASE_URL}/test`, { repository }, { headers: snykHeaders });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to test repository", details: error.message });
  }
}
