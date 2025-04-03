import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { AlertCircle, AlertTriangle, Bug, Shield, Globe, Server } from "lucide-react";

const NiktoCard = ({ scanResults }) => {
  const [expandedAlert, setExpandedAlert] = useState(null);

  const defaultData = {
    scanId: "N/A",
    timestamp: new Date().toISOString(),
    serverInfo: {
      host: "Unknown",
      ip: "N/A",
      webServer: "N/A",
      ssl: "N/A",
    },
    alerts: [],
    summary: {
      high: 0,
      medium: 0,
      low: 0,
      informational: 0,
    },
    headers: [],
  };

  const data = scanResults || defaultData;

  const getSeverityIcon = (risk) => {
    switch (risk.toLowerCase()) {
      case "high":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "medium":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case "low":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Bug className="h-5 w-5 text-blue-500" />;
    }
  };

  const getSeverityColor = (risk) => {
    const colors = {
      high: "text-red-500",
      medium: "text-orange-500",
      low: "text-yellow-500",
      informational: "text-blue-500",
    };
    return colors[risk.toLowerCase()] || "text-gray-500";
  };

  return (
    <Card className="col-span-3 w-full shadow-lg">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-green-600" />
            <CardTitle>Nikto Scan Results</CardTitle>
          </div>
          <div className="text-sm text-gray-500 dark:text-white">Scan ID: {data.scanId}</div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        {/* Server Information */}
        <div className="p-4 mb-6 dark:bg-gray-800 rounded-lg">
          <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
            <Server className="h-5 w-5 text-gray-600" /> Server Information
          </h3>
          <p className="text-sm text-gray-500 dark:text-white"><strong>Host:</strong> {data.serverInfo.host}</p>
          <p className="text-sm text-gray-500 dark:text-white"><strong>IP:</strong> {data.serverInfo.ip}</p>
          <p className="ttext-sm text-gray-500 dark:text-white"><strong>Web Server:</strong> {data.serverInfo.webServer}</p>
          <p className="text-sm text-gray-500 dark:text-white"><strong>SSL Enabled:</strong> {data.serverInfo.ssl ? "Yes" : "No"}</p>
        </div>

        {/* Summary Section */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {Object.entries(data.summary).map(([severity, count]) => (
            <div key={severity} className="text-center p-4 bg-gray-50 rounded-lg">
              <p className={`font-bold uppercase ${getSeverityColor(severity)} mb-2`}>{severity}</p>
              <p className="text-2xl font-bold dark:text-black">{count}</p>
              <p className="text-sm text-gray-500">Alerts</p>
            </div>
          ))}
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {data.alerts.map((alert, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => setExpandedAlert(expandedAlert === index ? null : index)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getSeverityIcon(alert.risk)}
                  <h3 className="font-medium">{alert.name}</h3>
                </div>
                <p className={`font-bold ${getSeverityColor(alert.risk)}`}>{alert.risk}</p>
              </div>

              {expandedAlert === index && (
                <div className="mt-4 space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-gray-700">Description:</p>
                    <p className="text-gray-600">{alert.description}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Solution:</p>
                    <p className="text-gray-600">{alert.solution}</p>
                  </div>
                  {alert.references && (
                    <div>
                      <p className="font-medium text-gray-700">References:</p>
                      <ul className="list-disc list-inside">
                        {alert.references.map((ref, i) => (
                          <li key={i} className="text-blue-600 truncate">{ref}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Security Headers Issues */}
        {data.headers.length > 0 && (
          <div className="mt-6">
            <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
              <Globe className="h-5 w-5 text-gray-600" /> Security Headers Issues
            </h3>
            <ul className="list-disc list-inside bg-gray-50 p-4 rounded-lg">
              {data.headers.map((header, index) => (
                <li key={index} className="text-sm text-gray-700">
                  <strong>{header.name}:</strong> {header.issue}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NiktoCard;
