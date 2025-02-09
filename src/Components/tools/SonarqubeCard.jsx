import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { Bug, Shield, Sparkles, Activity } from 'lucide-react';
import { sonarqubeService } from "../../services/sonarqubeService";

const SonarqubeCard = ({ projectKey }) => {
    const [metrics, setMetrics] = useState(null);
    const [qualityGate, setQualityGate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSonarqubeData = async () => {
            try {
                setLoading(true);
                const [metricsData, qualityGateData] = await Promise.all([
                    sonarqubeService.getProjectMetrics(projectKey),
                    sonarqubeService.getQualityGateStatus(projectKey)
                ]);
                
                setMetrics(metricsData);
                setQualityGate(qualityGateData);
            } catch (err) {
                setError('Failed to fetch Sonarqube data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (projectKey) {
            fetchSonarqubeData();
        }
    }, [projectKey]);

    if (loading) {
        return (
            <Card className="w-full shadow-lg">
                <CardContent className="p-6">
                    <div className="flex items-center justify-center h-40">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="w-full shadow-lg">
                <CardContent className="p-6">
                    <div className="flex items-center justify-center text-red-500">
                        <Alert className="h-5 w-5 mr-2" />
                        {error}
                    </div>
                </CardContent>
            </Card>
        );
    }

    const getMetricValue = (metricKey) => {
        const measure = metrics?.component?.measures?.find(m => m.metric === metricKey);
        return measure?.value || '0';
    };

    const getQualityGateColor = (status) => {
        return status === 'OK' ? 'text-green-500' : 'text-red-500';
    };

    return (
        <Card className="w-full shadow-lg">
            <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Shield className="h-6 w-6 text-blue-600" />
                        <CardTitle>Sonarqube Analysis</CardTitle>
                    </div>
                    <div className={`flex items-center gap-2 font-medium ${getQualityGateColor(qualityGate?.projectStatus?.status)}`}>
                        <Sparkles className="h-5 w-5" />
                        Quality Gate: {qualityGate?.projectStatus?.status || 'N/A'}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Bugs */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <Bug className="h-5 w-5 text-red-500" />
                            <span className="font-medium">Bugs</span>
                        </div>
                        <p className="text-2xl font-bold">{getMetricValue('bugs')}</p>
                    </div>

                    {/* Vulnerabilities */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <Alert className="h-5 w-5 text-orange-500" />
                            <span className="font-medium">Vulnerabilities</span>
                        </div>
                        <p className="text-2xl font-bold">{getMetricValue('vulnerabilities')}</p>
                    </div>

                    {/* Code Smells */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <Activity className="h-5 w-5 text-yellow-500" />
                            <span className="font-medium">Code Smells</span>
                        </div>
                        <p className="text-2xl font-bold">{getMetricValue('code_smells')}</p>
                    </div>

                    {/* Coverage */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <Shield className="h-5 w-5 text-green-500" />
                            <span className="font-medium">Coverage</span>
                        </div>
                        <p className="text-2xl font-bold">{getMetricValue('coverage')}%</p>
                    </div>
                </div>

                {/* Additional metrics could be added here */}
            </CardContent>
        </Card>
    );
};

export default SonarqubeCard;