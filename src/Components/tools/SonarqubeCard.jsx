import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../ui/Card";
import { FileWarning, Clock, Bug, ShieldX, AlertTriangle } from "lucide-react";
import sonarqubeData from "../../../client/public/sonarqube-report.json";

const severityColors = {
  BLOCKER: "text-red-600",
  CRITICAL: "text-orange-500",
  MAJOR: "text-yellow-500",
  MINOR: "text-blue-400",
  INFO: "text-gray-300",
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
    <Card className="p-6 shadow-lg bg-[#1B1E26] rounded-2xl border border-[#2A2E38] text-white">
      <CardContent>
        <div className="flex items-center space-x-4">
          <FileWarning className="text-red-500" size={26} />
          <div>
            <h2 className="text-lg font-semibold text-white">SonarQube Report</h2>
            <p className="text-sm text-gray-400">Last Updated: {reportDate}</p>
            <p className="text-sm text-blue-400">Project: {projectName}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-5">
          <div className="flex items-center space-x-2 bg-[#252A34] p-3 rounded-lg">
            <Clock className="text-yellow-400" size={20} />
            <span className="text-sm text-gray-300">Total Issues: {sonarqubeData.total}</span>
          </div>
          {Object.entries(issueCounts).map(([key, value]) => (
            value > 0 && (
              <div key={key} className="flex items-center space-x-2 bg-[#252A34] p-3 rounded-lg">
                <AlertTriangle className={`${severityColors[key]}`} size={20} />
                <span className="text-sm text-gray-300">
                  {key} Issues: {value}
                </span>
              </div>
            )
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SonarqubeCard;
