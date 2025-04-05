import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { FileWarning } from "lucide-react";
import sonarqubeData from "../../../client/public/sonarqube-report.json";

const severityColors = {
  BLOCKER: "bg-red-500 text-white",
  CRITICAL: "bg-red-100 text-red-800",
  MAJOR: "bg-yellow-100 text-yellow-800",
  MINOR: "bg-blue-100 text-blue-800",
  INFO: "bg-gray-100 text-gray-800",
  BUG: "bg-pink-100 text-pink-800",
  CODE_SMELL: "bg-purple-100 text-purple-800",
};

const SonarqubeCard = () => {
  const [reportDate, setReportDate] = useState("");

  useEffect(() => {
    if (sonarqubeData.issues.length > 0) {
      const latestIssueDate = new Date(sonarqubeData.issues[0].updateDate);
      setReportDate(latestIssueDate.toLocaleString());
    }
  }, []);

  const projectName = sonarqubeData.issues[0]?.project || "Unknown Project";
  const issueCounts = {
    BLOCKER: 0,
    CRITICAL: 0,
    MAJOR: 0,
    MINOR: 0,
    INFO: 0,
    BUG: 0,
    CODE_SMELL: 0,
  };

  sonarqubeData.issues.forEach((issue) => {
    if (issueCounts[issue.severity] !== undefined) {
      issueCounts[issue.severity]++;
    }
    if (issueCounts[issue.type] !== undefined) {
      issueCounts[issue.type]++;
    }
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">SonarQube</CardTitle>
        <FileWarning className="h-6 w-6 text-red-600" />
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400 h-10 flex items-center">
                Total Issues
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {sonarqubeData.total}
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg col-span-2 flex flex-col items-center">
              <div className="text-sm text-gray-500 dark:text-gray-400 h-10 flex items-center">
                Project
              </div>
              <div className="text-lg font-medium text-blue-600 dark:text-blue-400 truncate">
                {projectName}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Last Updated: {reportDate}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-left">
              Issue Breakdown
            </h3>
            <div className="space-y-3">
              {Object.entries(issueCounts).map(([key, value]) =>
                value > 0 ? (
                  <div
                    key={key}
                    className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-left truncate text-gray-900 dark:text-white">
                        {key}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full whitespace-nowrap ${
                          severityColors[key] || severityColors.INFO
                        }`}
                      >
                        {value}
                      </span>
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SonarqubeCard;
