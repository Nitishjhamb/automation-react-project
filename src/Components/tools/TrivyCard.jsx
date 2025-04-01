import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { AlertCircle, CheckCircle, Clock, Shield } from "lucide-react";

const TrivyCard = ({ vulnerability }) => {
  // Default data structure if no vulnerability prop is passed
  const defaultVulnerability = {
    id: "N/A",
    severity: "UNKNOWN",
    title: "No vulnerability information",
    packageName: "N/A",
    installedVersion: "N/A",
    fixedVersion: "N/A",
    description: "No description available",
    references: [],
    cvss: {
      score: 0,
      vector: "N/A",
    },
    publishedDate: "N/A",
    lastModifiedDate: "N/A",
  };

  const data = vulnerability || defaultVulnerability;

  // Function to determine severity badge color
  const getSeverityColor = (severity) => {
    const colors = {
      CRITICAL: "bg-red-500",
      HIGH: "bg-orange-500",
      MEDIUM: "bg-yellow-500",
      LOW: "bg-blue-500",
      UNKNOWN: "bg-gray-500",
    };
    return colors[severity] || colors.UNKNOWN;
  };

  return (
    <Card className="w-full max-w-2xl shadow-lg hover:shadow-xl transition-shadow duration-200">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <CardTitle className="text-lg font-bold">{data.id}</CardTitle>
          </div>
          {/* <Badge className={`${getSeverityColor(data.severity)} text-white`}>
            {data.severity}
          </Badge> */}
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        {/* Title and Description */}
        <div>
          <h3 className="font-semibold text-lg mb-2">{data.title}</h3>
          <p className="text-gray-600">{data.description}</p>
        </div>

        {/* Package Information */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Package</p>
            <p className="font-medium">{data.packageName}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">
              Installed Version
            </p>
            <p className="font-medium">{data.installedVersion}</p>
          </div>
        </div>

        {/* CVSS Score */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">CVSS Score</p>
              <p className="font-bold text-lg">{data.cvss.score.toFixed(1)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Vector</p>
              <p className="font-mono text-sm">{data.cvss.vector}</p>
            </div>
          </div>
        </div>

        {/* Fix Information */}
        <div className="border-t pt-4">
          <div className="flex items-center gap-2">
            {data.fixedVersion !== "N/A" ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-500" />
                <p>Fixed in version: {data.fixedVersion}</p>
              </>
            ) : (
              <>
                <AlertCircle className="h-5 w-5 text-red-500" />
                <p>No fix available</p>
              </>
            )}
          </div>
        </div>

        {/* Timestamps */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>Published: {data.publishedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>Last Modified: {data.lastModifiedDate}</span>
          </div>
        </div>

        {/* References */}
        {data.references && data.references.length > 0 && (
          <div className="border-t pt-4">
            <p className="text-sm font-medium text-gray-500 mb-2">References</p>
            <ul className="list-disc list-inside space-y-1">
              {data.references.map((ref, index) => (
                <li
                  key={index}
                  className="text-blue-600 hover:underline truncate"
                >
                  {ref}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TrivyCard;
