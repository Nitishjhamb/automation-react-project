import { processZapAlerts, groupAlertsBySeverity } from "../services/owaspZapService.js";

const getZapScanResults = (req, res) => {
  try {
    const { alerts, scanId, timestamp, summary } = req.body; 
    const processedAlerts = processZapAlerts(alerts);
    const groupedAlerts = groupAlertsBySeverity(processedAlerts);

    const responseData = {
      scanId,
      timestamp,
      summary,
      groupedAlerts, 
      totalAlerts: processedAlerts.length, 
    };

    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch OWASP ZAP scan results" });
  }
};


module.exports = { getZapScanResults };
