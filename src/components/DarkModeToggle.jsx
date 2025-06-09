import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "default" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
      className="fixed top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-md bg-white/30 dark:bg-gray-700 border border-white/40 dark:border-gray-500 shadow-md hover:scale-105 transition"
    >
      {isDark ? (
        <Sun className="text-yellow-300" size={18} />
      ) : (
        <Moon className="text-gray-900" size={18} />
      )}
    </button>
  );
}
