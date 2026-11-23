"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { SYLLABUS_NODES } from "@/lib/syllabus";
import { categoryForNode, categoryLabel } from "@/lib/syllabus-categories";

const ORBIT_R = 38;

function polar(index: number, radius = ORBIT_R) {
  const deg = -90 + index * 40;
  const rad = (deg * Math.PI) / 180;
  return { x: 50 + radius * Math.cos(rad), y: 50 + radius * Math.sin(rad), deg };
}

/** Compact radial map for syllabus section toggle — reuses existing constellation styles. */
export function SyllabusRadialEmbed() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const positions = useMemo(() => SYLLABUS_NODES.map((_, i) => polar(i)), []);

  useEffect(() => {
    const el = sectionRef.current;
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
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className={`syllabus-map-premium syllabus-map-premium--inview${inView ? "" : ""}`}>
      <div className="syllabus-constellation max-lg:hidden mx-auto" data-syllabus-map style={{ maxWidth: "28rem" }}>
        <svg className="syllabus-constellation__svg" viewBox="0 0 100 100" aria-hidden>
          <circle className="syllabus-constellation__ring" cx="50" cy="50" r="26" fill="none" />
          <circle className="syllabus-constellation__ring" cx="50" cy="50" r="32" fill="none" />
          {SYLLABUS_NODES.map((node, i) => {
            const p = positions[i];
            const lit = hoveredId === node.id;
            return (
              <line
                key={`spoke-${node.id}`}
                x1="50"
                y1="50"
                x2={p.x}
                y2={p.y}
                className={`syllabus-constellation__spoke${lit ? " is-lit" : ""}`}
              />
            );
          })}
        </svg>
        <div className="syllabus-constellation__hub">
          <span className="syllabus-constellation__hub-label font-heading">Islamiyat</span>
          <span className="syllabus-constellation__hub-code font-mono">2058</span>
        </div>
        <ul className="syllabus-constellation__nodes">
          {SYLLABUS_NODES.map((node, i) => {
            const p = positions[i];
            const cat = categoryForNode(node);
            const lit = hoveredId === node.id;
            return (
              <li
                key={node.id}
                className="syllabus-constellation__node-wrap"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              >
                <Link
                  href={`/syllabus-map?topic=${node.id}`}
                  className={`syllabus-constellation__node syllabus-constellation__node--${cat}${lit ? " is-lit" : ""}`}
                  onMouseEnter={() => setHoveredId(node.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setHoveredId(node.id)}
                  onBlur={() => setHoveredId(null)}
                >
                  <span className="syllabus-constellation__node-num font-mono">{node.n}</span>
                  <span className="syllabus-constellation__node-title font-heading">{node.title}</span>
                </Link>
                <div className={`syllabus-constellation__tooltip${lit ? " is-visible" : ""}`} role="tooltip">
                  <span className="syllabus-constellation__tooltip-cat font-mono">{categoryLabel(cat)}</span>
                  <span className="syllabus-constellation__tooltip-title font-heading">{node.title}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <p className="mt-4 text-center text-sm text-muted lg:hidden">
        <Link href="/syllabus-map" className="link-u">
          Open full syllabus map
        </Link>
      </p>
    </div>
  );
}
