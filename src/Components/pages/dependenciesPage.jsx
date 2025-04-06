import React, { useState, useEffect } from "react";
import snykReport from "../../../client/public/snyk-report.json";
import trivyReport from "../../../client/public/trivy-report.json";
import { ArrowUpRight } from "lucide-react";

const extractDependencies = () => {
  const snykDependencies = snykReport.vulnerabilities.map((vuln) => ({
    name: vuln.packageName,
    version: vuln.version,
    tool: "Snyk",
    url:
      vuln.identifiers?.CVE?.length > 0
        ? `https://cve.mitre.org/cgi-bin/cvename.cgi?name=${vuln.identifiers.CVE[0]}`
        : vuln.url || "#",
  }));

  const trivyDependencies =
    trivyReport.Results[0]?.Vulnerabilities?.map((vuln) => ({
      name: vuln.PkgName,
      version: vuln.InstalledVersion,
      tool: "Trivy",
      url: vuln.PrimaryURL || "#",
    })) || [];

  return {
    snyk: snykDependencies,
    trivy: trivyDependencies,
  };
};

const DependenciesPage = () => {
  const dependencies = extractDependencies();
  const [isDark, setIsDark] = useState(true);

  return (
    <div className=" bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">Dependencies</h1>
      </div>

      <div className="w-full max-w-6xl mx-auto space-y-8">
        {/* Snyk Dependencies */}
        <div className="bg-gray-100 dark:bg-gray-950 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center">Snyk</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dependencies.snyk.map((dep, idx) => (
              <div
                key={`snyk-${idx}`}
                className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg flex flex-col items-center text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="font-bold">{dep.name}</span>
                  <a href={dep.url} target="_blank" rel="noopener noreferrer">
                    <ArrowUpRight className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                  </a>
                </div>
                <div className="text-gray-500 dark:text-gray-400">
                  v{dep.version}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trivy Dependencies */}
        <div className="bg-gray-100 dark:bg-gray-950 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center">Trivy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dependencies.trivy.map((dep, idx) => (
              <div
                key={`trivy-${idx}`}
                className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg flex flex-col items-center text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="font-bold">{dep.name}</span>
                  <a href={dep.url} target="_blank" rel="noopener noreferrer">
                    <ArrowUpRight className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600" />
                  </a>
                </div>
                <div className="text-gray-500 dark:text-gray-400">
                  v{dep.version}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DependenciesPage;
