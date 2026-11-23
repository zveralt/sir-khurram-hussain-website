"use client";

import { useWidgetInView } from "@/hooks/useWidgetInView";

/**
 * 12-fold Islamic rosette — thin strokes, draw-once then slow rotation when in view.
 * Props: `opacity`, `size`, `className` (position absolute backgrounds).
 */
export function Rosette({
  opacity = 0.12,
  size = 420,
  className = "",
}: {
  opacity?: number;
  size?: number;
  className?: string;
}) {
  const { ref, inView, reducedMotion } = useWidgetInView();
  const cx = 100;
  const cy = 100;
  const petals = 12;
  const lines: string[] = [];
  for (let i = 0; i < petals; i++) {
    const a = (i / petals) * Math.PI * 2;
    const x = cx + Math.cos(a) * 88;
    const y = cy + Math.sin(a) * 88;
    lines.push(`M${cx} ${cy} L${x.toFixed(2)} ${y.toFixed(2)}`);
  }

  return (
    <div
      ref={ref}
      className={`pointer-events-none ${className} ${inView ? "widget-animate-run" : "widget-animate-pause"}`.trim()}
      aria-hidden
      style={{ opacity, width: size, height: size }}
    >
      <div className="widget-rosette__spin h-full w-full" style={{ animation: reducedMotion ? undefined : "widget-rosette-spin 240s linear infinite", animationPlayState: inView ? "running" : "paused" }}>
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <circle cx={cx} cy={cy} r="92" fill="none" stroke="var(--widget-stroke)" strokeWidth="0.6" />
          <circle cx={cx} cy={cy} r="62" fill="none" stroke="var(--widget-stroke)" strokeWidth="0.5" />
          <circle cx={cx} cy={cy} r="32" fill="none" stroke="var(--widget-emerald)" strokeWidth="0.5" opacity="0.7" />
          {lines.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke="var(--widget-stroke)"
              strokeWidth="0.45"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={inView ? 0 : 1}
              style={{ transition: reducedMotion ? undefined : `stroke-dashoffset 1.2s ease ${i * 0.04}s` }}
            />
          ))}
          {Array.from({ length: petals }, (_, i) => {
            const a1 = (i / petals) * Math.PI * 2;
            const a2 = a1 + Math.PI / petals;
            const r1 = 48;
            const r2 = 88;
            const x1 = cx + Math.cos(a1) * r1;
            const y1 = cy + Math.sin(a1) * r1;
            const x2 = cx + Math.cos(a2) * r2;
            const y2 = cy + Math.sin(a2) * r2;
            const x3 = cx + Math.cos(a1 + (Math.PI * 2) / petals) * r1;
            const y3 = cy + Math.sin(a1 + (Math.PI * 2) / petals) * r1;
            return (
              <path
                key={`p-${i}`}
                d={`M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)} L${x3.toFixed(1)} ${y3.toFixed(1)} Z`}
                fill="none"
                stroke="var(--widget-emerald)"
                strokeWidth="0.35"
                opacity="0.55"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}
