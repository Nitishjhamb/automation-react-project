import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Shield, 
  Box, 
  GitBranch, 
  Container, 
  History,
  Settings,
  HelpCircle,
  Moon,
  Sun,
  Bell,
  Lock,
  LogOut
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../toggle/ThemeToggle';

const Sidebar = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const {isDarkMode, toggleTheme} = useTheme();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Security Tools', icon: Shield, path: '/security-tools' },
    { name: 'Dependencies', icon: Box, path: '/dependencies' },
    { name: 'Git Analysis', icon: GitBranch, path: '/git-analysis' },
    { name: 'Container Scan', icon: Container, path: '/container-scan' },
    { name: 'Scan History', icon: History, path: '/scan-history' }
  ];

  const bottomNavItems = [
    { 
      name: 'Settings', 
      icon: Settings, 
      onClick: () => setSettingsOpen(!settingsOpen) 
    },
    { name: 'Help & Support', icon: HelpCircle, path: '/help' }
  ];

  const settingsOptions = [
    { name: 'Enable Notifications', icon: Bell, action: () => console.log('Toggle Notifications') },
    { name: 'Two-Factor Authentication', icon: Lock, action: () => console.log('Enable 2FA') },
    { name: 'Logout', icon: LogOut, action: () => console.log('Logging Out') }
  ];

  const NavItem = ({ item }) => (
    <NavLink
      to={item.path}
      onClick={item.onClick}
      className={({ isActive }) =>
        `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
          isActive
            ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-100'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`
      }
    >
      <item.icon className="h-5 w-5 mr-3" />
      {item.name}
    </NavLink>
  );

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
          <Shield className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">
            AVMV PLATFORM
          </span>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {navItems.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
          {bottomNavItems.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}

          {/* Settings Menu (Collapsible) */}
          {settingsOpen && (
            <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-900 rounded-lg space-y-2">
              <ThemeToggle>Dark Mode</ThemeToggle>
              {settingsOptions.map((option) => (
                <button
                key={option.name}
                onClick={option.action}
                className={`text-white hover:bg-gray-700 flex items-center w-full px-4 py-2 text-sm dark:text-gray-300  dark:hover:bg-gray-800 rounded-lg ${option.name ==="Dark Mode"?"justify-center":""}`}
                >
                  <option.icon className="h-5 w-5 mr-3" />
                {option.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
