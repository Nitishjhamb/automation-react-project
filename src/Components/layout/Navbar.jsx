import React from 'react';
import { Bell, Settings, Menu } from 'lucide-react';
import ThemeToggle from '../toggle/ThemeToggle';

const Navbar = ({ onMenuClick }) => {
  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {/* Menu button for mobile */}
            <button
              onClick={onMenuClick}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <span className="text-xl font-semibold text-gray-900 dark:text-white ml-2 lg:ml-0">
              Security Dashboard
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button 
              className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              aria-label="View notifications"
            >
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
              <Bell className="h-5 w-5" />
            </button>

            {/* Settings */}
            <button 
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              aria-label="Open settings"
            >
              <Settings className="h-5 w-5" />
            </button>

            {/* Profile - Hidden on mobile */}
            <div className="hidden md:flex items-center">
              <button 
                className="flex items-center space-x-2"
                aria-label="Open profile menu"
              >
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                  alt="User avatar"
                />
                <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  John Doe
                </span>
              </button>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;