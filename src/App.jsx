import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Layout Components
import Navbar from "./Components/layout/Navbar";
import Sidebar from "./Components/layout/Sidebar";

// Page Components
import Dashboard from "./Components/pages/Dashboard";
import SecurityTools from "./Components/pages/SecurityTools";
import VulnerabilityChart from "./Components/pages/VulnerabilityChart";
import DependenciesPage from "./Components/pages/dependenciesPage";
import ReportsPage from "./Components/pages/ReportsPage";
// Context Providers
import { ThemeProvider } from "./Components/context/ThemeContext";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ThemeProvider>
      <Router>
        {/* Root container to take full height */}
        <div className="flex h-screen w-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
          <Sidebar isOpen={isSidebarOpen} />
          {/* Content area fills remaining space */}
          <div className="flex flex-col flex-grow overflow-hidden">
            <Navbar onMenuClick={toggleSidebar} />
            <main className="flex-grow overflow-auto bg-gray-50 dark:bg-gray-900">
              <div className="container px-6 mx-auto">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/security-tools" element={<SecurityTools />} />
                  <Route
                    path="/vulnerability-chart"
                    element={<VulnerabilityChart />}
                  />
                  <Route path="/dependencies" element={<DependenciesPage />} />
                  <Route path="/download-report" element={<ReportsPage/>}/>
                </Routes>
              </div>
            </main>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
