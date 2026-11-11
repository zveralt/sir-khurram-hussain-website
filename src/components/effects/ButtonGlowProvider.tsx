"use client";

import { useEffect } from "react";

/** Cursor-tracked glow on all `.btn` elements (skh-demo GlowButton behaviour, site-wide). */
export function ButtonGlowProvider() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;

    const setGlow = (el: HTMLElement, clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--btn-glow-x", `${clientX - rect.left}px`);
      el.style.setProperty("--btn-glow-y", `${clientY - rect.top}px`);
    };

    const onPointerMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>(".btn");
      if (!el) return;
      setGlow(el, e.clientX, e.clientY);
    };

    const onPointerOut = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>(".btn");
      if (!el) return;
      const next = e.relatedTarget;
      if (next instanceof Node && el.contains(next)) return;
      el.style.setProperty("--btn-glow-x", "50%");
      el.style.setProperty("--btn-glow-y", "50%");
    };

    document.addEventListener("pointermove", onPointerMove, true);
    document.addEventListener("pointerout", onPointerOut, true);
    return () => {
      document.removeEventListener("pointermove", onPointerMove, true);
      document.removeEventListener("pointerout", onPointerOut, true);
    };
  }, []);

  return null;
}
