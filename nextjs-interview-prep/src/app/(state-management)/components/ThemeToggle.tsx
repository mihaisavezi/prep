// components/ThemeToggle.tsx
"use client";

import { useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    // Apply theme to document
    document.documentElement.classList.toggle("dark", !isDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className={`px-4 py-2 rounded-md transition-colors duration-200 ${
        isDark
          ? "bg-gray-800 text-white hover:bg-gray-700"
          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
      }`}
    >
      {isDark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}

