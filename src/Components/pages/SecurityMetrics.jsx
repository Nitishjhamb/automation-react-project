import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { Shield, AlertTriangle, Lock } from "lucide-react";

const SecurityMetrics = () => {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const sonarqubeData = await fetch(
          "../../../client/public/sonarqube-report.json"
        ).then((res) => res.json());
        const trivyData = await fetch(
          "../../../client/public/trivy-report.json"
        ).then((res) => res.json());
        const snykData = await fetch(
          "../../../client/public/snyk-report.json"
        ).then((res) => res.json());

        const totalIssues = sonarqubeData.issues.length;
        const securityScore = Math.max(0, 100 - totalIssues * 2);

        const vulnerabilities = trivyData.Results[0]?.Vulnerabilities || [];
        const vulnCount = vulnerabilities.length;

        // const vulnCount = trivyData.vulnerabilities?.length || 0;

        const totalDependencies = snykData.dependencyCount;

        // Combine metrics from all reports
        const combinedMetrics = [
          {
            id: 1,
            name: "Security Score",
            value: `${securityScore}/100`,
            change: "+5",
            icon: Shield,
            color: "text-green-500",
            details: {
              bugs: sonarqubeData.issues.filter((i) => i.type === "BUG").length,
              vulnerabilities: sonarqubeData.issues.filter(
                (i) => i.type === "VULNERABILITY"
              ).length,
              codeSmells: sonarqubeData.issues.filter(
                (i) => i.type === "CODE_SMELL"
              ).length,
            },
          },
          {
            id: 2,
            name: "Open Vulnerabilities",
            value: vulnCount,
            change: "-3",
            icon: AlertTriangle,
            color: "text-yellow-500",
            details: {
              critical:
                trivyData.vulnerabilities?.filter(
                  (v) => v.severity === "CRITICAL"
                ).length || 0,
              high:
                trivyData.vulnerabilities?.filter((v) => v.severity === "HIGH")
                  .length || 0,
            },
          },
          {
            id: 3,
            name: "Dependencies Updated",
            value: totalDependencies,
            change: "+2%",
            icon: Lock,
            color: "text-blue-500",
          },
        ];

        setMetrics(combinedMetrics);
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Security Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 ">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            const isPositive = metric.change.startsWith("+");

            return (
              <div
                key={metric.id}
                className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
              >
                <div
                  className={`p-3 rounded-full ${metric.color} bg-opacity-10 mr-4`}
                >
                  <Icon className={`h-6 w-6 ${metric.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {metric.name}
                  </h3>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {metric.value}
                    </p>
                    <span
                      className={`ml-2 text-sm font-medium ${
                        isPositive
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {metric.change}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityMetrics;
