"use client";

import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import { useFinePointer } from "@/lib/use-fine-pointer";

interface SpotlightProps {
  children: ReactNode;
  className?: string;
  size?: number;
  borderRadius?: string;
  style?: CSSProperties;
}

/** Cursor-tracked border + surface glow (ported from skh-demo). */
export function Spotlight({
  children,
  className = "",
  size = 420,
  borderRadius = "var(--spot-radius, 0.875rem)",
  style,
}: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !fine) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    el.style.setProperty("--opacity", "1");
  };

  const onLeave = () => {
    ref.current?.style.setProperty("--opacity", "0");
  };

  return (
    <div
      ref={ref}
      onPointerMove={fine ? onMove : undefined}
      onPointerLeave={fine ? onLeave : undefined}
      className={`spotlight-card ${className}`.trim()}
      style={
        {
          "--spot-size": `${size}px`,
          "--spot-radius": borderRadius,
          "--mx": "50%",
          "--my": "50%",
          "--opacity": "0",
          ...style,
        } as CSSProperties
      }
    >
      <div aria-hidden className="spotlight-border" />
      <div aria-hidden className="spotlight-glow" />
      <div className="spotlight-card__inner">{children}</div>
    </div>
  );
}
