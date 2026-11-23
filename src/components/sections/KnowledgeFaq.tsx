"use client";

import { motion } from "framer-motion";
import { Minus, Plus, Search, X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { SectionScene } from "@/components/ui/SectionScene";
import { useSectionInView } from "@/hooks/useSectionInView";
import { FAQ_ITEMS, type FaqItem } from "@/lib/faq";

const CATS = ["All", "Courses", "Resources", "Islamiyat", "Digital", "Enrolment"] as const;

function useFaqCounts() {
  return useMemo(() => {
    const counts: Record<string, number> = { All: FAQ_ITEMS.length };
    for (const c of CATS) {
      if (c === "All") continue;
      counts[c] = FAQ_ITEMS.filter((item) => item.cat === c).length;
    }
    return counts;
  }, []);
}

export function KnowledgeFaq({ compact = false }: { compact?: boolean }) {
  const { sectionRef, inView } = useSectionInView();
  const counts = useFaqCounts();
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

  const onQuestionKeyDown = useCallback(
    (e: React.KeyboardEvent, item: FaqItem, index: number) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen(open === item.id ? null : item.id);
        return;
      }
      const next = e.key === "ArrowDown" ? index + 1 : e.key === "ArrowUp" ? index - 1 : -1;
      if (next < 0 || next >= items.length) return;
      e.preventDefault();
      const btn = document.getElementById(`faq-q-${items[next].id}`);
      btn?.focus();
    },
    [items, open],
  );

  if (compact) {
    return (
      <section id="faq" className="section-anchor">
        <div className="shell pb-24 lg:pb-32">
          <CompactFaq cat={cat} setCat={setCat} q={q} setQ={setQ} open={open} setOpen={setOpen} items={items} counts={counts} />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="faq"
      className={`section-anchor section-premium faq-premium section-premium--alt${
        inView ? " section-premium--inview" : ""
      }`}
    >
      <SectionScene emerald />
      <div className="shell section-premium__shell">
        <div className="faq-premium__layout">
          <aside className="faq-premium__sidebar">
            <header className="section-premium__header section-premium__header--stacked" style={{ marginBottom: "1.5rem" }}>
              <div data-premium-reveal>
                <p className="section-premium__eyebrow eyebrow">Knowledge</p>
                <h2 className="section-premium__title mt-4 font-display font-semibold">
                  <span className="section-premium__title-line">Questions, answered</span>{" "}
                  <span className="section-premium__title-accent">clearly.</span>
                </h2>
                <p className="section-premium__lede mt-5" style={{ maxWidth: "none" }}>
                  Search published answers on access, resources, and enrolment.
                </p>
              </div>
            </header>

            <div className="faq-premium__search-wrap" data-premium-reveal style={{ ["--reveal-delay" as string]: "100ms" }}>
              <Search className="faq-premium__search-icon" aria-hidden />
              <label>
                <span className="sr-only">Search questions</span>
                <input
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search questions"
                  className="faq-premium__search"
                />
              </label>
              {q ? (
                <button type="button" className="faq-premium__search-clear" aria-label="Clear search" onClick={() => setQ("")}>
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </div>

            <div
              className="mt-6 overflow-x-auto scrollbar-none"
              role="tablist"
              aria-label="FAQ categories"
              data-premium-reveal
              style={{ ["--reveal-delay" as string]: "140ms" }}
            >
              <div className="segment-control__track">
                {CATS.map((c) => {
                  const selected = cat === c;
                  return (
                    <button
                      key={c}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setCat(c)}
                      className="segment-control__btn"
                    >
                      {selected ? (
                        <motion.span layoutId="faq-filter-indicator" className="segment-control__indicator" />
                      ) : null}
                      <span className="segment-control__label">
                        {c}
                        <span className="segment-control__count">{counts[c]}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          <div className="faq-premium__list" role="region" aria-label="Frequently asked questions" data-premium-reveal style={{ ["--reveal-delay" as string]: "180ms" }}>
            {items.length === 0 ? (
              <p className="faq-premium__empty">No matching questions.</p>
            ) : (
              items.map((item, index) => {
                const isOpen = open === item.id;
                return (
                  <article key={item.id} className={`faq-premium__item${isOpen ? " faq-premium__item--open" : ""}`}>
                    <h3 className="m-0">
                      <button
                        id={`faq-q-${item.id}`}
                        type="button"
                        className="faq-premium__question"
                        aria-expanded={isOpen}
                        aria-controls={`faq-a-${item.id}`}
                        onClick={() => setOpen(isOpen ? null : item.id)}
                        onKeyDown={(e) => onQuestionKeyDown(e, item, index)}
                      >
                        <span className="faq-premium__question-text">{item.q}</span>
                        <span className="faq-premium__toggle" aria-hidden>
                          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                        </span>
                      </button>
                    </h3>
                    <div id={`faq-a-${item.id}`} className="faq-premium__answer-wrap" role="region" aria-hidden={!isOpen}>
                      <div className="faq-premium__answer-inner">
                        <p className="faq-premium__answer">{item.a}</p>
                      </div>
                    </div>
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

function CompactFaq({
  cat,
  setCat,
  q,
  setQ,
  open,
  setOpen,
  items,
  counts,
}: {
  cat: (typeof CATS)[number];
  setCat: (c: (typeof CATS)[number]) => void;
  q: string;
  setQ: (q: string) => void;
  open: string | null;
  setOpen: (id: string | null) => void;
  items: FaqItem[];
  counts: Record<string, number>;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      <div className="lg:col-span-4">
        <label className="block">
          <span className="sr-only">Search questions</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search questions" className="field" />
        </label>
        <div className="mt-6 flex flex-wrap gap-2">
          {CATS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={`rounded-full border px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] ${
                cat === c ? "border-accent-hot bg-accent-hot text-white" : "border-line text-muted hover:border-accent-hot"
              }`}
            >
              {c} {counts[c]}
            </button>
          ))}
        </div>
      </div>
      <div className="lg:col-span-8 divide-y divide-line border-y border-line">
        {items.map((item) => {
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
              {isOpen ? <p className="pb-6 max-w-prose text-soft leading-relaxed">{item.a}</p> : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}
