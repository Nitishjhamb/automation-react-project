import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/Card";
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, Clock } from 'lucide-react'

const BuildStatus = () => {
  const builds = [
    {
      id: 1,
      name: 'main',
      status: 'success',
      commit: '3a7e2d9',
      time: '2 minutes ago',
      author: 'Sarah Chen'
    },
    {
      id: 2,
      name: 'feature/auth',
      status: 'in_progress',
      commit: '9f8d1c4',
      time: '5 minutes ago',
      author: 'Alex Kim'
    },
    {
      id: 3,
      name: 'fix/api-endpoint',
      status: 'failed',
      commit: '5b2e8f6',
      time: '15 minutes ago',
      author: 'Mike Johnson'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
      failed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
      in_progress: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
    };

    return (
      <Badge className={`${styles[status]} px-2 py-1`}>
        {status.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Recent Builds</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {builds.map((build) => (
            <div key={build.id} className="py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {getStatusIcon(build.status)}
                <div>
                  <div className="font-medium dark:text-white">{build.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {build.commit} • {build.author}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">{build.time}</span>
                {getStatusBadge(build.status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BuildStatus;
