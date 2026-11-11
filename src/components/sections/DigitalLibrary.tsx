"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LibraryBookCover } from "@/components/library/LibraryBookCover";
import { LibraryMotifs } from "@/components/library/LibraryMotifs";
import { Cover } from "@/components/ui/Cover";
import { Spotlight } from "@/components/ui/Spotlight";
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

function useFilterCounts() {
  return useMemo(() => {
    const counts: Record<string, number> = { All: LIBRARY_TITLES.length };
    for (const f of FILTERS) {
      if (f === "All") continue;
      counts[f] = LIBRARY_TITLES.filter((t) => t.series === f).length;
    }
    return counts;
  }, []);
}

function DigitalLibraryCompact() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const titles = useMemo(
    () => (filter === "All" ? LIBRARY_TITLES : LIBRARY_TITLES.filter((t) => t.series === filter)),
    [filter],
  );

  return (
    <section id="library" className="section-anchor border-t border-line">
      <div className="shell pb-24 lg:pb-32">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Library categories">
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
              <Spotlight className="h-full" size={360}>
                <a
                  href={SKH_BOOKS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group card-glow block rounded-[var(--spot-radius)] border border-transparent p-2"
                >
                  <div className="book-3d">
                    <Cover title={t.title} series={t.series} no={t.no} tone={tones[t.series]} />
                  </div>
                  <p className="mt-4 font-heading text-sm font-semibold leading-snug text-fg">{t.title}</p>
                  <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
                    {t.series}
                  </p>
                </a>
              </Spotlight>
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

function DigitalLibraryPremium() {
  const reduceMotion = useReducedMotion() ?? false;
  const counts = useFilterCounts();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLUListElement>(null);
  const filterRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0, pointerId: 0 });

  const [thumbStyle, setThumbStyle] = useState({ width: "20%", left: "0%" });
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [visibleIndex, setVisibleIndex] = useState(1);

  const titles = useMemo(
    () => (filter === "All" ? LIBRARY_TITLES : LIBRARY_TITLES.filter((t) => t.series === filter)),
    [filter],
  );

  const syncScrollState = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const left = el.scrollLeft;
    setAtStart(left <= 2);
    setAtEnd(maxScroll <= 2 || left >= maxScroll - 2);
    const ratio = maxScroll > 0 ? left / maxScroll : 0;
    const thumbFrac = Math.min(1, Math.max(0.1, el.clientWidth / Math.max(el.scrollWidth, 1)));
    const travel = 1 - thumbFrac;
    setThumbStyle({
      width: `${thumbFrac * 100}%`,
      left: `${ratio * travel * 100}%`,
    });

    const slides = el.querySelectorAll<HTMLElement>(".library-premium__slide");
    const containerLeft = el.getBoundingClientRect().left;
    let best = 0;
    let bestDelta = Infinity;
    slides.forEach((slide, idx) => {
      const delta = Math.abs(slide.getBoundingClientRect().left - containerLeft);
      if (delta < bestDelta) {
        bestDelta = delta;
        best = idx;
      }
    });
    setVisibleIndex(best + 1);
  }, []);

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
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" },
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    syncScrollState();
    el.addEventListener("scroll", syncScrollState, { passive: true });
    window.addEventListener("resize", syncScrollState);
    return () => {
      el.removeEventListener("scroll", syncScrollState);
      window.removeEventListener("resize", syncScrollState);
    };
  }, [syncScrollState, titles.length]);

  useEffect(() => {
    const btn = filterRefs.current[filter];
    btn?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest", inline: "center" });
  }, [filter, reduceMotion]);

  useEffect(() => {
    carouselRef.current?.scrollTo({ left: 0, behavior: reduceMotion ? "auto" : "smooth" });
    syncScrollState();
  }, [filter, reduceMotion, syncScrollState]);

  const scrollByCover = useCallback(
    (direction: -1 | 1) => {
      const el = carouselRef.current;
      if (!el) return;
      const first = el.querySelector<HTMLElement>(".library-premium__slide");
      const gap = parseFloat(getComputedStyle(el).gap || "28") || 28;
      const step = (first?.offsetWidth ?? 240) + gap;
      el.scrollBy({ left: direction * step, behavior: reduceMotion ? "auto" : "smooth" });
    },
    [reduceMotion],
  );

  const onCarouselKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollByCover(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollByCover(1);
      }
    },
    [scrollByCover],
  );

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLUListElement>) => {
    if (e.button !== 0) return;
    const el = carouselRef.current;
    if (!el) return;
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      pointerId: e.pointerId,
    };
    el.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLUListElement>) => {
    const el = carouselRef.current;
    const drag = dragRef.current;
    if (!el || !drag.active) return;
    el.scrollLeft = drag.startScroll - (e.clientX - drag.startX);
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLUListElement>) => {
    const el = carouselRef.current;
    if (!el) return;
    dragRef.current.active = false;
    if (el.hasPointerCapture(e.pointerId)) {
      el.releasePointerCapture(e.pointerId);
    }
    syncScrollState();
  }, [syncScrollState]);

  const motionTransition = reduceMotion ? { duration: 0 } : { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section
      ref={sectionRef}
      id="library"
      className={`section-anchor library-premium${inView ? " library-premium--inview" : ""}`}
    >
      <LibraryMotifs />
      <div className="library-premium__scene" aria-hidden>
        <div className="library-premium__grid" />
        <div className="library-premium__glow library-premium__glow--blue" />
        <div className="library-premium__glow library-premium__glow--emerald" />
        <div className="library-premium__fade library-premium__fade--top" />
        <div className="library-premium__fade library-premium__fade--bottom" />
      </div>

      <div className="shell relative z-[1] py-20 lg:py-28">
        <header className="library-premium__header">
          <div className="library-premium__header-main">
            <p className="library-premium__eyebrow eyebrow">Academic library</p>
            <h2 className="library-premium__title mt-4 font-display font-semibold">
              <span className="library-premium__title-line">Thirteen published</span>{" "}
              <span className="library-premium__title-accent">companions.</span>
            </h2>
          </div>
          <p className="library-premium__lede">
            Titles as listed on SKH’s public books-and-notes index. Typographic covers only — these are not product
            photographs, and files are not hosted here.
          </p>
        </header>

        <div
          className="library-premium__filters-shell"
          role="tablist"
          aria-label="Library categories"
        >
          <div className="library-premium__filters-mask">
            <div className="library-premium__filter-track">
              {FILTERS.map((f) => {
                const selected = filter === f;
                return (
                  <button
                    key={f}
                    ref={(node) => {
                      filterRefs.current[f] = node;
                    }}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-pressed={selected}
                    onClick={() => setFilter(f)}
                    className="library-premium__filter-btn"
                  >
                    {selected ? (
                      <motion.span
                        layoutId="library-filter-indicator"
                        className="library-premium__filter-indicator"
                        transition={{ type: "spring", stiffness: 420, damping: 36 }}
                      />
                    ) : null}
                    <span className="library-premium__filter-label">
                      {f}
                      <span className="library-premium__filter-count">{counts[f]}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="library-premium__stage">
          <div className="library-premium__carousel-mask">
            <LayoutGroup>
              <motion.ul
                ref={carouselRef}
                className="library-premium__carousel"
                layout
                tabIndex={0}
                role="region"
                aria-label="Academic library"
                onKeyDown={onCarouselKeyDown}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onScroll={syncScrollState}
              >
                <AnimatePresence mode="popLayout">
                  {titles.map((t, i) => (
                    <motion.li
                      key={t.no}
                      className="library-premium__slide"
                      layout
                      initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
                      transition={{
                        ...motionTransition,
                        delay: reduceMotion ? 0 : inView ? i * 0.06 : 0,
                      }}
                    >
                      <LibraryBookCover title={t.title} series={t.series} no={t.no} reduceMotion={reduceMotion} />
                    </motion.li>
                  ))}
                </AnimatePresence>
              </motion.ul>
            </LayoutGroup>
          </div>
          <div className="library-premium__shelf" aria-hidden />
        </div>

        <div className="library-premium__controls">
          <div className="library-premium__progress-wrap">
            <div className="library-premium__progress-track" aria-hidden>
              <span
                className="library-premium__progress-thumb"
                style={{ width: thumbStyle.width, left: thumbStyle.left }}
              />
            </div>
            <p className="library-premium__progress-readout font-mono" aria-live="polite">
              {String(visibleIndex).padStart(2, "0")} / {String(titles.length).padStart(2, "0")}
            </p>
          </div>
          <div className="library-premium__nav">
            <button
              type="button"
              className="library-premium__nav-btn"
              aria-label="Previous books"
              disabled={atStart}
              onClick={() => scrollByCover(-1)}
            >
              <ChevronLeft strokeWidth={1.75} aria-hidden />
            </button>
            <button
              type="button"
              className="library-premium__nav-btn"
              aria-label="Next books"
              disabled={atEnd}
              onClick={() => scrollByCover(1)}
            >
              <ChevronRight strokeWidth={1.75} aria-hidden />
            </button>
          </div>
        </div>

        <div className="library-premium__actions">
          <a
            href={SKH_BOOKS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="library-premium__action library-premium__action--primary btn btn-primary"
          >
            SKH books &amp; notes ↗
          </a>
          <Link
            href="/store"
            className="library-premium__action library-premium__action--ghost btn btn-ghost"
          >
            Digital fixtures <span className="library-premium__action-arrow arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function DigitalLibrary({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return <DigitalLibraryCompact />;
  }
  return <DigitalLibraryPremium />;
}
