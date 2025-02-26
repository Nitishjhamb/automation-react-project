import React from 'react';
import BuildStatus from './BuildStatus';
import SecurityMetrics from './SecurityMetrics';
import VulnerabilityChart from './VulnerabilityChart';
import PipelineGraphView from '../tools/PipelineGraphView';

const Dashboard = () => {

  return (
    <div className="min-h-screen p-6 transition-colors duration-200 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header with Theme Toggle */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Security Dashboard</h1>
        </div>
        <div className="mb-6">
          <BuildStatus />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <SecurityMetrics />
          <VulnerabilityChart />
        </div>
        <div className="mb-6">
          <PipelineGraphView />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
