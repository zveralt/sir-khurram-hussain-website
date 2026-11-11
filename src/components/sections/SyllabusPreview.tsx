"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { SYLLABUS_NODES } from "@/lib/syllabus";

type CategoryKey = "quran" | "seerah" | "history" | "hadith" | "faith";

const NODE_CATEGORY: Record<string, CategoryKey> = {
  "quranic-passages": "quran",
  "quran-history": "quran",
  seerah: "seerah",
  "first-community": "history",
  hadith: "hadith",
  "hadith-history": "hadith",
  caliphs: "history",
  articles: "faith",
  pillars: "faith",
};

const CATEGORIES: { key: CategoryKey; label: string }[] = [
  { key: "quran", label: "Qur'an" },
  { key: "seerah", label: "Seerah" },
  { key: "history", label: "History" },
  { key: "hadith", label: "Hadith" },
  { key: "faith", label: "Faith & Practice" },
];

const RELATED_PAIRS: [string, string][] = [
  ["quranic-passages", "quran-history"],
  ["hadith", "hadith-history"],
  ["articles", "pillars"],
  ["first-community", "caliphs"],
];

const ORBIT_R = 38;

function polar(index: number, radius = ORBIT_R) {
  const deg = -90 + index * 40;
  const rad = (deg * Math.PI) / 180;
  return {
    x: 50 + radius * Math.cos(rad),
    y: 50 + radius * Math.sin(rad),
    deg,
  };
}

function nodeIndexById(id: string) {
  return SYLLABUS_NODES.findIndex((n) => n.id === id);
}

