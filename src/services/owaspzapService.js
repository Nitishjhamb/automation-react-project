// owaspZapUtils.js

export const mockZapData = {
  scanId: "ZAP-SCAN-2024-001",
  timestamp: new Date().toISOString(),
  summary: {
    high: 3,
    medium: 7,
    low: 12,
    informational: 5
  },
  alerts: [
    {
      id: "ZAP-001",
      name: "Cross-Site Scripting (XSS)",
      risk: "High",
      confidence: "Medium",
      description: "Cross-site Scripting (XSS) is an attack technique that involves echoing attacker-supplied code into a user's browser instance.",
      solution: "Properly validate and encode all user input. Consider using security libraries/frameworks.",
      references: [
        "https://owasp.org/www-community/attacks/xss/",
        "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html"
      ],
      instances: [
        { url: "https://example.com/page1", method: "GET" },
        { url: "https://example.com/page2", method: "POST" }
      ]
    },
    {
      id: "ZAP-002",
      name: "SQL Injection",
      risk: "High",
      confidence: "High",
      description: "SQL injection may be possible. The application appears to be vulnerable to SQL injection attacks.",
      solution: "Use parameterized queries or stored procedures. Never build SQL statements using string concatenation.",
      references: [
        "https://owasp.org/www-community/attacks/SQL_Injection",
        "https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html"
      ],
      instances: [
        { url: "https://example.com/api/users", method: "GET" }
      ]
    }
  ]
};

export const processZapAlerts = (alerts) => {
  return alerts.map(alert => ({
    ...alert,
    riskLevel: calculateRiskLevel(alert.risk, alert.confidence),
    instanceCount: alert.instances.length
  }));
};

export const calculateRiskLevel = (risk, confidence) => {
  const riskScores = { High: 3, Medium: 2, Low: 1, Informational: 0 };
  const confidenceScores = { High: 1, Medium: 0.75, Low: 0.5 };
  
  return (riskScores[risk] || 0) * (confidenceScores[confidence] || 0.5);
};

export const groupAlertsBySeverity = (alerts) => {
  return alerts.reduce((acc, alert) => {
    const risk = alert.risk.toLowerCase();
    if (!acc[risk]) acc[risk] = [];
    acc[risk].push(alert);
    return acc;
  }, {});
};