import React from "react";
import sonarqubeReport from "../../../client/public/sonarqube-report.json";
import snykReport from "../../../client/public/snyk-report.json";
import trivyReport from "../../../client/public/trivy-report.json";

const extractDependencies = () => {
  // Extract from Snyk report
  const snykDependencies = snykReport.vulnerabilities.map((vuln) => ({
    name: vuln.packageName,
    version: vuln.version,
    tool: "Snyk",
  }));

  // Extract from Trivy report
  const trivyDependencies =
    trivyReport.Results[0]?.Vulnerabilities?.map((vuln) => ({
      name: vuln.PkgName,
      version: vuln.InstalledVersion,
      tool: "Trivy",
    })) || [];

  // Extract from SonarQube (these are more code issues than dependencies)
  const sonarDependencies = sonarqubeReport.issues.map((issue) => ({
    name: issue.component.split(":").pop(),
    tool: "SonarQube",
  }));

  return {
    snyk: snykDependencies,
    trivy: trivyDependencies,
    sonarqube: sonarDependencies,
  };
};

const DependenciesPage = () => {
  const dependencies = extractDependencies();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-10">Dependencies</h1>

      <div className="w-full max-w-6xl space-y-8">
        {/* Snyk Dependencies */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Snyk</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dependencies.snyk.map((dep, idx) => (
              <div key={`snyk-${idx}`} className="bg-gray-700 p-4 rounded-lg">
                <div className="font-bold">{dep.name}</div>
                <div className="text-gray-400">v{dep.version}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trivy Dependencies */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Trivy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dependencies.trivy.map((dep, idx) => (
              <div key={`trivy-${idx}`} className="bg-gray-700 p-4 rounded-lg">
                <div className="font-bold">{dep.name}</div>
                <div className="text-gray-400">v{dep.version}</div>
              </div>
            ))}
          </div>
        </div>

        {/* SonarQube Dependencies */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">SonarQube</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dependencies.sonarqube.map((dep, idx) => (
              <div key={`sonar-${idx}`} className="bg-gray-700 p-4 rounded-lg">
                <div className="font-bold">{dep.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DependenciesPage;
