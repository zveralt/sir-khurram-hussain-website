"use client";

import { useId } from "react";
import { useWidgetInView } from "@/hooks/useWidgetInView";

/**
 * Circular progress indicator (0–100).
 * Props: `value`, `label`, `size`, `strokeWidth`, `showValue`, `className`.
 */
export function ProgressRing({
  value,
  label,
  size = 88,
  strokeWidth = 6,
  showValue = true,
  className = "",
}: {
  value: number;
  label?: string;
  size?: number;
  strokeWidth?: number;
  showValue?: boolean;
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  const { ref, inView, reducedMotion } = useWidgetInView();
  const id = useId();
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - (reducedMotion || inView ? clamped / 100 : 0));

  return (
    <div ref={ref} className={`inline-flex flex-col items-center gap-2 ${className}`.trim()} role="img" aria-label={label ?? `${clamped}%`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="color-mix(in srgb, var(--widget-stroke) 35%, transparent)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#widget-ring-grad${id})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: reducedMotion ? undefined : "stroke-dashoffset 1s cubic-bezier(0.22, 1, 0.36, 1)" }}
        />
        <defs>
          <linearGradient id={`widget-ring-grad${id}`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={size} y2={size}>
            <stop offset="0%" stopColor="var(--widget-emerald)" />
            <stop offset="100%" stopColor="var(--widget-blue)" />
          </linearGradient>
        </defs>
      </svg>
      {showValue ? (
        <span className="font-mono text-xs text-muted" aria-hidden>
          {Math.round(clamped)}%
        </span>
      ) : null}
      {label ? <span className="sr-only">{label}</span> : null}
    </div>
  );
}
