import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { Download } from "lucide-react";

const reports = [
  { name: "Snyk Report", file: "../../../client/public/snyk-report.json" },
  { name: "Trivy Report", file: "../../../client/public/trivy-report.json" },
  { name: "SonarQube Report", file: "../../../client/public/sonarqube-report.json" },
];

const ReportPage = () => {
  const handleDownload = async (fileName) => {
    try {
      const response = await fetch(`/${fileName}`);
      if (!response.ok) throw new Error("File not found");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      toast.error(`Failed to download: ${error.message}`);
      console.error("Download error:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold dark:text-white text-gray-900">Download Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {reports.map((report) => (
          <Card key={report.file} className="dark:bg-gray-900 bg-white shadow-lg p-4 rounded-lg">
            <CardHeader>
              <CardTitle className="dark:text-white text-gray-900">{report.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <button 
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
                onClick={() => handleDownload(report.file)}
              >
                <Download className="h-5 w-5" />
                Download
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReportPage;