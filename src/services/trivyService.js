// trivyUtils.js

export const mockTrivyData = {
  id: "CVE-2024-1234",
  severity: "CRITICAL",
  title: "Remote Code Execution Vulnerability in OpenSSL",
  packageName: "openssl",
  installedVersion: "1.1.1k",
  fixedVersion: "1.1.1l",
  description: "A buffer overflow vulnerability in OpenSSL's TLS implementation could allow remote attackers to execute arbitrary code or cause a denial of service via carefully crafted TLS messages.",
  references: [
    "https://nvd.nist.gov/vuln/detail/CVE-2024-1234",
    "https://www.openssl.org/news/secadv/20240131.txt",
    "https://security.snyk.io/vuln/SNYK-LINUX-OPENSSL-1234567"
  ],
  cvss: {
    score: 9.8,
    vector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
  },
  publishedDate: "2024-01-15",
  lastModifiedDate: "2024-01-31"
};

export const mockMultipleVulnerabilities = [
  mockTrivyData,
  {
    id: "CVE-2024-5678",
    severity: "HIGH",
    title: "SQL Injection in PostgreSQL Driver",
    packageName: "pg",
    installedVersion: "8.7.1",
    fixedVersion: "8.7.2",
    description: "The PostgreSQL driver contains a SQL injection vulnerability that could allow attackers to execute arbitrary SQL commands.",
    references: [
      "https://nvd.nist.gov/vuln/detail/CVE-2024-5678",
      "https://github.com/brianc/node-postgres/security/advisories/2024-01"
    ],
    cvss: {
      score: 8.2,
      vector: "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H"
    },
    publishedDate: "2024-01-20",
    lastModifiedDate: "2024-01-25"
  },
  {
    id: "CVE-2024-9012",
    severity: "MEDIUM",
    title: "Information Disclosure in Express.js",
    packageName: "express",
    installedVersion: "4.17.1",
    fixedVersion: "4.17.2",
    description: "Express.js contains an information disclosure vulnerability that could expose sensitive application data.",
    references: [
      "https://nvd.nist.gov/vuln/detail/CVE-2024-9012"
    ],
    cvss: {
      score: 6.5,
      vector: "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:L/A:N"
    },
    publishedDate: "2024-01-10",
    lastModifiedDate: "2024-01-12"
  }
];

// Helper function to process CVSS scores
export const processCVSSScore = (score) => {
  return {
    value: score,
    severity: getCVSSSeverity(score),
    color: getCVSSColor(score)
  };
};

// Get severity level based on CVSS score
export const getCVSSSeverity = (score) => {
  if (score >= 9.0) return "CRITICAL";
  if (score >= 7.0) return "HIGH";
  if (score >= 4.0) return "MEDIUM";
  if (score > 0.0) return "LOW";
  return "NONE";
};

// Get color based on CVSS score
export const getCVSSColor = (score) => {
  if (score >= 9.0) return "red";
  if (score >= 7.0) return "orange";
  if (score >= 4.0) return "yellow";
  if (score > 0.0) return "blue";
  return "gray";
};

// Format date to locale string
export const formatDate = (dateString) => {
  if (dateString === "N/A") return dateString;
  try {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (e) {
    return dateString;
  }
};

// Calculate vulnerability age in days
export const getVulnerabilityAge = (publishedDate) => {
  if (publishedDate === "N/A") return null;
  try {
    const published = new Date(publishedDate);
    const now = new Date();
    const diffTime = Math.abs(now - published);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  } catch (e) {
    return null;
  }
};

// Sort vulnerabilities by severity and CVSS score
export const sortVulnerabilities = (vulnerabilities) => {
  const severityOrder = {
    CRITICAL: 4,
    HIGH: 3,
    MEDIUM: 2,
    LOW: 1,
    UNKNOWN: 0
  };

  return [...vulnerabilities].sort((a, b) => {
    // First sort by severity
    const severityDiff = severityOrder[b.severity] - severityOrder[a.severity];
    if (severityDiff !== 0) return severityDiff;
    
    // Then by CVSS score
    return b.cvss.score - a.cvss.score;
  });
};

// Group vulnerabilities by severity
export const groupVulnerabilities = (vulnerabilities) => {
  return vulnerabilities.reduce((acc, vuln) => {
    const severity = vuln.severity.toUpperCase();
    if (!acc[severity]) acc[severity] = [];
    acc[severity].push(vuln);
    return acc;
  }, {});
};

// Generate vulnerability statistics
export const generateVulnerabilityStats = (vulnerabilities) => {
  const stats = {
    total: vulnerabilities.length,
    bySeverity: {
      CRITICAL: 0,
      HIGH: 0,
      MEDIUM: 0,
      LOW: 0,
      UNKNOWN: 0
    },
    fixable: 0,
    averageCVSS: 0
  };

  vulnerabilities.forEach(vuln => {
    // Count by severity
    stats.bySeverity[vuln.severity]++;
    
    // Count fixable vulnerabilities
    if (vuln.fixedVersion !== "N/A") {
      stats.fixable++;
    }

    // Sum CVSS scores
    stats.averageCVSS += vuln.cvss.score;
  });

  // Calculate average CVSS score
  stats.averageCVSS = stats.total > 0 
    ? (stats.averageCVSS / stats.total).toFixed(1) 
    : 0;

  return stats;
};

export default {
  mockTrivyData,
  mockMultipleVulnerabilities,
  processCVSSScore,
  getCVSSSeverity,
  getCVSSColor,
  formatDate,
  getVulnerabilityAge,
  sortVulnerabilities,
  groupVulnerabilities,
  generateVulnerabilityStats
};