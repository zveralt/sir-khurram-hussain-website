"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SKH_BOOKS_URL, SYLLABUS_EDGES, SYLLABUS_NODES, SYLLABUS_NOTE } from "@/lib/syllabus";

export function SyllabusMap() {
  const [active, setActive] = useState(SYLLABUS_NODES[0].id);
  const node = SYLLABUS_NODES.find((n) => n.id === active) ?? SYLLABUS_NODES[0];
  const byId = useMemo(() => Object.fromEntries(SYLLABUS_NODES.map((n) => [n.id, n])), []);

  return (
    <section id="syllabus" className="section-anchor border-t border-line">
      <div className="shell py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-7" data-reveal>
            <p className="eyebrow eyebrow-accent">Syllabus map</p>
            <h2 className="mt-5 font-heading text-h2 font-semibold text-fg max-w-[16ch]">
              Nine connected fields of Islamiyat study.
            </h2>
          </div>
          <p className="lg:col-span-5 text-soft leading-relaxed" data-reveal>
            {SYLLABUS_NOTE} Official assessment detail remains with Cambridge and with SKH’s
            published companions.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-8 min-w-0">
            <div className="relative hidden md:block aspect-[4/3] overflow-hidden border border-line bg-raised/40">
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
                {SYLLABUS_EDGES.map(([a, b]) => {
                  const from = byId[a];
                  const to = byId[b];
                  const lit = active === a || active === b;
                  return (
                    <line
                      key={`${a}-${b}`}
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      className={lit ? "stroke-accent-hot" : "stroke-line-strong"}
                      strokeWidth={lit ? 0.45 : 0.22}
                    />
                  );
                })}
              </svg>
              {SYLLABUS_NODES.map((n) => {
                const on = n.id === active;
                return (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => setActive(n.id)}
                    aria-pressed={on}
                    aria-label={`${n.title}, paper ${n.paper}`}
                    className={`absolute z-[1] flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border font-mono text-xs transition-shadow ${
                      on
                        ? "border-accent-hot bg-midnight text-white shadow-[0_0_32px_rgba(18,101,255,0.4)]"
                        : "border-line bg-raised text-fg hover:border-accent-hot"
                    }`}
                    style={{ left: `${n.x}%`, top: `${n.y}%` }}
                  >
                    {n.n}
                  </button>
                );
              })}
            </div>

            <ul className="md:hidden divide-y divide-line border-y border-line">
              {SYLLABUS_NODES.map((n) => (
                <li key={n.id}>
                  <button
                    type="button"
                    onClick={() => setActive(n.id)}
                    aria-pressed={n.id === active}
                    className={`flex w-full items-baseline justify-between gap-4 py-4 text-left ${
                      n.id === active ? "text-accent-hot" : "text-fg"
                    }`}
                  >
                    <span className="font-heading text-lg font-semibold">{n.title}</span>
                    <span className="font-mono text-xs text-muted">{n.n}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:col-span-4 relative z-[1] spot-surface border border-line-strong bg-raised p-7 lg:p-8">
            <p className="eyebrow eyebrow-accent">
              Paper {node.paper} · {node.n}
            </p>
            <h3 className="mt-4 font-heading text-h3 font-semibold text-fg">{node.title}</h3>
            <p className="mt-4 text-soft leading-relaxed">{node.intro}</p>
            <p className="mt-8 eyebrow">SKH companions</p>
            <ul className="mt-3 space-y-2 text-sm text-fg">
              {node.companions.map((c) => (
                <li key={c} className="border-b border-line pb-2">
                  {c}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3">
              <a
                href={SKH_BOOKS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                Open SKH index ↗
              </a>
              <Link href="/store" className="btn btn-primary">
                Course fixtures <span className="arrow">→</span>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
