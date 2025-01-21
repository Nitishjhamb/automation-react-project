import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, RefreshCw, Lock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/Card";
import { gitGuardianService } from '../../services/gitGuardianService';

const GitGuardianCard = () => {
  const [scanResults, setScanResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchResults = async () => {
    try {
      setLoading(true);
      const results = await gitGuardianService.getScanResults();
      setScanResults(results);
      setError(null);
    } catch (err) {
      setError('Failed to fetch GitGuardian results');
      console.error('GitGuardian fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">GitGuardian</CardTitle>
        <Shield className="h-6 w-6 text-indigo-600" />
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
                <div className="text-sm text-gray-500 dark:text-gray-400">Active Secrets</div>
                <div className="text-2xl font-bold text-red-600">
                  {scanResults?.activeSecrets || 0}
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">Repositories Scanned</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {scanResults?.reposScanned || 0}
                </div>
              </div>
            </div>

            {/* Recent Incidents */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Recent Incidents</h3>
              <div className="space-y-2">
                {scanResults?.recentIncidents?.map((incident, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center space-x-3">
                      <Lock className="h-5 w-5 text-red-500" />
                      <div>
                        <div className="font-medium">{incident.type}</div>
                        <div className="text-sm text-gray-500">{incident.location}</div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{incident.detectedAt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3">
              <button
                onClick={fetchResults}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Refresh Scan
              </button>
              <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                View Details
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GitGuardianCard;