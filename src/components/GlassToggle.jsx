import React from "react";

const GlassToggle = ({ isOn, onToggle }) => {
  return (
    <button
      aria-label="Toggle Dark Mode"
      onClick={onToggle}
      className="relative w-14 h-8 rounded-full flex items-center p-1 cursor-pointer select-none transition-all duration-300 ease-in-out
                 bg-white/20 dark:bg-black/30 backdrop-blur-md shadow-inner ring-1 ring-white/30 dark:ring-black/30"
    >
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center text-sm text-gray-900 dark:text-yellow-300
                    transition-transform duration-300 ease-in-out transform
                    ${
                      isOn
                        ? "translate-x-6 bg-white"
                        : "translate-x-0 bg-yellow-400"
                    }`}
      >
        {isOn ? (
          // Moon icon for dark mode
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 0112.21 3a7 7 0 1010.08 9.79z" />
          </svg>
        ) : (
          // Sun icon for light mode
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        )}
      </div>
    </button>
  );
};

export default GlassToggle;
