"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Options = {
  threshold?: number;
  rootMargin?: string;
};

/** Fires once when the node enters the viewport; respects prefers-reduced-motion (immediate). */
export function useWidgetInView<T extends HTMLElement = HTMLDivElement>(options?: Options) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const active = reducedMotion || inView;

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      const frame = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(frame);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      {
        threshold: options?.threshold ?? 0.12,
        rootMargin: options?.rootMargin ?? "0px 0px -6% 0px",
      },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reducedMotion, options?.threshold, options?.rootMargin]);

  return { ref, inView: active, reducedMotion };
}
