"use client";

export function ThemeToggleButton() {
  return (
    <button
      type="button"
      aria-label="Toggle light and dark theme"
      className="inline-flex h-10 w-10 items-center justify-center text-white/80 hover:text-accent-hot transition-colors"
      onClick={() => {
        const root = document.documentElement;
        const nextDark = !root.classList.contains("dark");
        root.classList.toggle("dark", nextDark);
        root.style.colorScheme = nextDark ? "dark" : "light";
        try {
          localStorage.setItem("theme", nextDark ? "dark" : "light");
        } catch {
          /* private mode */
        }
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 3.75a8.25 8.25 0 0 1 0 16.5z" fill="currentColor" />
      </svg>
    </button>
  );
}
