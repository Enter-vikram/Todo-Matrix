// src/components/Header.jsx
import React from "react";
import { Moon, Sun, Search } from "lucide-react";

export default function Header({ darkMode, setDarkMode, search, setSearch }) {
  return (
    <header className="w-full py-5 px-4 backdrop-blur-md bg-white/50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 shadow-sm mb-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* App Title */}
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">
          To-do
        </h1>

        {/* Top Right Controls */}
        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="pl-9 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-600"
            />
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            title="Toggle Dark Mode"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="mt-3 block sm:hidden">
        <div className="relative w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/70 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:focus:ring-pink-600"
          />
        </div>
      </div>
    </header>
  );
}
