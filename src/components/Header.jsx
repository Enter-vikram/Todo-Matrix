// src/components/Header.jsx
import React from "react";
import { Moon, Sun } from "lucide-react";

export default function Header({ darkMode, setDarkMode, search, setSearch }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-[#F2EFC2]/70 dark:bg-[#0D0D0D]/70 text-[#0D0D0D] dark:text-white shadow-md">
      <div className="max-w-3xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight text-[#1DA1F2] dark:text-[#F2EFC2]">
          To-do
        </h1>

        <div className="flex items-center gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="px-3 py-1 rounded-full bg-white/70 dark:bg-[#1e1e1e]/70 border border-[#D9C0BA] text-sm focus:outline-none"
          />

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-full p-2 border-2 border-[#F24E29] text-[#F24E29] dark:border-[#F2EFC2] dark:text-[#F2EFC2] hover:scale-105 transition"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
