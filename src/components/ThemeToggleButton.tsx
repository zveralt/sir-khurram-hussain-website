"use client";

import { useTheme } from "next-themes";

export function ThemeToggleButton() {
  const { setTheme } = useTheme();

  return (
    <button
      aria-label="Toggle visual theme between Light and Dark mode"
      className="relative group p-2 rounded-full border border-[#071B33]/15 dark:border-primary-container/70 bg-white dark:bg-surface-container hover:bg-[#EDEAE1] dark:hover:bg-surface-container-high transition-all flex items-center justify-center text-[#123B65] dark:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
      id="theme-toggle"
      type="button"
      onClick={() => {
        const isDark =
          typeof document !== "undefined" &&
          document.documentElement.classList.contains("dark");
        setTheme(isDark ? "light" : "dark");
      }}
    >
      <span className="sr-only">Toggle theme</span>
      <span
        className="material-symbols-outlined text-[20px] hidden dark:inline-block transition-transform duration-300 group-hover:rotate-45"
        title="Switch to Light Mode"
        aria-hidden
      >
        light_mode
      </span>
      <span
        className="material-symbols-outlined text-[20px] inline-block dark:hidden transition-transform duration-300 group-hover:-rotate-12"
        title="Switch to Dark Mode"
        aria-hidden
      >
        dark_mode
      </span>
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity font-label-sm text-[10px] tracking-widest uppercase bg-[#071B33] text-white dark:bg-white dark:text-[#071B33] px-2 py-0.5 rounded shadow whitespace-nowrap">
        <span className="dark:inline hidden">Light</span>
        <span className="dark:hidden inline">Dark</span>
      </span>
    </button>
  );
}
