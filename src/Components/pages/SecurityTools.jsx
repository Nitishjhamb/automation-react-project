import React from "react";
import SnykCard from '../tools/SnykCard'
import SonarqubeCard from "../tools/SonarqubeCard";
import TrivyCard from "../tools/TrivyCard";
import OwaspZapCard from "../tools/OwaspZap";

const SecurityTools = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Security Tools
        </h1>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <SnykCard />
          <SonarqubeCard/>
          <TrivyCard />
          <OwaspZapCard/>
        </div>
      </div>
    </div>
  );
};

export default SecurityTools;
