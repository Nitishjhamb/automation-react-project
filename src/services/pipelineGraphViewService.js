// pipelineUtils.js

export const mockPipelineData = {
    id: "PIPE-2024-001",
    name: "Security Pipeline",
    startTime: new Date().toISOString(),
    duration: 1800000, // 30 minutes in milliseconds
    status: "SUCCESS",
    stages: [
      {
        name: "Code Scan",
        description: "Static code analysis",
        status: "SUCCESS",
        duration: 300000,
        steps: [
          { name: "SonarQube Analysis", status: "SUCCESS", duration: 180000 },
          { name: "Dependencies Check", status: "SUCCESS", duration: 120000 }
        ]
      },
      {
        name: "Security Tests",
        description: "Security testing suite",
        status: "SUCCESS",
        duration: 600000,
        steps: [
          { name: "OWASP ZAP Scan", status: "SUCCESS", duration: 300000 },
          { name: "Penetration Tests", status: "SUCCESS", duration: 300000 }
        ]
      },
      {
        name: "Container Scan",
        description: "Container image security scan",
        status: "SUCCESS",
        duration: 400000,
        steps: [
          { name: "Anchore Scan", status: "SUCCESS", duration: 400000 }
        ]
      },
      {
        name: "Compliance Check",
        description: "Security compliance verification",
        status: "SUCCESS",
        duration: 500000,
        steps: [
          { name: "Policy Check", status: "SUCCESS", duration: 250000 },
          { name: "Compliance Report", status: "SUCCESS", duration: 250000 }
        ]
      }
    ]
  };
  
  export const calculatePipelineMetrics = (pipeline) => {
    return {
      totalDuration: pipeline.duration,
      averageStageDuration: pipeline.duration / pipeline.stages.length,
      successRate: calculateSuccessRate(pipeline.stages),
      criticalPath: findCriticalPath(pipeline.stages)
    };
  };
  
  export const calculateSuccessRate = (stages) => {
    const successful = stages.filter(stage => stage.status === 'SUCCESS').length;
    return (successful / stages.length) * 100;
  };
  
  export const findCriticalPath = (stages) => {
    return stages
      .sort((a, b) => b.duration - a.duration)
      .map(stage => stage.name);
  };
  
  export const getStageStatus = (stage) => {
    if (stage.status === 'RUNNING') return 'running';
    if (stage.status === 'SUCCESS') return 'success';
    if (stage.status === 'FAILED') return 'failed';
    return 'pending';
  };
  
  export const formatDuration = (ms) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return ${hours}h ${minutes % 60}m;
    if (minutes > 0) return ${minutes}m ${seconds % 60}s;
    return ${seconds}s;
  };