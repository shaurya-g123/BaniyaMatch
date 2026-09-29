"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = "" }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkStored = localStorage.getItem("bm_theme") === "dark";
    setIsDark(isDarkStored);
    if (isDarkStored) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("bm_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("bm_theme", "light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full border border-bmBorder dark:border-charcoal-border hover:bg-sand dark:hover:bg-charcoal-surface text-bmText-secondary dark:text-bmText-darkSecondary transition-colors ${className}`}
      title={isDark ? "Switch to Warm Ivory" : "Switch to Deep Charcoal"}
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="w-4 h-4 text-gold" /> : <Moon className="w-4 h-4" />}
    </button>
  );
};
