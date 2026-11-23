"use client";

import { useEffect, useState } from "react";
import { ENABLE_CURSOR_RING } from "@/components/widgets/constants";
import { useFinePointer } from "@/lib/use-fine-pointer";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Subtle cursor-following ring (desktop fine pointer only). Toggle via `ENABLE_CURSOR_RING`.
 * Mount once at app shell; no props.
 */
export function CursorRing() {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!ENABLE_CURSOR_RING || !fine || reduced) return;
    const move = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--cursor-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${e.clientY}px`);
      setOn(true);
    };
    const leave = () => setOn(false);
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, [fine, reduced]);

  if (!ENABLE_CURSOR_RING || !fine || reduced) return null;

  return <div className={`widget-cursor-ring${on ? " widget-cursor-ring--on" : ""}`} aria-hidden />;
}
