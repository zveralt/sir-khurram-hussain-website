"use client";

import Link from "next/link";
import {
  type CSSProperties,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const QUOTE =
  "Education is not just about studying and exams. Education is an art; the art of learning, the art of implementing, the art of understanding.";
const QUOTE_HIGHLIGHT = "the art of understanding";

const tenets = [
  {
    n: "01",
    title: "Understanding before examination language",
    body: "Islamiyat rewards close reading of sources, context, and argument — not memorised model paragraphs. Students learn why an answer earns marks before they practise writing it.",
    icon: "lightbulb" as const,
  },
  {
    n: "02",
    title: "Steady, structured progression",
    body: "Video lessons, notes, and guided practice are meant to move in sequence: concept, then composition, then timed work. Pace is the student’s; sequence is the studio’s.",
    icon: "layers" as const,
  },
  {
    n: "03",
    title: "Written practice as discipline",
    body: "SKH’s public teaching culture emphasises regular written work, composition, and time. The same habit is intended for digital tracks once they are live on the LMS.",
    icon: "pen" as const,
  },
];

function TenetIcon({ kind }: { kind: (typeof tenets)[number]["icon"] }) {
  const common = "h-[1.2rem] w-[1.2rem]";
  switch (kind) {
    case "lightbulb":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.65" aria-hidden>
          <path d="M9 18h6M10 22h4M12 3a6 6 0 0 0-3 11v2h6v-2a6 6 0 0 0-3-11Z" strokeLinejoin="round" />
        </svg>
      );
    case "layers":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.65" aria-hidden>
          <path d="M12 3 3 8.5 12 14l9-5.5L12 3Z" />
          <path d="M3 13.5 12 19l9-5.5" />
          <path d="M3 18 12 22.5l9-5.5" />
        </svg>
      );
    case "pen":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.65" aria-hidden>
          <path d="M16 4l4 4-10 10H6v-4L16 4Z" />
          <path d="M14 6l4 4" />
        </svg>
      );
  }
}

function QuoteBody() {
  const idx = QUOTE.lastIndexOf(QUOTE_HIGHLIGHT);
  if (idx < 0) {
    return <>{QUOTE}</>;
  }
  const before = QUOTE.slice(0, idx);
  const after = QUOTE.slice(idx + QUOTE_HIGHLIGHT.length);
  return (
    <>
      {before}
      <span className="teaching-premium__quote-accent">{QUOTE_HIGHLIGHT}</span>
      {after}
    </>
  );
}

type TrackMetrics = {
  top: number;
  span: number;
  centers: number[];
};