export function SyllabusPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [legendCat, setLegendCat] = useState<CategoryKey | null>(null);

  const positions = useMemo(() => SYLLABUS_NODES.map((_, i) => polar(i)), []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const highlightCategory = hoveredId ? NODE_CATEGORY[hoveredId] : legendCat;
  const dimOthers = Boolean(hoveredId || legendCat);

  function nodeDimmed(id: string) {
    if (!dimOthers) return false;
    if (hoveredId) return hoveredId !== id;
    if (legendCat) return NODE_CATEGORY[id] !== legendCat;
    return false;
  }

  return (
    <section
      ref={sectionRef}
      id="syllabus"
      className={`section-anchor syllabus-map-premium${inView ? " syllabus-map-premium--inview" : ""}`}
    >
      <div className="syllabus-map-premium__scene" aria-hidden>
        <div className="syllabus-map-premium__glow syllabus-map-premium__glow--blue" />
        <div className="syllabus-map-premium__glow syllabus-map-premium__glow--gold" />
        <div className="syllabus-map-premium__pattern" />
        <div className="syllabus-map-premium__fade syllabus-map-premium__fade--top" />
        <div className="syllabus-map-premium__fade syllabus-map-premium__fade--bottom" />
      </div>

      <div className="shell relative z-[1] py-20 lg:py-28">
        <div className="syllabus-map-premium__layout">
          <div className="syllabus-map-premium__intro" data-reveal>
            <p className="syllabus-map-premium__eyebrow eyebrow">
              <span className="syllabus-map-premium__eyebrow-rule" aria-hidden />
              Syllabus map
            </p>
            <h2 className="syllabus-map-premium__title mt-5 font-display">
              <span className="syllabus-map-premium__title-lead">Nine fields.</span>{" "}
              <span className="syllabus-map-premium__title-accent">One subject.</span>
            </h2>
            <p className="syllabus-map-premium__lede mt-6">
              A radial map of SKH’s published Islamiyat companions. It is a study orientation, not a reprint of
              the Cambridge specification.
            </p>
            <Link href="/syllabus-map" className="btn btn-primary mt-8 inline-flex">
              Open the syllabus map <span className="arrow">→</span>
            </Link>
            <p className="syllabus-map-premium__cta-note mt-4">Interactive study orientation</p>

            <div className="syllabus-map-premium__legend mt-10" role="list" aria-label="Field categories">
              {CATEGORIES.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  role="listitem"
                  className={`syllabus-map-premium__legend-item${legendCat === c.key ? " is-active" : ""}`}
                  onMouseEnter={() => setLegendCat(c.key)}
                  onMouseLeave={() => setLegendCat(null)}
                  onFocus={() => setLegendCat(c.key)}
                  onBlur={() => setLegendCat(null)}
                >
                  <span className={`syllabus-map-premium__legend-dot syllabus-map-premium__legend-dot--${c.key}`} />
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="syllabus-map-premium__map-col">
            <div className="syllabus-constellation hidden lg:block" data-syllabus-map>
              <svg
                className="syllabus-constellation__svg"
                viewBox="0 0 100 100"
                aria-hidden
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <linearGradient id="syllabus-spoke" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--cat-line-strong)" />
                    <stop offset="100%" stopColor="var(--cat-line-fade)" />
                  </linearGradient>
                </defs>
                <circle className="syllabus-constellation__ring" cx="50" cy="50" r="26" fill="none" />
                <circle className="syllabus-constellation__ring" cx="50" cy="50" r="32" fill="none" />
                <circle className="syllabus-constellation__ring syllabus-constellation__ring--dashed" cx="50" cy="50" r="36" fill="none" />
                {RELATED_PAIRS.map(([a, b]) => {
                  const ia = nodeIndexById(a);
                  const ib = nodeIndexById(b);
                  if (ia < 0 || ib < 0) return null;
                  const pa = positions[ia];
                  const pb = positions[ib];
                  return (
                    <line
                      key={`${a}-${b}`}
                      className="syllabus-constellation__arc"
                      x1={pa.x}
                      y1={pa.y}
                      x2={pb.x}
                      y2={pb.y}
                    />
                  );
                })}
                {SYLLABUS_NODES.map((node, i) => {
                  const p = positions[i];
                  const lit = hoveredId === node.id;
                  const dim = nodeDimmed(node.id);
                  return (
                    <line
                      key={`spoke-${node.id}`}
                      x1="50"
                      y1="50"
                      x2={p.x}
                      y2={p.y}
                      className={`syllabus-constellation__spoke${lit ? " is-lit" : ""}${dim ? " is-dim" : ""}`}
                    />
                  );
                })}
              </svg>

              <div className="syllabus-constellation__hub">
                <span className="syllabus-constellation__hub-ring" aria-hidden />
                <span className="syllabus-constellation__hub-label font-heading">Islamiyat</span>
                <span className="syllabus-constellation__hub-code font-mono">2058</span>
              </div>

              <ul className="syllabus-constellation__nodes">
                {SYLLABUS_NODES.map((node, i) => {
                  const p = positions[i];
                  const cat = NODE_CATEGORY[node.id];
                  const lit = hoveredId === node.id;
                  const dim = nodeDimmed(node.id);
                  return (
                    <li
                      key={node.id}
                      className="syllabus-constellation__node-wrap"
                      style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        ["--float-delay" as string]: `${i * 0.7}s`,
                        ["--enter-delay" as string]: `${0.42 + i * 0.08}s`,
                      }}
                    >
                      <Link
                        href={`/syllabus-map?topic=${node.id}`}
                        className={`syllabus-constellation__node syllabus-constellation__node--${cat}${lit ? " is-lit" : ""}${dim ? " is-dim" : ""}`}
                        aria-label={`Field ${node.n}: ${node.title}`}
                        onMouseEnter={() => setHoveredId(node.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onFocus={() => setHoveredId(node.id)}
                        onBlur={() => setHoveredId(null)}
                      >
                        <span className="syllabus-constellation__node-num font-mono">{node.n}</span>
                        <span className="syllabus-constellation__node-title font-heading">{node.title}</span>
                      </Link>
                      <div
                        className={`syllabus-constellation__tooltip${lit ? " is-visible" : ""}`}
                        role="tooltip"
                        aria-hidden={!lit}
                      >
                        <span className="syllabus-constellation__tooltip-cat font-mono">
                          {CATEGORIES.find((c) => c.key === cat)?.label}
                        </span>
                        <span className="syllabus-constellation__tooltip-title font-heading">{node.title}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="syllabus-map-mobile lg:hidden">
              <div className="syllabus-map-mobile__decor" aria-hidden>
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  <circle cx="50" cy="50" r="18" fill="none" className="syllabus-map-mobile__decor-ring" />
                  <circle cx="50" cy="50" r="28" fill="none" className="syllabus-map-mobile__decor-ring" />
                  <circle cx="50" cy="50" r="36" fill="none" className="syllabus-map-mobile__decor-ring syllabus-map-mobile__decor-ring--dash" />
                  <circle cx="50" cy="50" r="6" className="syllabus-map-mobile__decor-hub" />
                </svg>
              </div>
              <ul className="syllabus-map-mobile__grid">
                {SYLLABUS_NODES.map((node) => {
                  const cat = NODE_CATEGORY[node.id];
                  return (
                    <li key={node.id} className="syllabus-map-mobile__item">
                      <Link
                        href={`/syllabus-map?topic=${node.id}`}
                        className={`syllabus-map-mobile__card syllabus-map-mobile__card--${cat}`}
                      >
                        <span className="syllabus-map-mobile__card-num font-display" aria-hidden>
                          {node.n}
                        </span>
                        <span className="syllabus-map-mobile__chip font-mono">
                          <span className={`syllabus-map-premium__legend-dot syllabus-map-premium__legend-dot--${cat}`} />
                          {CATEGORIES.find((c) => c.key === cat)?.label}
                        </span>
                        <span className="syllabus-map-mobile__card-title font-heading">{node.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
