"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import {
  type CSSProperties,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ANSWER_STAGES } from "@/lib/answerStudio";

const SCAFFOLD_WIDTHS = [100, 92, 84, 74, 60];

type TrackMetrics = {
  top: number;
  span: number;
  centers: number[];
};

function AnswerScaffold({
  activeIndex,
  reduceMotion,
}: {
  activeIndex: number;
  reduceMotion: boolean;
}) {
  return (
    <div className="answer-studio-premium__scaffold-tile" aria-hidden>
      <div className="answer-studio-premium__scaffold">
        {SCAFFOLD_WIDTHS.map((width, i) => {
          const filled = i <= activeIndex;
          const isActive = i === activeIndex;
          return (
            <div key={ANSWER_STAGES[i]?.n ?? i} className="answer-studio-premium__scaffold-row">
              <span className="answer-studio-premium__scaffold-label font-mono">
                {ANSWER_STAGES[i]?.n}
              </span>
              <div
                className="answer-studio-premium__scaffold-bar"
                style={{ width: `${width}%` }}
              >
                <span className="answer-studio-premium__scaffold-track" />
                <motion.span
                  className={`answer-studio-premium__scaffold-fill${
                    isActive ? " is-active" : ""
                  }`}
                  initial={false}
                  animate={{ scaleX: filled ? 1 : 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.5,
                    delay: reduceMotion ? 0 : i * 0.06,
                    ease: "easeOut",
                  }}
                  style={{ transformOrigin: "left center" }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function AnswerStudio() {
  const [active, setActive] = useState(0);
  const prevActive = useRef(0);
  const [direction, setDirection] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const mobileStepperRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const mobileTabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [track, setTrack] = useState<TrackMetrics>({ top: 0, span: 1, centers: [] });
  const [mobileTrack, setMobileTrack] = useState<TrackMetrics>({ top: 0, span: 1, centers: [] });
  const [geometryReady, setGeometryReady] = useState(false);
  const [isDesktopSteps, setIsDesktopSteps] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktopSteps(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const stage = ANSWER_STAGES[active];

  const goTo = useCallback((index: number, focusTab = false) => {
    const clamped = Math.max(0, Math.min(ANSWER_STAGES.length - 1, index));
    setDirection(clamped > prevActive.current ? 1 : clamped < prevActive.current ? -1 : 0);
    prevActive.current = clamped;
    setActive(clamped);
    if (focusTab) {
      requestAnimationFrame(() => {
        tabRefs.current[clamped]?.focus();
        mobileTabRefs.current[clamped]?.focus();
      });
    }
  }, []);

  const measureVertical = useCallback(() => {
    const steps = stepsRef.current;
    if (!steps) return;
    const stepsTop = steps.getBoundingClientRect().top;
    const centers = tabRefs.current.map((tab) => {
      if (!tab) return 0;
      const badge = tab.querySelector<HTMLElement>("[data-answer-badge]");
      if (!badge) return 0;
      const r = badge.getBoundingClientRect();
      return r.top + r.height / 2 - stepsTop;
    });
    if (centers.some((c, i) => c === 0 && !tabRefs.current[i])) return;
    if (centers.length < 2) return;
    const top = centers[0] ?? 0;
    const bottom = centers[centers.length - 1] ?? top;
    setTrack({ top, span: Math.max(bottom - top, 1), centers });
    setGeometryReady(true);
  }, []);

  const measureMobile = useCallback(() => {
    const stepper = mobileStepperRef.current;
    if (!stepper) return;
    const stepperLeft = stepper.getBoundingClientRect().left;
    const centers = mobileTabRefs.current.map((tab) => {
      if (!tab) return 0;
      const dot = tab.querySelector<HTMLElement>("[data-answer-dot]");
      if (!dot) return 0;
      const r = dot.getBoundingClientRect();
      return r.left + r.width / 2 - stepperLeft;
    });
    if (centers.some((c, i) => c === 0 && !mobileTabRefs.current[i])) return;
    if (centers.length < 2) return;
    const left = centers[0] ?? 0;
    const right = centers[centers.length - 1] ?? left;
    setMobileTrack({ top: left, span: Math.max(right - left, 1), centers });
  }, []);

  const measureAll = useCallback(() => {
    measureVertical();
    measureMobile();
  }, [measureVertical, measureMobile]);

  useLayoutEffect(() => {
    measureAll();
  }, [measureAll, active]);

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
    measureAll();
    window.addEventListener("resize", measureAll);
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measureAll) : null;
    if (stepsRef.current && ro) ro.observe(stepsRef.current);
    if (mobileStepperRef.current && ro) ro.observe(mobileStepperRef.current);
    const fonts = document.fonts;
    if (fonts?.ready) void fonts.ready.then(() => measureAll());
    return () => {
      window.removeEventListener("resize", measureAll);
      ro?.disconnect();
    };
  }, [measureAll, inView, isDesktopSteps]);

  const progressHeight =
    track.centers.length > 0 && track.span > 0
      ? Math.max(0, (track.centers[active] ?? track.top) - (track.centers[0] ?? track.top))
      : 0;

  const mobileProgressWidth =
    mobileTrack.centers.length > 0 && mobileTrack.span > 0
      ? Math.max(0, (mobileTrack.centers[active] ?? mobileTrack.top) - mobileTrack.top)
      : 0;

  const onTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
    vertical: boolean,
  ) => {
    let next = index;
    if (vertical) {
      if (event.key === "ArrowDown") next = Math.min(index + 1, ANSWER_STAGES.length - 1);
      else if (event.key === "ArrowUp") next = Math.max(index - 1, 0);
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = ANSWER_STAGES.length - 1;
      else return;
    } else {
      if (event.key === "ArrowRight") next = Math.min(index + 1, ANSWER_STAGES.length - 1);
      else if (event.key === "ArrowLeft") next = Math.max(index - 1, 0);
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = ANSWER_STAGES.length - 1;
      else return;
    }
    event.preventDefault();
    goTo(next, true);
  };

  const panelTransition = reduceMotion ? 0 : 0.28;
  const progressLabel = `${stage.n} / 05`;
  const panelId = "answer-studio-panel";

  const renderTabButton = (
    s: (typeof ANSWER_STAGES)[number],
    i: number,
    variant: "vertical" | "mobile",
  ) => {
    const isActive = active === i;
    const isComplete = i < active;
    const tabId = `answer-studio-tab-${i}`;

    if (variant === "mobile") {
      return (
        <button
          key={s.id}
          ref={(el) => {
            mobileTabRefs.current[i] = el;
          }}
          type="button"
          role="tab"
          id={tabId}
          aria-selected={isActive}
          aria-controls={panelId}
          tabIndex={isActive ? 0 : -1}
          className={`answer-studio-premium__mobile-tab${isActive ? " is-active" : ""}${
            isComplete ? " is-complete" : ""
          }`}
          onClick={() => goTo(i)}
          onKeyDown={(event) => onTabKeyDown(event, i, false)}
        >
          <span data-answer-dot className="answer-studio-premium__mobile-dot" aria-hidden>
            {isComplete ? (
              <Check className="answer-studio-premium__mobile-check" strokeWidth={2.5} />
            ) : (
              <span className="font-mono">{s.n}</span>
            )}
          </span>
        </button>
      );
    }

    return (
      <button
        key={s.id}
        ref={(el) => {
          tabRefs.current[i] = el;
        }}
        type="button"
        role="tab"
        id={tabId}
        aria-selected={isActive}
        aria-controls={panelId}
        tabIndex={isActive ? 0 : -1}
        className={`answer-studio-premium__step${isActive ? " is-active" : ""}${
          isComplete ? " is-complete" : ""
        }`}
        onClick={() => goTo(i)}
        onKeyDown={(event) => onTabKeyDown(event, i, true)}
      >
        <span data-answer-badge className="answer-studio-premium__badge" aria-hidden>
          {isComplete ? (
            <Check className="answer-studio-premium__badge-icon" strokeWidth={2.5} />
          ) : (
            <span className="font-mono">{s.n}</span>
          )}
        </span>
        <span className="answer-studio-premium__step-title">{s.title}</span>
      </button>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="answer-studio"
      className={`section-anchor answer-studio-premium${inView ? " answer-studio-premium--inview" : ""}`}
      style={
        {
          "--progress-height": `${progressHeight}px`,
          "--mobile-progress-width": `${mobileProgressWidth}px`,
        } as CSSProperties
      }
    >
      <div className="answer-studio-premium__scene" aria-hidden>
        <div className="answer-studio-premium__grid" />
        <div className="answer-studio-premium__glow answer-studio-premium__glow--blue" />
        <div className="answer-studio-premium__glow answer-studio-premium__glow--gold" />
        <div className="answer-studio-premium__fade answer-studio-premium__fade--top" />
        <div className="answer-studio-premium__fade answer-studio-premium__fade--bottom" />
      </div>

      <div className="shell relative z-[1] py-[7.5rem] lg:py-[10rem]">
        <div className="answer-studio-premium__layout">
          <div className="answer-studio-premium__aside">
            <header
              className="answer-studio-premium__intro"
              data-reveal
              style={{ ["--reveal-delay" as string]: "0ms" }}
            >
              <p className="answer-studio-premium__eyebrow eyebrow">Answer studio</p>
              <h2 className="answer-studio-premium__title mt-5 font-display text-h2 font-semibold">
                <span className="answer-studio-premium__title-line">How a response</span>{" "}
                <span className="answer-studio-premium__title-accent">is built.</span>
              </h2>
              <p className="answer-studio-premium__lede mt-5">
                A demonstration of teaching sequence — not a mark scheme, guaranteed grade, or
                examiner script. The illustrative prompt is educational, not a past paper.
              </p>
            </header>

            {isDesktopSteps ? (
              <div
                ref={stepsRef}
                className={`answer-studio-premium__steps answer-studio-premium__steps--desktop${
                  geometryReady ? " is-ready" : ""
                }`}
                data-reveal
                style={{ ["--reveal-delay" as string]: "100ms" }}
              >
                <div className="answer-studio-premium__steps-rail" aria-hidden>
                  <div
                    className="answer-studio-premium__steps-line"
                    style={{ top: track.top, height: track.span }}
                  />
                  <div
                    className="answer-studio-premium__steps-progress"
                    style={{ top: track.top, height: progressHeight }}
                  />
                </div>
                <div
                  className="answer-studio-premium__steps-list"
                  role="tablist"
                  aria-orientation="vertical"
                  aria-label="Answer building steps"
                >
                  {ANSWER_STAGES.map((s, i) => renderTabButton(s, i, "vertical"))}
                </div>
              </div>
            ) : (
              <div
                ref={mobileStepperRef}
                className="answer-studio-premium__mobile-stepper"
                data-reveal
                style={{ ["--reveal-delay" as string]: "100ms" }}
              >
                <div className="answer-studio-premium__mobile-rail" aria-hidden>
                  <div
                    className="answer-studio-premium__mobile-line"
                    style={{ left: mobileTrack.top, width: mobileTrack.span }}
                  />
                  <div
                    className="answer-studio-premium__mobile-progress"
                    style={{ left: mobileTrack.top, width: mobileProgressWidth }}
                  />
                </div>
                <div
                  className="answer-studio-premium__mobile-tabs"
                  role="tablist"
                  aria-label="Answer building steps"
                >
                  {ANSWER_STAGES.map((s, i) => renderTabButton(s, i, "mobile"))}
                </div>
                <p className="answer-studio-premium__mobile-label font-display" aria-live="polite">
                  {stage.title}
                </p>
              </div>
            )}
          </div>

          <article
            id={panelId}
            role="tabpanel"
            aria-labelledby={`answer-studio-tab-${active}`}
            className="answer-studio-premium__card"
            data-reveal
            style={{ ["--reveal-delay" as string]: "200ms" }}
          >
            <div className="answer-studio-premium__card-top">
              <p className="answer-studio-premium__card-readout font-mono">{progressLabel}</p>
            </div>

            <div className="answer-studio-premium__card-scaffold-slot answer-studio-premium__card-scaffold-slot--mobile">
              <AnswerScaffold activeIndex={active} reduceMotion={Boolean(reduceMotion)} />
            </div>

            <div className="answer-studio-premium__card-main">
              <div className="answer-studio-premium__card-scaffold-slot answer-studio-premium__card-scaffold-slot--desktop">
                <AnswerScaffold activeIndex={active} reduceMotion={Boolean(reduceMotion)} />
              </div>

              <div className="answer-studio-premium__card-stack">
                {ANSWER_STAGES.map((s, i) => {
                  const isActive = active === i;
                  const slideY = reduceMotion
                    ? 0
                    : isActive
                      ? 0
                      : direction >= 0
                        ? i < active
                          ? -12
                          : 12
                        : i > active
                          ? 12
                          : -12;
                  return (
                    <motion.div
                      key={s.id}
                      className={`answer-studio-premium__card-panel${isActive ? " is-active" : ""}`}
                      aria-hidden={!isActive}
                      inert={!isActive}
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        y: slideY,
                      }}
                      transition={{ duration: panelTransition, ease: "easeOut" }}
                    >
                      <p className="answer-studio-premium__card-num font-display" aria-hidden>
                        {s.n}
                      </p>
                      <h3 className="answer-studio-premium__card-title font-display">{s.title}</h3>
                      <p className="answer-studio-premium__card-body">{s.body}</p>

                      <div className="answer-studio-premium__example">
                        <p className="answer-studio-premium__example-label">
                          <Quote className="answer-studio-premium__example-icon" aria-hidden />
                          Illustrative example
                        </p>
                        <p className="answer-studio-premium__example-text">{s.example}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <footer className="answer-studio-premium__card-footer">
              <div className="answer-studio-premium__nav">
                <button
                  type="button"
                  className="answer-studio-premium__nav-btn"
                  aria-label="Previous step"
                  disabled={active === 0}
                  onClick={() => goTo(active - 1, true)}
                >
                  <ChevronLeft aria-hidden />
                </button>
                <button
                  type="button"
                  className="answer-studio-premium__nav-btn"
                  aria-label="Next step"
                  disabled={active === ANSWER_STAGES.length - 1}
                  onClick={() => goTo(active + 1, true)}
                >
                  <ChevronRight aria-hidden />
                </button>
              </div>
            </footer>
          </article>
        </div>
      </div>
    </section>
  );
}
