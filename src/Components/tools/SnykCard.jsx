import React, { useState } from 'react';
import { Bug, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";

const SnykCard = ({ vulnerabilities }) => {
  const [data, setData] = useState(vulnerabilities || {
    totalDependencies: 0,
    totalVulnerabilities: 0,
    issues: [],
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Snyk</CardTitle>
        <Bug className="h-6 w-6 text-blue-600" />
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">Dependencies Scanned</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {data.totalDependencies}
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">Vulnerabilities Found</div>
              <div className="text-2xl font-bold text-red-600">
                {data.totalVulnerabilities}
              </div>
            </div>
          </div>

          {/* Vulnerability List */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Latest Vulnerabilities</h3>
            <div className="space-y-2">
              {data.issues.map((issue, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center space-x-3">
                    <Bug className="h-5 w-5 text-purple-500" />
                    <div>
                      <div className="font-medium">{issue.package}</div>
                      <div className="text-sm text-gray-500">{issue.title}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      issue.severity === 'High' ? 'bg-red-100 text-red-800' :
                      issue.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {issue.severity}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600" />
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

export default SnykCard;
