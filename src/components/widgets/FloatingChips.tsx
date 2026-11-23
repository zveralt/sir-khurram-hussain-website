"use client";

import { useMemo } from "react";
import { useWidgetInView } from "@/hooks/useWidgetInView";

/**
 * Keyword pills on slow independent drift paths (seeded positions).
 * Props: `labels`, `density` ('low' | 'medium'), `className` wrapper.
 */
function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i);
  return Math.abs(h);
}

export function FloatingChips({
  labels,
  density = "low",
  className = "",
}: {
  labels: string[];
  density?: "low" | "medium";
  className?: string;
}) {
  const { ref, inView } = useWidgetInView();
  const chips = useMemo(() => {
    const spread = density === "medium" ? 72 : 56;
    return labels.map((label, i) => {
      const h = hash(label + String(i));
      const left = 8 + (h % spread);
      const top = 6 + ((h >> 4) % spread);
      const anim = i % 2 === 0 ? "widget-chip-drift-a" : "widget-chip-drift-b";
      const dur = 14 + (h % 8);
      return { label, left, top, anim, dur };
    });
  }, [labels, density]);

  if (!labels.length) return null;

  return (
    <div
      ref={ref}
      className={`relative min-h-[8rem] ${inView ? "widget-animate-run" : "widget-animate-pause"} ${className}`.trim()}
      aria-hidden
    >
      {chips.map((c) => (
        <span
          key={c.label}
          className="absolute rounded-full border px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted widget-glass-card"
          style={{
            left: `${c.left}%`,
            top: `${c.top}%`,
            animation: `${c.anim} ${c.dur}s ease-in-out infinite`,
            animationPlayState: inView ? "running" : "paused",
            borderColor: "color-mix(in srgb, var(--widget-stroke) 40%, transparent)",
            padding: "0.35rem 0.65rem",
          }}
        >
          {c.label}
        </span>
      ))}
    </div>
  );
}
