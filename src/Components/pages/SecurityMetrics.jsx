import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { Shield, AlertTriangle, Lock } from 'lucide-react'

const SecurityMetrics = () => {
  const metrics = [
    {
      id: 1,
      name: 'Security Score',
      value: '85/100',
      change: '+5',
      icon: Shield,
      color: 'text-green-500'
    },
    {
      id: 2,
      name: 'Open Vulnerabilities',
      value: '12',
      change: '-3',
      icon: AlertTriangle,
      color: 'text-yellow-500'
    },
    {
      id: 3,
      name: 'Dependencies Updated',
      value: '98%',
      change: '+2%',
      icon: Lock,
      color: 'text-blue-500'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Security Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            const isPositive = metric.change.startsWith('+');

            return (
              <div
                key={metric.id}
                className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
              >
                <div className={`p-3 rounded-full ${metric.color} bg-opacity-10 mr-4`}>
                  <Icon className={`h-6 w-6 ${metric.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {metric.name}
                  </h3>
                  <div className="flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {metric.value}
                    </p>
                    <span
                      className={`ml-2 text-sm font-medium ${
                        isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {metric.change}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityMetrics;
