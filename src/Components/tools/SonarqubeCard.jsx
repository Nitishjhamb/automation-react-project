import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { Bug, Shield, Sparkles, Activity, Radar } from "lucide-react";

const SonarqubeCard = ({ metrics, qualityGate }) => {
  if (!metrics || !qualityGate) {
    return (
      <Card className="w-full shadow-lg bg-black">
        <CardContent className="p-6">
          <div className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-2xl font-bold text-white">SonarQube</CardTitle>
            <Radar className="h-6 w-6 text-blue-600" />
          </div>
          <p className="text-white">Loading SonarQube Data...</p>
        </CardContent>
      </Card>
    );
  }

  const getMetricValue = (metricKey) => {
    const measure = metrics?.component?.measures?.find((m) => m.metric === metricKey);
    return measure?.value || "0";
  };

  const getQualityGateColor = (status) => {
    return status === "OK" ? "text-green-500" : "text-red-500";
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-600" />
            <CardTitle>SonarQube Analysis</CardTitle>
          </div>
          <div className={`flex items-center gap-2 font-medium ${getQualityGateColor(qualityGate?.projectStatus?.status)}`}>
            <Sparkles className="h-5 w-5" />
            Quality Gate: {qualityGate?.projectStatus?.status || "N/A"}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard icon={<Bug className="h-5 w-5 text-red-500" />} title="Bugs" value={getMetricValue("bugs")} />
          <MetricCard icon={<Shield className="h-5 w-5 text-orange-500" />} title="Vulnerabilities" value={getMetricValue("vulnerabilities")} />
          <MetricCard icon={<Activity className="h-5 w-5 text-yellow-500" />} title="Code Smells" value={getMetricValue("code_smells")} />
          <MetricCard icon={<Shield className="h-5 w-5 text-green-500" />} title="Coverage" value={`${getMetricValue("coverage")}%`} />
        </div>
      </CardContent>
    </Card>
  );
};

const MetricCard = ({ icon, title, value }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <span className="font-medium">{title}</span>
    </div>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default SonarqubeCard;
