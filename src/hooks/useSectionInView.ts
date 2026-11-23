"use client";

import { useEffect, useRef, useState } from "react";

export function useSectionInView(threshold = 0.08) {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -5% 0px" },
    );
    io.observe(section);
    return () => io.disconnect();
  }, [threshold]);

  return { sectionRef, inView };
}
