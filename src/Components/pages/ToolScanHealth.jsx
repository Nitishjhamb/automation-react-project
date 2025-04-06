import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import snykReport from "../../../client/public/snyk-report.json";
import trivyReport from "../../../client/public/trivy-report.json";
import sonarqubeReport from "../../../client/public/sonarqube-report.json";

ChartJS.register(ArcElement, Tooltip, Legend);

const ToolScanHealth = () => {
  const snykVulns = snykReport.vulnerabilities?.length || 0;
  const trivyVulns = trivyReport.Results?.reduce(
    (acc, r) => acc + (r.Vulnerabilities?.length || 0),
    0
  );
  const sonarIssues = sonarqubeReport.issues?.length || 0;

  const data = {
    labels: ["Snyk", "Trivy", "SonarQube"],
    datasets: [
      {
        label: "Vulnerabilities",
        data: [snykVulns, trivyVulns, sonarIssues],
        backgroundColor: ["#f87171", "#60a5fa", "#34d399"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#6b7280",
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const toolCards = [
    {
      name: "Snyk",
      count: snykVulns,
      color: "text-red-500",
      bg: "bg-red-100",
    },
    {
      name: "Trivy",
      count: trivyVulns,
      color: "text-blue-500",
      bg: "bg-blue-100",
    },
    {
      name: "SonarQube",
      count: sonarIssues,
      color: "text-green-500",
      bg: "bg-green-100",
    },
  ];

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="border-b">
        <CardTitle className="text-xl font-bold">Tool Scan Health</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-6 py-6">
        <div className="md:w-1/2 h-64">
          <Doughnut data={data} options={options} />
        </div>
        <div className="md:w-1/2 flex flex-col gap-4">
          {toolCards.map((tool, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${tool.bg} flex items-center justify-between`}
            >
              <div className="font-semibold text-gray-700">{tool.name}</div>
              <div className={`text-xl font-bold ${tool.color}`}>
                {tool.count}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolScanHealth;
