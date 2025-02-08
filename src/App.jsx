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
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
          <Sidebar isOpen={isSidebarOpen} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Navbar onMenuClick={toggleSidebar} />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
              <div className="container px-6 mx-auto">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/security-tools" element={<SecurityTools />} />
                  <Route
                    path="/vulnerability-chart"
                    element={<VulnerabilityChart />}
                  />
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
