const processZapAlerts = (alerts) => {
  return alerts.map((alert) => ({
    ...alert,
    riskLevel: calculateRiskLevel(alert.risk, alert.confidence),
    instanceCount: alert.instances.length,
  }));
};

const calculateRiskLevel = (risk, confidence) => {
  const riskScores = { High: 3, Medium: 2, Low: 1, Informational: 0 };
  const confidenceScores = { High: 1, Medium: 0.75, Low: 0.5 };

  return (riskScores[risk] || 0) * (confidenceScores[confidence] || 0.5);
};

const groupAlertsBySeverity = (alerts) => {
  return alerts.reduce((acc, alert) => {
    const risk = alert.risk.toLowerCase();
    if (!acc[risk]) acc[risk] = [];
    acc[risk].push(alert);
    return acc;
  }, {});
};

module.exports = { processZapAlerts, groupAlertsBySeverity, calculateRiskLevel };

