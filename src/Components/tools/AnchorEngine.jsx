import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AlertCircle, 
  Box, 
  ChevronDown, 
  ChevronRight, 
  Database, 
  Shield,
  Filter,
  Search,
  Clock
} from 'lucide-react';

const AnchoreCard = ({ scanResults }) => {
  const [expandedVuln, setExpandedVuln] = useState(null);
  const [activeTab, setActiveTab] = useState('vulnerabilities');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('all');

  // Default data if no scan results provided
  const defaultData = {
    imageId: "N/A",
    repository: "N/A",
    tag: "latest",
    timestamp: new Date().toISOString(),
    vulnerabilities: [],
    policies: [],
    summary: {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      negligible: 0,
      unknown: 0
    }
  };

  const data = scanResults || defaultData;

  const getSeverityColor = (severity) => {
    const colors = {
      critical: "bg-purple-600",
      high: "bg-red-500",
      medium: "bg-orange-500",
      low: "bg-yellow-500",
      negligible: "bg-blue-500",
      unknown: "bg-gray-500"
    };
    return colors[severity.toLowerCase()] || "bg-gray-500";
  };

  const filteredVulnerabilities = data.vulnerabilities.filter(vuln => {
    const matchesSearch = vuln.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vuln.packageName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = filterSeverity === 'all' || vuln.severity.toLowerCase() === filterSeverity.toLowerCase();
    return matchesSearch && matchesSeverity;
  });

  const VulnerabilityDetails = ({ vuln }) => (
    <div className="p-4 bg-gray-50 space-y-3">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Package Name</p>
          <p className="font-medium">{vuln.packageName}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Current Version</p>
          <p className="font-medium">{vuln.currentVersion}</p>
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-500">Description</p>
        <p className="text-sm text-gray-600">{vuln.description}</p>
      </div>

      {vuln.fix && (
        <div>
          <p className="text-sm font-medium text-gray-500">Fix Available</p>
          <p className="text-sm text-gray-600">Version: {vuln.fix}</p>
        </div>
      )}

      {vuln.references && vuln.references.length > 0 && (
        <div>
          <p className="text-sm font-medium text-gray-500">References</p>
          <ul className="list-disc list-inside text-sm text-blue-600">
            {vuln.references.map((ref, idx) => (
              <li key={idx} className="truncate hover:text-blue-800">
                {ref}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const PolicyEvaluation = ({ policy }) => (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          <h3 className="font-medium">{policy.name}</h3>
        </div>
        <span 
          className={`${policy.status === 'pass' ? 'text-green-500' : 'text-red-500'}`}
        >
          {policy.status.toUpperCase()}
        </span>
      </div>
      
      {policy.rules && (
        <div className="ml-6 space-y-2">
          {policy.rules.map((rule, idx) => (
            <div key={idx} className="text-sm">
              <div className="flex items-center justify-between">
                <span className="font-medium">{rule.name}</span>
                <span 
                  className={`${rule.status === 'pass' ? 'text-green-500' : 'text-red-500'}`}
                >
                  {rule.status.toUpperCase()}
                </span>
              </div>
              {rule.description && (
                <p className="text-gray-600 mt-1">{rule.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <Card className="w-full max-w-4xl shadow-lg">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="h-6 w-6 text-blue-600" />
            <CardTitle>Anchore Engine Scan Results</CardTitle>
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {new Date(data.timestamp).toLocaleString()}
            </div>
            <div>
              {data.repository}:{data.tag}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        {/* Summary Section */}
        <div className="grid grid-cols-6 gap-4 mb-6">
          {Object.entries(data.summary).map(([severity, count]) => (
            <div key={severity} className="text-center p-4 bg-gray-50 rounded-lg">
              <span 
                className={`${getSeverityColor(severity)} text-white mb-2`}
              >
                {severity.toUpperCase()}
              </span>
              <p className="text-2xl font-bold">{count}</p>
              <p className="text-xs text-gray-500">Issues</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b mb-6">
          <button
            className={`pb-2 px-1 ${activeTab === 'vulnerabilities' 
              ? 'border-b-2 border-blue-500 text-blue-600' 
              : 'text-gray-500'}`}
            onClick={() => setActiveTab('vulnerabilities')}
          >
            Vulnerabilities
          </button>
          <button
            className={`pb-2 px-1 ${activeTab === 'policies' 
              ? 'border-b-2 border-blue-500 text-blue-600' 
              : 'text-gray-500'}`}
            onClick={() => setActiveTab('policies')}
          >
            Policy Evaluations
          </button>
        </div>

        {activeTab === 'vulnerabilities' && (
          <>
            {/* Search and Filter */}
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search vulnerabilities..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  className="pl-10 pr-4 py-2 border rounded-lg appearance-none bg-white"
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value)}
                >
                  <option value="all">All Severities</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                  <option value="negligible">Negligible</option>
                </select>
              </div>
            </div>

            {/* Vulnerabilities List */}
            <div className="space-y-4">
              {filteredVulnerabilities.map((vuln, index) => (
                <div 
                  key={index}
                  className="border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div 
                    className="p-4 flex items-center justify-between cursor-pointer"
                    onClick={() => setExpandedVuln(expandedVuln === index ? null : index)}
                  >
                    <div className="flex items-center gap-4">
                      <span 
                        className={`${getSeverityColor(vuln.severity)} text-white`}
                      >
                        {vuln.severity}
                      </span>
                      <div>
                        <h3 className="font-medium">{vuln.id}</h3>
                        <p className="text-sm text-gray-500">{vuln.packageName}</p>
                      </div>
                    </div>
                    {expandedVuln === index ? (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  {expandedVuln === index && <VulnerabilityDetails vuln={vuln} />}
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'policies' && (
          <div className="space-y-4">
            {data.policies.map((policy, index) => (
              <PolicyEvaluation key={index} policy={policy} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnchoreCard;
