"use client";

import { Search } from "lucide-react";
import { useCallback, useEffect, useId, useRef } from "react";

/**
 * Search field with visible "/" shortcut; presses "/" focuses unless typing in an input.
 * Props: `value`, `onChange`, `placeholder`, `ariaLabel`.
 */
export function KeyboardSearch({
  value,
  onChange,
  placeholder = "Search…",
  ariaLabel = "Search",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  ariaLabel?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();

  const onDocKey = useCallback((e: KeyboardEvent) => {
    if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target as HTMLElement | null;
    if (t?.closest("input, textarea, select, [contenteditable=true]")) return;
    e.preventDefault();
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", onDocKey);
    return () => document.removeEventListener("keydown", onDocKey);
  }, [onDocKey]);

  return (
    <label htmlFor={id} className="widget-keyboard-search">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
      <input
        ref={inputRef}
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="widget-keyboard-search__input"
        autoComplete="off"
      />
      <kbd className="widget-keyboard-search__hint" aria-hidden>
        /
      </kbd>
    </label>
  );
}
