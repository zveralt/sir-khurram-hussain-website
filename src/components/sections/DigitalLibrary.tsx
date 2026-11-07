"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Cover } from "@/components/ui/Cover";
import { LIBRARY_TITLES, SKH_BOOKS_URL, type LibraryTitle } from "@/lib/library";

const FILTERS = ["All", "Qur'an", "Seerah", "Hadith", "History", "Faith & Practice", "Examination"] as const;

const tones: Record<LibraryTitle["series"], "ink" | "paper" | "bronze"> = {
  "Qur'an": "ink",
  Seerah: "bronze",
  Hadith: "paper",
  History: "ink",
  "Faith & Practice": "bronze",
  Examination: "paper",
};

export function DigitalLibrary({ compact = false }: { compact?: boolean }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const titles = useMemo(
    () => (filter === "All" ? LIBRARY_TITLES : LIBRARY_TITLES.filter((t) => t.series === filter)),
    [filter],
  );

  return (
    <section
      id="library"
      className={`section-anchor atmosphere-grid ${compact ? "" : "border-t border-line"}`}
    >
      <div className={`shell ${compact ? "pb-24 lg:pb-32" : "py-20 lg:py-28"}`}>
        {compact ? null : (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8" data-reveal>
            <div>
              <p className="eyebrow eyebrow-accent">Academic library</p>
              <h2 className="mt-4 font-heading text-h2 font-semibold text-fg max-w-[16ch]">
                Thirteen published companions.
              </h2>
            </div>
            <p className="max-w-sm text-soft leading-relaxed">
              Titles as listed on SKH’s public books-and-notes index. Typographic covers only —
              these are not product photographs, and files are not hosted here.
            </p>
          </div>
        )}

        <div className={`${compact ? "" : "mt-12 "}flex flex-wrap gap-2`} role="tablist" aria-label="Library categories">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-3.5 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.14em] transition-colors ${
                filter === f
                  ? "border-accent-hot bg-accent-hot text-white"
                  : "border-line text-muted hover:border-accent-hot hover:text-fg"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <ul className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {titles.map((t, i) => (
            <li key={t.no} data-reveal style={{ ["--reveal-delay" as string]: `${(i % 8) * 50}ms` }}>
              <a
                href={SKH_BOOKS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="book-3d">
                  <Cover title={t.title} series={t.series} no={t.no} tone={tones[t.series]} />
                </div>
                <p className="mt-4 font-heading text-sm font-semibold leading-snug text-fg">{t.title}</p>
                <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
                  {t.series}
                </p>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap gap-3">
          <a href={SKH_BOOKS_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            SKH books &amp; notes ↗
          </a>
          <Link href="/store" className="btn btn-primary">
            Digital fixtures <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
