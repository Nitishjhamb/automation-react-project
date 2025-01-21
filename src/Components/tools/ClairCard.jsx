import React, { useState, useEffect } from "react";
import { Container, AlertTriangle, RefreshCw, Shield } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "automation-react-project\src\Components\Card.jsx";
import { clairService } from "../../services/clairService";

const ClairCard = () => {
  const [scanResults, setScanResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchResults = async () => {
    try {
      setLoading(true);
      const results = await clairService.getVulnerabilities("latest");
      setScanResults(results);
      setError(null);
    } catch (err) {
      setError("Failed to fetch Clair results");
      console.error("Clair fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const getSeverityColor = (severity) => {
    const colors = {
      Critical: "text-red-600",
      High: "text-orange-500",
      Medium: "text-yellow-500",
      Low: "text-blue-500",
    };
    return colors[severity] || "text-gray-500";
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Clair</CardTitle>
        <Container className="h-6 w-6 text-blue-600" />
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
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Total Vulnerabilities
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {scanResults?.totalVulnerabilities || 0}
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Critical Issues
                </div>
                <div className="text-2xl font-bold text-red-600">
                  {scanResults?.criticalCount || 0}
                </div>
              </div>
            </div>

            {/* Vulnerability Breakdown */}
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Vulnerability Breakdown
              </h3>
              <div className="space-y-2">
                {scanResults?.vulnerabilities?.map((vuln, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center space-x-3">
                      <Shield
                        className={`h-5 w-5 ${getSeverityColor(
                          vuln.severity
                        )}`}
                      />
                      <div>
                        <div className="font-medium">{vuln.type}</div>
                        <div className="text-sm text-gray-500">
                          {vuln.package}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`text-sm font-medium ${getSeverityColor(
                        vuln.severity
                      )}`}
                    >
                      {vuln.severity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3">
              <button
                onClick={fetchResults}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Scan Containers
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

export default ClairCard;
