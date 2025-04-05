import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { ArrowUpRight, Shield } from "lucide-react";
import trivyData from "../../../client/public/trivy-report.json";

const TrivyCard = () => {
  const vulnerabilities = trivyData.Results[0]?.Vulnerabilities || [];
  const totalVulnerabilities = vulnerabilities.length;

  const severityCounts = vulnerabilities.reduce((acc, vuln) => {
    const severity = (vuln.Severity || "UNKNOWN").toLowerCase();
    acc[severity] = (acc[severity] || 0) + 1;
    return acc;
  }, {});

  const formatSeverityText = (severity) => {
    return severity.charAt(0).toUpperCase() + severity.slice(1).toLowerCase();
  };

  const getSeverityColor = (severity) => {
    severity = severity.toLowerCase();
    const colors = {
      critical: "bg-red-500 text-white",
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-blue-100 text-blue-800",
      unknown: "bg-gray-100 text-gray-800",
    };
    return colors[severity] || colors.unknown;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Trivy</CardTitle>
        <Shield className="h-6 w-6 text-blue-600" />
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg flex flex-col justify-center items-center">
              <div className="text-sm text-gray-500 dark:text-gray-400 h-10 flex items-center">
                Total Vulnerabilities
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {totalVulnerabilities || 0}
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg flex flex-col justify-center items-center">
              <div className="text-sm text-gray-500 dark:text-gray-400 h-10 flex items-center">
                High Severity
              </div>
              <div className="text-2xl font-bold text-red-600">
                {severityCounts.high || 0}
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg flex flex-col justify-center items-center">
              <div className="text-sm text-gray-500 dark:text-gray-400 h-10 flex items-center">
                Medium Severity
              </div>
              <div className="text-2xl font-bold text-yellow-600">
                {severityCounts.medium || 0}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-left">
              Latest Vulnerabilities
            </h3>
            <div className="space-y-3">
              {vulnerabilities.slice(0, 5).map((vuln, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-left truncate">
                      {vuln.PkgName}@{vuln.InstalledVersion}
                    </div>
                    <div className="text-sm text-gray-500 text-left truncate">
                      {vuln.Title}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${getSeverityColor(
                        vuln.Severity
                      )}`}
                    >
                      {formatSeverityText(vuln.Severity || "unknown")}
                    </span>
                    {vuln.PrimaryURL && (
                      <a
                        href={vuln.PrimaryURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0"
                      >
                        <ArrowUpRight className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrivyCard;
