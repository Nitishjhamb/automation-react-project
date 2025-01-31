import React from 'react';
import GitGuardianCard from '../Components/tools/GitGuardianCard';
import ClairCard from '../Components/tools/ClairCard';
import SnykCard from '../Components/tools/SnykCard';
import CheckmarxCard from '../Components/tools/CheckmarxCard';
import TrivyCard from '../Components/tools/TrivyCard';

const SecurityTools = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Security Tools</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GitGuardianCard />
          <ClairCard />
          <SnykCard />
          <CheckmarxCard />
          <TrivyCard />
        </div>
      </div>
    </div>
  );
};

export default SecurityTools;
