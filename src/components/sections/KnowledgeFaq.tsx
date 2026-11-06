"use client";

import { useMemo, useState } from "react";
import { FAQ_ITEMS, type FaqItem } from "@/lib/faq";

const CATS = ["All", "Courses", "Resources", "Islamiyat", "Digital", "Enrolment"] as const;

export function KnowledgeFaq({ compact = false }: { compact?: boolean }) {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(FAQ_ITEMS[0].id);

  const items = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return FAQ_ITEMS.filter((item) => {
      if (cat !== "All" && item.cat !== cat) return false;
      if (!needle) return true;
      return `${item.q} ${item.a}`.toLowerCase().includes(needle);
    });
  }, [cat, q]);

  return (
    <section id="faq" className={`section-anchor ${compact ? "" : "border-t border-line bg-sunken/50"}`}>
      <div className={`shell ${compact ? "pb-24 lg:pb-32" : "py-20 lg:py-28"}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4" data-reveal>
            {compact ? null : (
              <>
                <p className="eyebrow eyebrow-accent">Knowledge</p>
                <h2 className="mt-5 font-heading text-h2 font-semibold text-fg">
                  Questions, answered without theatre.
                </h2>
                <p className="mt-5 text-soft leading-relaxed">
                  No chatbot. Search the studio’s published answers on access, resources, and
                  enrolment.
                </p>
              </>
            )}
            <label className={`${compact ? "" : "mt-8 "}block`}>
              <span className="sr-only">Search questions</span>
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search questions"
                className="field"
              />
            </label>
            <div className="mt-6 flex flex-wrap gap-2">
              {CATS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCat(c)}
                  className={`rounded-full border px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] ${
                    cat === c
                      ? "border-accent-hot bg-accent-hot text-white"
                      : "border-line text-muted hover:border-accent-hot"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 divide-y divide-line border-y border-line">
            {items.length === 0 ? (
              <p className="py-10 text-muted">No matching questions.</p>
            ) : (
              items.map((item: FaqItem) => {
                const isOpen = open === item.id;
                return (
                  <article key={item.id}>
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpen(isOpen ? null : item.id)}
                        className="flex w-full items-start justify-between gap-6 py-6 text-left"
                      >
                        <span className="font-heading text-xl font-semibold text-fg">{item.q}</span>
                        <span className="mt-1 font-mono text-xs text-accent-hot">{isOpen ? "–" : "+"}</span>
                      </button>
                    </h3>
                    {isOpen ? (
                      <p className="pb-6 max-w-prose text-soft leading-relaxed">{item.a}</p>
                    ) : null}
                  </article>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
