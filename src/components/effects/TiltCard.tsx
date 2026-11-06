"use client";

import { type ReactNode, useRef } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function TiltCard({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={`tilt-card spot-surface ${className}`}
      onMouseMove={(e) => {
        const node = ref.current;
        if (!node) return;
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        const r = node.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        node.style.setProperty("--rx", `${(0.5 - py) * 8}deg`);
        node.style.setProperty("--ry", `${(px - 0.5) * 10}deg`);
        node.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
        node.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
      }}
      onMouseLeave={() => {
        const node = ref.current;
        if (!node) return;
        node.style.setProperty("--rx", "0deg");
        node.style.setProperty("--ry", "0deg");
      }}
    >
      {children}
    </div>
  );
}
