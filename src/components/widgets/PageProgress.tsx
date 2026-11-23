"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";

/**
 * Fixed top scroll progress bar (transform scaleX only).
 * Mount once per page near the root layout or shell.
 */
export function PageProgress() {
  const progress = useScrollProgress();

  return (
    <div className="widget-page-progress" aria-hidden>
      <div
        className="widget-page-progress__bar"
        style={{ transform: `scaleX(${progress})`, ["--scroll-progress" as string]: progress }}
      />
    </div>
  );
}
