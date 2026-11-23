"use client";

import type { ReactNode } from "react";
import { useWidgetInView } from "@/hooks/useWidgetInView";

/**
 * Wraps children with an emerald hand-drawn SVG underline.
 * Props: `color` stroke color, `className` on wrapper.
 * Draws via stroke-dashoffset when scrolled into view (once).
 */
export function HandDrawnUnderline({
  children,
  color = "var(--widget-emerald, #3fbf9a)",
  className = "",
}: {
  children: ReactNode;
  color?: string;
  className?: string;
}) {
  const { ref, inView } = useWidgetInView<HTMLSpanElement>();

  return (
    <span ref={ref} className={`widget-hand-underline ${className}`.trim()}>
      {children}
      <svg viewBox="0 0 120 12" aria-hidden preserveAspectRatio="none">
        <path
          d="M2 8 C 28 2, 52 11, 78 6 S 112 4, 118 7"
          fill="none"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={inView ? 0 : 1}
          style={{
            transition: inView ? "stroke-dashoffset 0.9s cubic-bezier(0.22, 1, 0.36, 1)" : undefined,
          }}
        />
      </svg>
    </span>
  );
}
