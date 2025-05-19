import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import React from "react";
import { useDetails } from "../context/userContext";
export default function TopBar() {
  const { darkMode, setDarkMode } = useDetails();
  const [workspaceName, setWorkspaceName] = useState("Tim's Workspace");

  // Toggle dark/light mode
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Update document body class when theme changes
  useEffect(() => {
    const root = document.getElementById("root");
    if (!root) return;

    root.style.backgroundColor = darkMode ? "#0f172a" : "#f9fafb";
  }, [darkMode]);

  return (
    <div
      className={`w-[95%] h-14 px-4 flex items-center justify-between absolute left-20 ${
        darkMode ? "bg-black" : "bg-gray-100"
      } border-2`}
    >
      {/* Left side - App name with dotted border */}
      <div
        className={`px-3 py-1 border border-dashed ${
          darkMode ? "border-gray-600" : "border-gray-400"
        } rounded-md`}
      >
        <span
          className={`font-medium ${darkMode ? "text-white" : "text-gray-800"}`}
        >
          Onebox
        </span>
      </div>

      {/* Right side - Theme toggle and workspace name */}
      <div className="flex items-center space-x-4 ">
        {/* Theme toggle button */}
        <button
          onClick={toggleTheme}
          className="inline-flex items-center justify-center
    p-2 rounded-md        
    bg-red-600 hover:bg-red-700
    transition"
          aria-label="Toggle theme"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Workspace name */}
        <div className="flex items-center">
          <span className={`${darkMode ? "text-white" : "text-gray-800"}`}>
            {workspaceName}
          </span>
          <svg
            className="w-5 h-5 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
