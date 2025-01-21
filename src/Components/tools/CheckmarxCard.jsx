import React, { useState, useEffect } from "react";
import { Search, AlertTriangle, RefreshCw, Activity } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/Card";
import { checkmarxService } from "../../services/checkmarxService";

const CheckmarxCard = () => {
  const [scanResults, setScanResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchResults = async () => {
    try {
      setLoading(true);
      const results = await checkmarxService.getScanResults("latest");
      setScanResults(results);
      setError(null);
    } catch (err) {
      setError("Failed to fetch Checkmarx results");
      console.error("Checkmarx fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const getSeverityClass = (severity) => {
    const classes = {
      High: "text-red-600 bg-red-100",
      Medium: "text-yellow-600 bg-yellow-100",
      Low: "text-blue-600 bg-blue-100",
    };
    return classes[severity] || "text-gray-600 bg-gray-100";
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Checkmarx</CardTitle>
        <Search className="h-6 w-6 text-green-600" />
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center p-4">
            <RefreshCw className="h-6 w-6 animate-spin text-gray-400" />
          </div>
        ) : error ? (
          <div className="text-red-500 flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  High Risk
                </div>
                <div className="text-2xl font-bold text-red-600">
                  {scanResults?.highRisk || 0}
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Medium Risk
                </div>
                <div className="text-2xl font-bold text-yellow-600">
                  {scanResults?.mediumRisk || 0}
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Low Risk
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {scanResults?.lowRisk || 0}
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Files Scanned
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {scanResults?.filesScanned || 0}
                </div>
              </div>
            </div>

            {/* Recent Findings */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Recent Findings</h3>
              <div className="space-y-2">
                {scanResults?.findings?.map((finding, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center space-x-3">
                      <Activity className="h-5 w-5 text-green-500" />
                      <div>
                        <div className="font-medium">{finding.title}</div>
                        <div className="text-sm text-gray-500">
                          {finding.location}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getSeverityClass(
                        finding.severity
                      )}`}
                    >
                      {finding.severity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scan Progress */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">Scan Progress</span>
                <span className="text-sm font-medium">
                  {scanResults?.progress || 0}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-green-600 h-2.5 rounded-full"
                  style={{ width: `${scanResults?.progress || 0}%` }}
                ></div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3">
              <button
                onClick={fetchResults}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Start Scan
              </button>
              <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                View Report
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CheckmarxCard;
