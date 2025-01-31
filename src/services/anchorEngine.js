// anchoreUtils.js

export const mockAnchoreData = {
    imageId: "sha256:a1b2c3d4e5f6...",
    repository: "myapp/backend",
    tag: "v1.2.3",
    timestamp: new Date().toISOString(),
    vulnerabilities: [
      {
        id: "CVE-2024-1234",
        severity: "CRITICAL",
        packageName: "openssl",
        currentVersion: "1.1.1k",
        fixedVersion: "1.1.1l",
        description: "Buffer overflow vulnerability in OpenSSL...",
        references: [
          "https://nvd.nist.gov/vuln/detail/CVE-2024-1234",
          "https://security.openssl.org/..."
        ]
      },
      {
        id: "CVE-2024-5678",
        severity: "HIGH",
        packageName: "nodejs",
        currentVersion: "14.17.0",
        fixedVersion: "14.17.1",
        description: "Remote code execution vulnerability in Node.js...",
        references: [
          "https://nvd.nist.gov/vuln/detail/CVE-2024-5678"
        ]
      }
    ],
    policies: [
      {
        name: "Security Policy",
        status: "fail",
        rules: [
          {
            name: "No Critical Vulnerabilities",
            status: "fail",
            description: "Image contains critical vulnerabilities"
          },
          {
            name: "Required Labels",
            status: "pass",
            description: "All required labels are present"
          }
        ]
      }
    ],
    summary: {
      critical: 2,
      high: 5,
      medium: 10,
      low: 15,
      negligible: 3,
      unknown: 0
    }
  };
  
  export const processVulnerabilities = (vulnerabilities) => {
    return vulnerabilities.map(vuln => ({
      ...vuln,
      riskScore: calculateRiskScore(vuln.severity),
      hasfix: Boolean(vuln.fixedVersion),
      age: calculateVulnerabilityAge(vuln.publishedDate)
    }));
  };
  
  export const calculateRiskScore = (severity) => {
    const scores = {
      CRITICAL: 5,
      HIGH: 4,
      MEDIUM: 3,
      LOW: 2,
      NEGLIGIBLE: 1,
      UNKNOWN: 0
    };
    return scores[severity] || 0;
  };
  
  export const calculateVulnerabilityAge = (publishedDate) => {
    if (!publishedDate) return null;
    const ageInDays = Math.floor(
      (new Date() - new Date(publishedDate)) / (1000 * 60 * 60 * 24)
    );
    return ageInDays;
  };
  
  export const groupVulnerabilities = (vulnerabilities) => {
    return vulnerabilities.reduce((acc, vuln) => {
      const severity = vuln.severity.toLowerCase();
      if (!acc[severity]) acc[severity] = [];
      acc[severity].push(vuln);
      return acc;
    }, {});
  };
  
  export const analyzePolicyCompliance = (policies) => {
    const total = policies.reduce((acc, policy) => {
      acc.total++;
      if (policy.status === 'pass') acc.passed++;
      return acc;
    }, { total: 0, passed: 0 });
  
    return {
      ...total,
      complianceRate: (total.passed / total.total) * 100,
      compliant: total.passed === total.total
    };
  };
  
  export const generateVulnerabilityReport = (data) => {
    const vulnerabilities = processVulnerabilities(data.vulnerabilities);
    const grouped = groupVulnerabilities(vulnerabilities);
    const compliance = analyzePolicyCompliance(data.policies);
  
    return {
      timestamp: data.timestamp,
      imageId: data.imageId,
      summary: data.summary,
      groupedVulnerabilities: grouped,
      compliance,
      riskLevel: calculateOverallRiskLevel(data.summary),
      recommendations: generateRecommendations(vulnerabilities)
    };
  };
  
  export const calculateOverallRiskLevel = (summary) => {
    const weights = {
      critical: 10,
      high: 5,
      medium: 3,
      low: 1,
      negligible: 0.1
    };
  
    const score = Object.entries(summary).reduce((acc, [severity, count]) => {
      return acc + (weights[severity] || 0) * count;
    }, 0);
  
    if (score > 50) return 'CRITICAL';
    if (score > 30) return 'HIGH';
    if (score > 15) return 'MEDIUM';
    if (score > 5) return 'LOW';
    return 'NEGLIGIBLE';
  };
  
  export const generateRecommendations = (vulnerabilities) => {
    const criticalVulns = vulnerabilities.filter(v => v.severity === 'CRITICAL');
    const fixableVulns = vulnerabilities.filter(v => v.fixedVersion);
  
    return [
      criticalVulns.length > 0 && 'Address critical vulnerabilities immediately',
      fixableVulns.length > 0 && 'Update packages with available fixes',
      'Regular security scans recommended'
    ].filter(Boolean);
  };