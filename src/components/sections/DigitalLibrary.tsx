"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
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
            Course catalogue <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function DigitalLibraryPremium({
  embedded = false,
  onBookDetail,
}: {
  embedded?: boolean;
  onBookDetail?: (book: LibraryTitle) => void;
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const counts = useFilterCounts();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const carouselRef = useRef<HTMLUListElement>(null);
  const filterScrollRef = useRef<HTMLDivElement>(null);
  const filterRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0, pointerId: 0 });

  const [thumbStyle, setThumbStyle] = useState({ width: "20%", left: "0%" });
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [visibleIndex, setVisibleIndex] = useState(1);
  const [filterFadeLeft, setFilterFadeLeft] = useState(false);
  const [filterFadeRight, setFilterFadeRight] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const filterSeen = useRef<(typeof FILTERS)[number]>("All");

  const titles = useMemo(() => {
    const list = filter === "All" ? LIBRARY_TITLES : LIBRARY_TITLES.filter((t) => t.series === filter);
    return [...list].sort((a, b) => a.no - b.no);
  }, [filter]);
  const [shown, setShown] = useState(titles);

  const syncFilterScroll = useCallback(() => {
    const el = filterScrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setFilterFadeLeft(el.scrollLeft > 2);
    setFilterFadeRight(max > 2 && el.scrollLeft < max - 2);
  }, []);

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
      { threshold: 0.1, rootMargin: "0px" },
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
    const el = filterScrollRef.current;
    if (!el) return;
    syncFilterScroll();
    el.addEventListener("scroll", syncFilterScroll, { passive: true });
    window.addEventListener("resize", syncFilterScroll);
    return () => {
      el.removeEventListener("scroll", syncFilterScroll);
      window.removeEventListener("resize", syncFilterScroll);
    };
  }, [syncFilterScroll]);

  useEffect(() => {
    const btn = filterRefs.current[filter];
    btn?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest", inline: "center" });
  }, [filter, reduceMotion]);

  useEffect(() => {
    if (filterSeen.current === filter) return;
    filterSeen.current = filter;
    const frame = requestAnimationFrame(() => {
      setVisibleIndex(1);
      setAtStart(true);
    });

    if (reduceMotion) {
      const swap = requestAnimationFrame(() => setShown(titles));
      return () => {
        cancelAnimationFrame(frame);
        cancelAnimationFrame(swap);
      };
    }

    const fade = requestAnimationFrame(() => setFadingOut(true));
    const timer = window.setTimeout(() => {
      setShown(titles);
      setFadingOut(false);
    }, 180);
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(fade);
      window.clearTimeout(timer);
    };
  }, [filter, reduceMotion, titles]);

  useLayoutEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    el.classList.add("is-resetting");
    el.scrollLeft = 0;
    const fits = el.scrollWidth <= el.clientWidth + 2;
    const thumbFrac = Math.min(1, Math.max(0.1, el.clientWidth / Math.max(el.scrollWidth, 1)));
    const id = requestAnimationFrame(() => {
      setAtStart(true);
      setAtEnd(fits);
      setVisibleIndex(1);
      setThumbStyle({ width: `${thumbFrac * 100}%`, left: "0%" });
      el.classList.remove("is-resetting");
    });
    return () => cancelAnimationFrame(id);
  }, [shown]);

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

  const inner = (
    <>
      {!embedded ? <LibraryMotifs /> : null}
      {!embedded ? (
      <div className="library-premium__scene" aria-hidden>
        <div className="library-premium__grid" />
        <div className="library-premium__glow library-premium__glow--blue" />
        <div className="library-premium__fade library-premium__fade--top" />
        <div className="library-premium__fade library-premium__fade--bottom" />
      </div>
      ) : null}

      <div className={`${embedded ? "" : "shell relative z-[1] py-20 lg:py-28"}`}>
        {!embedded ? (
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
        ) : null}

        <div
          className="library-premium__filters-shell"
          role="tablist"
          aria-label="Library categories"
        >
          <div
            ref={filterScrollRef}
            className={`library-premium__filters-mask${
              filterFadeLeft ? " library-premium__filters-mask--fade-left" : ""
            }${filterFadeRight ? " library-premium__filters-mask--fade-right" : ""}`}
          >
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
          <div
            className={`library-premium__carousel-bleed${
              atStart ? "" : " library-premium__carousel-bleed--fade-left"
            }${atEnd ? "" : " library-premium__carousel-bleed--fade-right"}`}
          >
            <ul
                ref={carouselRef}
                className={`library-premium__carousel${fadingOut ? " is-fading-out" : ""}`}
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
                {shown.map((t) => (
                  <li key={t.no} className="library-premium__slide">
                    <LibraryBookCover
                      title={t.title}
                      series={t.series}
                      no={t.no}
                      reduceMotion={reduceMotion}
                      onDetail={onBookDetail}
                    />
                  </li>
                ))}
              </ul>
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

        {!embedded ? (
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
            Course catalogue <span className="library-premium__action-arrow arrow">→</span>
          </Link>
        </div>
        ) : (
          <div className="library-premium__actions mt-4">
            <a
              href={SKH_BOOKS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary min-h-10 text-sm"
            >
              SKH books &amp; notes ↗
            </a>
          </div>
        )}
      </div>
    </>
  );

  if (embedded) {
    return (
      <div ref={sectionRef} className={`library-premium${inView ? " library-premium--inview" : ""}`}>
        {inner}
      </div>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="library"
      className={`section-anchor library-premium${inView ? " library-premium--inview" : ""}`}
    >
      {inner}
    </section>
  );
}

export function DigitalLibrary({
  compact = false,
  embedded = false,
  onBookDetail,
}: {
  compact?: boolean;
  embedded?: boolean;
  onBookDetail?: (book: LibraryTitle) => void;
}) {
  if (compact) {
    return <DigitalLibraryCompact />;
  }
  return <DigitalLibraryPremium embedded={embedded} onBookDetail={onBookDetail} />;
}
