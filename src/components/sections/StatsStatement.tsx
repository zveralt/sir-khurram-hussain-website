"use client";

import { useEffect, useRef, useState } from "react";
import { HandDrawnUnderline } from "@/components/widgets/HandDrawnUnderline";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Scroll-driven word opacity. Renders nothing when `text` is null. */
export function StatsStatement({ text }: { text: string | null }) {
  const wrapRef = useRef<HTMLParagraphElement>(null);
  const [progress, setProgress] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!text) return;
    if (reduced) {
      const id = requestAnimationFrame(() => setProgress(1));
      return () => cancelAnimationFrame(id);
    }
    const el = wrapRef.current;
    if (!el) return;
    let done = false;
    const onScroll = () => {
      if (done) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.9;
      const end = vh * 0.35;
      const raw = (start - rect.top) / (start - end);
      const next = Math.max(0, Math.min(1, raw));
      if (next >= 1) done = true;
      setProgress(next >= 1 ? 1 : next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced, text]);

  if (!text) return null;

  const words = text.trim().split(/\s+/);
  const phraseCount = Math.min(3, words.length);
  const lead = words.slice(0, words.length - phraseCount);
  const phrase = words.slice(words.length - phraseCount).join(" ");

  const opacityFor = (index: number) => {
    const local = progress * words.length - index;
    const t = Math.max(0, Math.min(1, local));
    return 0.25 + 0.75 * t;
  };

  return (
    <p ref={wrapRef} className="stats-statement font-display">
      {lead.map((word, i) => (
        <span key={`${word}-${i}`} style={{ opacity: opacityFor(i) }}>
          {word}{" "}
        </span>
      ))}
      <HandDrawnUnderline>
        <span style={{ opacity: opacityFor(words.length - 1) }}>{phrase}</span>
      </HandDrawnUnderline>
    </p>
  );
}
