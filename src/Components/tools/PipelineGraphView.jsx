import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Activity,
    CheckCircle,
    Circle,
    Clock,
    Play,
    Square,
    XCircle
} from 'lucide-react';

const PipelineGraph = ({ pipelineData }) => {
    const defaultData = {
        id: "N/A",
        name: "Pipeline",
        stages: [],
        startTime: null,
        duration: 0,
        status: "NOT_STARTED"
    };

    const data = pipelineData || defaultData;

    const getStageIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'success':
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'failed':
                return <XCircle className="h-5 w-5 text-red-500" />;
            case 'running':
                return <Play className="h-5 w-5 text-blue-500" />;
            case 'queued':
                return <Clock className="h-5 w-5 text-yellow-500" />;
            case 'skipped':
                return <Square className="h-5 w-5 text-gray-500" />;
            default:
                return <Circle className="h-5 w-5 text-gray-400" />;
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            success: "text-green-500",
            failed: "text-red-500",
            running: "text-blue-500",
            queued: "text-yellow-500",
            skipped: "text-gray-500"
        };
        return colors[status.toLowerCase()] || "text-gray-400";
    };

    return (
        <Card className="w-full max-w-4xl shadow-lg">
            <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Activity className="h-6 w-6 text-blue-600" />
                        <CardTitle>{data.name}</CardTitle>
                    </div>
                    <span className={`font-bold uppercase ${getStatusColor(data.status)}`}>
                        {data.status}
                    </span>
                </div>
            </CardHeader>

            <CardContent className="pt-6">
                {/* Pipeline Duration */}
                <div className="mb-6 flex items-center justify-between text-sm text-gray-500">
                    <span>Started: {data.startTime ? new Date(data.startTime).toLocaleString() : 'Not started'}</span>
                    <span>Duration: {Math.round(data.duration / 1000)}s</span>
                </div>

                {/* Pipeline Graph */}
                <div className="relative">
                    {/* Connecting Line */}
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2" />

                    {/* Stages */}
                    <div className="relative z-10 flex justify-between">
                        {data.stages.map((stage, index) => (
                            <div key={index} className="flex flex-col items-center">
                                {/* Stage Icon */}
                                <div className={`
                                    w-10 h-10 rounded-full flex items-center justify-center
                                    ${stage.status.toLowerCase() === 'running' ? 'animate-pulse' : ''}
                                    bg-white border-2 ${getStatusColor(stage.status)}
                                `}>
                                    {getStageIcon(stage.status)}
                                </div>

                                {/* Stage Details */}
                                <div className="mt-2 text-center">
                                    <p className="font-medium text-sm">{stage.name}</p>
                                    <p className="text-xs text-gray-500">
                                        {stage.duration ? `${Math.round(stage.duration / 1000)}s` : '-'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stage Details */}
                <div className="mt-8 space-y-4">
                    {data.stages.map((stage, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2">
                                {getStageIcon(stage.status)}
                                <div>
                                    <p className="font-medium">{stage.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {stage.description || `Stage ${index + 1}`}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`font-bold ${getStatusColor(stage.status)}`}>
                                    {stage.status}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {stage.duration ? `${Math.round(stage.duration / 1000)}s` : '-'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default PipelineGraph;
