import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = ({children}) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 hover:bg-gray-700 items-center justify-center text-white-600 dark:text-gray-300 dark:hover:bg-gray-700 flex gap-2 ${children?" w-full":""}`}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-white-700" />
      )}
      {children?children:""}
    </button>
  );
};

export default ThemeToggle;
