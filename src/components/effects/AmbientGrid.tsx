"use client";

import { useEffect, useRef } from "react";

/** Fixed architectural grid + interpolated cursor spotlight. CSS-masked, no canvas. */
export function AmbientGrid() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;

    if (!fine || reduce) {
      root.style.setProperty("--mouse-x", "72%");
      root.style.setProperty("--mouse-y", "28%");
      return;
    }

    let raf = 0;
    let tx = window.innerWidth * 0.72;
    let ty = window.innerHeight * 0.28;
    let cx = tx;
    let cy = ty;

    const tick = () => {
      cx += (tx - cx) * 0.14;
      cy += (ty - cy) * 0.14;
      root.style.setProperty("--mouse-x", `${cx}px`);
      root.style.setProperty("--mouse-y", `${cy}px`);
      if (Math.abs(tx - cx) > 0.4 || Math.abs(ty - cy) > 0.4) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      schedule();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    schedule();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="adaptive-grid pointer-events-none fixed inset-0 z-0 motion-reduce:opacity-90"
    >
      <div className="absolute inset-0 studio-grid-base" />
      <div className="absolute inset-0 studio-grid-cursor max-md:opacity-0 [@media(hover:none)]:opacity-0 motion-reduce:opacity-35" />
      <div className="adaptive-grid__glow absolute inset-0 max-md:opacity-0 [@media(hover:none)]:opacity-0 motion-reduce:opacity-20" />
    </div>
  );
}
