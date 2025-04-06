import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import snykReport from "../../../client/public/snyk-report.json";
import trivyReport from "../../../client/public/trivy-report.json";
import sonarqubeReport from "../../../client/public/sonarqube-report.json";

const getStatusIcon = (hasVulns) => {
  if (hasVulns === "critical")
    return <XCircle className="h-5 w-5 text-red-500" />;
  if (hasVulns === "warning")
    return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
  return <CheckCircle className="h-5 w-5 text-green-500" />;
};
const getSeverityStatus = (critical, high) => {
  if (critical > 0) return "critical";
  if (high > 0) return "warning";
  return "success";
};

const ScanSummary = () => {
  const snykVulns = snykReport.vulnerabilities || [];
  const trivyVulns = trivyReport.Results?.[0]?.Vulnerabilities || [];
  const sonarIssues = sonarqubeReport.issues || [];

  const tools = [
    {
      id: 1,
      name: "Snyk",
      status: getSeverityStatus(
        snykVulns.filter((v) => v.severity === "critical").length,
        snykVulns.filter((v) => v.severity === "high").length
      ),
      issues: snykVulns.length,
    },
    {
      id: 2,
      name: "Trivy",
      status: getSeverityStatus(
        trivyVulns.filter((v) => v.Severity === "CRITICAL").length,
        trivyVulns.filter((v) => v.Severity === "HIGH").length
      ),
      issues: trivyVulns.length,
    },
    {
      id: 3,
      name: "SonarQube",
      status: getSeverityStatus(
        sonarIssues.filter((i) => i.severity === "CRITICAL").length,
        sonarIssues.filter(
          (i) => i.severity === "MAJOR" || i.severity === "BLOCKER"
        ).length
      ),
      issues: sonarIssues.length,
    },
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Scan Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="py-4 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                {getStatusIcon(tool.status)}
                <div>
                  <div className="font-medium dark:text-white">{tool.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {tool.issues} issue(s) detected
                  </div>
                </div>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Status:{" "}
                {tool.status === "success"
                  ? "Clean"
                  : tool.status === "warning"
                  ? "Warnings"
                  : "Critical"}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScanSummary;
