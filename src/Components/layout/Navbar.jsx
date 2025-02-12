import React, { useState } from "react";
import { Bell, Settings, Menu, X } from "lucide-react";
import ThemeToggle from "../toggle/ThemeToggle";

const Navbar = ({ onMenuClick }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false); // Added state

  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);
  const toggleNotifications = () => setIsNotificationsEnabled(!isNotificationsEnabled); // Toggle function

  return (
    <>
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
                <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </button>

              <span className="text-xl font-semibold text-gray-900 dark:text-white ml-2 lg:ml-0">
                Security Dashboard
              </span>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button
                className="relative hover:bg-gray-700 p-2 text-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 rounded-full"
                aria-label="View notifications"
              >
                {isNotificationsEnabled && (
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
                )}
                <Bell className="h-5 w-5 text-white dark:text-gray-300" />
              </button>
              

              {/* Settings */}
              <button
                onClick={toggleSettings}
                className="p-2 rounded-full hover:bg-gray-700"
                aria-label="Open settings"
              >
                <Settings className="h-5 w-5 text-gray-300" />
              </button>

              {/* Profile - Hidden on mobile */}
              <div className="hidden md:flex items-center">
                <button
                  className="flex hover:bg-gray-700 items-center space-x-2"
                  aria-label="Open profile menu"
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                    alt="User avatar"
                  />
                  <span className="ml-2 text-sm font-medium text-white-600 dark:text-gray-300">
                    Security scanning
                  </span>
                </button>
              </div>

              {/* Theme Toggle */}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Settings</h2>
              <button
                onClick={toggleSettings}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {/* Theme Toggle */}
              <div className="flex justify-between items-center">
                <span className="text-gray-900 dark:text-white">Dark Mode</span>
                <ThemeToggle />
              </div>

              {/* Notifications Toggle */}
              <div className="flex justify-between items-center">
                <span className="text-gray-900 dark:text-white">Enable Notifications</span>
                <input
                  type="checkbox"
                  checked={isNotificationsEnabled}
                  onChange={toggleNotifications}
                  className="toggle-checkbox"
                />
              </div>

              {/* Security Option */}
              <div className="flex justify-between items-center">
                <span className="text-gray-900 dark:text-white">Two-Factor Authentication</span>
                <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Enable
                </button>
              </div>

              {/* Account Settings */}
              <div>
                <h3 className="text-gray-900 dark:text-white font-semibold">Account</h3>
                <button className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Logout
                </button>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={toggleSettings}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
