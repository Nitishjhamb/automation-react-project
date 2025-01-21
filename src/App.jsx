import { useState } from 'react'
import './App.css'
import Dashboard from './Components/pages/Dashboard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './Components/context/ThemeContext'
import Navbar from './Components/layout/Navbar'
import Sidebar from './Components/layout/Sidebar'
import SecurityTools from './Components/pages/SecurityTools'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <ThemeProvider>
      <Router>
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Navbar />
            <main className="flex-1 overflow-x-hidden overflow-y-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/security-tools" element={<SecurityTools />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </ThemeProvider>
    </div>
  )
}

export default App
