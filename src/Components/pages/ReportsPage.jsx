import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import { Download, Send } from "lucide-react";
import { useState } from "react";

const reports = [
  { name: "Snyk Report", file: "snyk-report.json" },
  { name: "Trivy Report", file: "trivy-report.json" },
  { name: "SonarQube Report", file: "sonarqube-report.json" },
];

const ReportPage = () => {
  const [loading, setLoading] = useState(false);

  const handleDownload = (fileName) => {
    const fileUrl = `/path/to/reports/${fileName}`; // Update with actual path
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSendEmail = async (fileName) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName }),
      });

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email");
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold dark:text-white text-gray-900">Download & Send Reports</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {reports.map((report) => (
          <Card key={report.file} className="dark:bg-gray-900 bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="dark:text-white text-gray-900">{report.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Button 
                  className="flex items-center gap-2 dark:bg-blue-600 bg-blue-500 hover:bg-blue-700 text-white"
                  onClick={() => handleDownload(report.file)}
                >
                  <Download className="h-5 w-5" />
                  Download
                </Button>
                <Button 
                  className="flex items-center gap-2 dark:bg-green-600 bg-green-500 hover:bg-green-700 text-white"
                  onClick={() => handleSendEmail(report.file)}
                  disabled={loading}
                >
                  <Send className="h-5 w-5" />
                  {loading ? "Sending..." : "Send"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReportPage;
