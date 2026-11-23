"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Large headline whose outline fills with scroll progress through the section.
 * Props: `text` (string), optional `className`.
 */
export function ScrollFillStatement({ text, className = "" }: { text: string; className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      requestAnimationFrame(() => setProgress(1));
      return;
    }
    const el = wrapRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.25;
      const raw = (start - rect.top) / (start - end);
      setProgress(Math.max(0, Math.min(1, raw)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  return (
    <div ref={wrapRef} className={`scroll-fill-statement ${className}`.trim()}>
      <p className="scroll-fill-statement__outline font-display font-semibold" aria-hidden>
        {text}
      </p>
      <p
        className="scroll-fill-statement__fill font-display font-semibold"
        style={{ ["--fill-progress" as string]: progress }}
        aria-hidden
      >
        {text}
      </p>
      <p className="sr-only">{text}</p>
    </div>
  );
}
