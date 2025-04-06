import React from "react";
import ScanSummary from "./ScanSummary";
import SecurityMetrics from "./SecurityMetrics";
import VulnerabilityChart from "./VulnerabilityChart";
import ToolScanHealth from "./ToolScanHealth";

const Dashboard = () => {
  return (
    <div className="min-h-screen p-6 transition-colors duration-200 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header with Theme Toggle */}
        <div className="flex justify-center items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Security Dashboard
          </h1>
        </div>

        {/* Overview from all tools */}
        <div className="mb-6">
          <ScanSummary />
        </div>
        {/* Vulnerability stats + Security metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <SecurityMetrics />
          <VulnerabilityChart />
        </div>
        {/* Pipeline graph */}
        <div className="mb-6">
          <ToolScanHealth />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
