"use client";

import { useEffect, useState } from "react";
import { ProgressRing } from "@/components/widgets/ProgressRing";
import { useScrollProgress } from "@/hooks/useScrollProgress";

/**
 * Scroll-to-top control with embedded progress ring; visible after ~one viewport scroll.
 * Props: `heroRatio` threshold multiplier (default 0.85).
 */
export function ScrollTopButton({ heroRatio = 0.85 }: { heroRatio?: number }) {
  const [visible, setVisible] = useState(false);
  const progress = useScrollProgress();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * heroRatio);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [heroRatio]);

  return (
    <button
      type="button"
      className={`widget-scroll-top${visible ? " widget-scroll-top--visible" : ""}`}
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <span className="relative grid place-items-center">
        <ProgressRing value={progress * 100} size={48} strokeWidth={4} showValue={false} className="absolute inset-0" />
        <span className="font-mono text-[0.65rem]" aria-hidden>
          ↑
        </span>
      </span>
    </button>
  );
}
