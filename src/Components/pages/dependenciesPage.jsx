import React from 'react';

const dependenciesData = [
  {
    tool: "Trivy",
    dependencies: ["trivy", "axios", "express"],
  },
  {
    tool: "Snyk",
    dependencies: ["snyk", "react", "chart.js"],
  },
  {
    tool: "SonarQube",
    dependencies: ["sonarqube-scanner", "axios", "express"],
  },
  {
    tool: "OWASP ZAP",
    dependencies: ["zap-cli", "axios", "react-json-view"],
  },
];

const DependenciesPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-10">Dependencies</h1>
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8"> 
        {dependenciesData.map((tool, index) => (
          <div
            key={index}
            className="bg-gray-800 p-8 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300 mb-6" 
          >
            <h2 className="text-2xl font-semibold mb-6 text-center">{tool.tool}</h2> 
            {/* Changed from ul with vertical spacing to a horizontal flex container */}
            <div className="flex flex-row flex-wrap gap-4 justify-center">
              {tool.dependencies.map((dependency, idx) => (
                <div
                  key={idx}
                  className="bg-gray-700 py-3 px-6 rounded-lg text-center shadow-md flex-grow"
                >
                  {dependency}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DependenciesPage;