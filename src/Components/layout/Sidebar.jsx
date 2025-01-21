import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Shield, 
  Box, 
  GitBranch, 
  Container, 
  History,
  Settings,
  HelpCircle
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Security Tools', icon: Shield, path: '/security-tools' },
    { name: 'Dependencies', icon: Box, path: '/dependencies' },
    { name: 'Git Analysis', icon: GitBranch, path: '/git-analysis' },
    { name: 'Container Scan', icon: Container, path: '/container-scan' },
    { name: 'Scan History', icon: History, path: '/scan-history' }
  ];

  const bottomNavItems = [
    { name: 'Settings', icon: Settings, path: '/settings' },
    { name: 'Help & Support', icon: HelpCircle, path: '/help' }
  ];

  const NavItem = ({ item }) => (
    <NavLink
      to={item.path}
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
            SecureGuard
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
        </div>
      </div>
    </div>
  );
};

export default Sidebar;