export function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const anchorRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [inView, setInView] = useState(false);
  const [fillHeight, setFillHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [track, setTrack] = useState<TrackMetrics>({ top: 0, span: 1, centers: [0, 0, 0] });
  const [geometryReady, setGeometryReady] = useState(false);

  const measureTrack = useCallback(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;
    const timelineTop = timeline.getBoundingClientRect().top;
    const centers = anchorRefs.current.map((anchor) => {
      if (!anchor) return 0;
      const r = anchor.getBoundingClientRect();
      return r.top + r.height / 2 - timelineTop;
    });
    if (anchorRefs.current.some((el) => !el)) return;
    if (centers.length < 1) return;
    const top = centers[0] ?? 0;
    const bottom = centers[centers.length - 1] ?? top;
    setTrack({ top, span: Math.max(bottom - top, 1), centers });
    setGeometryReady(true);
  }, []);

  useLayoutEffect(() => {
    measureTrack();
  }, [measureTrack, inView]);

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
    measureTrack();
    window.addEventListener("resize", measureTrack);
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measureTrack) : null;
    const timeline = timelineRef.current;
    if (timeline && ro) ro.observe(timeline);
    const fonts = document.fonts;
    if (fonts?.ready) {
      void fonts.ready.then(() => measureTrack());
    }

    return () => {
      window.removeEventListener("resize", measureTrack);
      ro?.disconnect();
    };
  }, [measureTrack, inView]);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const update = () => {
      const items = timeline.querySelectorAll<HTMLElement>("[data-tenet]");
      const vh = window.innerHeight;

      let nextActive = 0;
      items.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        if (r.top <= vh * 0.58) nextActive = i;
      });
      setActiveIndex(nextActive);

      const progressIndex = hoveredIndex ?? nextActive;

      if (track.centers.length > 0) {
        const start = track.centers[0] ?? track.top;
        const activeCenter = track.centers[progressIndex] ?? start;
        const height = Math.min(track.span, Math.max(0, activeCenter - start));
        setFillHeight(height);
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [track, hoveredIndex]);

  const litIndex = hoveredIndex ?? activeIndex;

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className={`section-anchor teaching-premium${inView ? " teaching-premium--inview" : ""}`}
    >
      <div className="teaching-premium__scene" aria-hidden>
        <div className="teaching-premium__glow teaching-premium__glow--quote" />
        <div className="teaching-premium__glow teaching-premium__glow--gold" />
        <div className="teaching-premium__grid-layer" />
        <div className="teaching-premium__pattern" />
        <div className="teaching-premium__fade teaching-premium__fade--top" />
        <div className="teaching-premium__fade teaching-premium__fade--bottom" />
      </div>

      <div className="shell relative z-[1] teaching-premium__shell">
        <div className="teaching-premium__layout">
          <div className="teaching-premium__intro">
            <p className="teaching-premium__eyebrow eyebrow" data-reveal>
              <span className="teaching-premium__eyebrow-rule" aria-hidden />
              Teaching
            </p>
            <h2
              className="teaching-premium__title mt-5 font-heading font-semibold"
              data-reveal
              style={{ ["--reveal-delay" as string]: "80ms" }}
            >
              Education as an{" "}
              <span className="teaching-premium__title-accent">art of understanding.</span>
            </h2>

            <figure
              className="teaching-premium__quote-card mt-10"
              data-reveal
              style={{ ["--reveal-delay" as string]: "160ms" }}
            >
              <span className="teaching-premium__quote-mark" aria-hidden>
                “
              </span>
              <blockquote
                className="teaching-premium__blockquote"
                cite="https://timesofyouth.com/exclusive-interview-of-khurram-hussain/"
              >
                <p className="teaching-premium__quote-text">
                  “<QuoteBody />”
                </p>
                <footer className="teaching-premium__quote-cite">
                  <span className="teaching-premium__cite-rule" aria-hidden />
                  — Sir Khurram Hussain,{" "}
                  <cite>
                    <a
                      href="https://timesofyouth.com/exclusive-interview-of-khurram-hussain/"
                      className="teaching-premium__cite-link link-u"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Times of Youth
                    </a>
                  </cite>
                </footer>
              </blockquote>
            </figure>

            <Link
              href="/philosophy"
              className="teaching-premium__cta mt-10 inline-flex btn btn-ghost"
              data-reveal
              style={{ ["--reveal-delay" as string]: "240ms" }}
            >
              Read the philosophy <span className="arrow">→</span>
            </Link>
          </div>

          <div className="teaching-premium__timeline" ref={timelineRef}>
            <div
              className={`teaching-premium__rail-geometry${geometryReady ? " is-ready" : ""}`}
              aria-hidden
            >
              <div
                className="teaching-premium__track"
                style={
                  {
                    top: `${track.top}px`,
                    height: `${track.span}px`,
                  } as CSSProperties
                }
              >
                <div className="teaching-premium__track-line" />
                <div
                  className="teaching-premium__track-fill"
                  style={{ height: `${fillHeight}px` }}
                />
              </div>
              {geometryReady &&
                track.centers.map((centerY, i) => {
                const reached = activeIndex >= i;
                const lit = litIndex === i;
                return (
                  <div
                    key={tenets[i]?.n ?? i}
                    className={`teaching-premium__node${reached ? " is-reached" : ""}${lit ? " is-lit" : ""}`}
                    style={{ top: `${centerY}px` }}
                  />
                );
              })}
            </div>
            <ol className="teaching-premium__tenets">
              {tenets.map((t, i) => {
                const isLit = litIndex === i;
                return (
                  <li
                    key={t.n}
                    data-tenet
                    className={`teaching-premium__tenet${isLit ? " is-lit" : ""}`}
                    style={{ ["--tenet-i" as string]: String(i) }}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className="teaching-premium__rail-cell" aria-hidden />
                    <span className="teaching-premium__tenet-num font-display" aria-hidden>
                      {t.n}
                    </span>
                    <div className="teaching-premium__tenet-body">
                      <div
                        className="teaching-premium__icon-tile"
                        ref={(el) => {
                          anchorRefs.current[i] = el;
                        }}
                      >
                        <TenetIcon kind={t.icon} />
                      </div>
                      <h3 className="teaching-premium__tenet-title font-heading font-semibold">{t.title}</h3>
                      <p className="teaching-premium__tenet-copy">{t.body}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
