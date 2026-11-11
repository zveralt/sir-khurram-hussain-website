"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Compass,
  Layers,
  Lightbulb,
  PenLine,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";
import {
  type CSSProperties,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { LEARNING_STAGES } from "@/lib/journey";

const STAGE_ICONS: LucideIcon[] = [Lightbulb, Compass, Layers, PenLine, RefreshCw];

function JourneyStageVisual({
  stageIndex,
  reduceMotion,
  variant,
}: {
  stageIndex: number;
  reduceMotion: boolean;
  variant: "desktop" | "mobile";
}) {
  const Icon = STAGE_ICONS[stageIndex] ?? Lightbulb;
  const iconDuration = reduceMotion ? 0 : 0.2;

  return (
    <div
      className={`learning-journey-premium__visual-stage${
        variant === "mobile" ? " learning-journey-premium__visual-stage--mobile" : ""
      }`}
    >
      <div className="learning-journey-premium__visual-glow" />
      <div className="learning-journey-premium__visual-pattern" />
      <div className="learning-journey-premium__visual-orbit learning-journey-premium__visual-orbit--outer">
        <span className="learning-journey-premium__visual-satellite" />
      </div>
      <div className="learning-journey-premium__visual-orbit learning-journey-premium__visual-orbit--mid" />
      <div className="learning-journey-premium__visual-orbit learning-journey-premium__visual-orbit--inner" />
      <div className="learning-journey-premium__visual-tile">
        <AnimatePresence mode="wait">
          <motion.span
            key={stageIndex}
            className="learning-journey-premium__visual-icon-wrap"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: iconDuration, ease: "easeOut" }}
          >
            <Icon className="learning-journey-premium__visual-icon" strokeWidth={1.5} aria-hidden />
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

type TrackMetrics = {
  left: number;
  span: number;
  centers: number[];
};

export function LearningJourney() {
  const [active, setActive] = useState(0);
  const prevActive = useRef(0);
  const [direction, setDirection] = useState(0);
  const stepperRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const [track, setTrack] = useState<TrackMetrics>({ left: 0, span: 1, centers: [] });
  const [geometryReady, setGeometryReady] = useState(false);
  const reduceMotion = useReducedMotion();

  const stage = LEARNING_STAGES[active];

  const goTo = useCallback((index: number, focusTab = false) => {
    const clamped = Math.max(0, Math.min(LEARNING_STAGES.length - 1, index));
    setDirection(clamped > prevActive.current ? 1 : clamped < prevActive.current ? -1 : 0);
    prevActive.current = clamped;
    setActive(clamped);
    if (focusTab) {
      requestAnimationFrame(() => tabRefs.current[clamped]?.focus());
    }
  }, []);

  const measureGeometry = useCallback(() => {
    const stepper = stepperRef.current;
    if (!stepper) return;

    const stepperRect = stepper.getBoundingClientRect();
    const centers = tabRefs.current.map((tab) => {
      if (!tab) return 0;
      const dot = tab.querySelector<HTMLElement>("[data-journey-dot]");
      if (!dot) return 0;
      const r = dot.getBoundingClientRect();
      return r.left + r.width / 2 - stepperRect.left;
    });

    if (centers.some((c, i) => c === 0 && !tabRefs.current[i])) return;
    if (centers.length < 2) return;

    const left = centers[0] ?? 0;
    const right = centers[centers.length - 1] ?? left;
    setTrack({ left, span: Math.max(right - left, 1), centers });
    setGeometryReady(true);
  }, []);

  useLayoutEffect(() => {
    measureGeometry();
  }, [measureGeometry]);

  useEffect(() => {
    measureGeometry();
    window.addEventListener("resize", measureGeometry);
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measureGeometry) : null;
    if (stepperRef.current && ro) ro.observe(stepperRef.current);
    const fonts = document.fonts;
    if (fonts?.ready) void fonts.ready.then(() => measureGeometry());
    return () => {
      window.removeEventListener("resize", measureGeometry);
      ro?.disconnect();
    };
  }, [measureGeometry]);

  useEffect(() => {
    const tab = tabRefs.current[active];
    const track = scrollTrackRef.current;
    if (!tab || !track || window.matchMedia("(min-width: 768px)").matches) return;
    tab.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", inline: "center", block: "nearest" });
  }, [active, reduceMotion]);

  const progressWidth =
    track.centers.length > 0 && track.span > 0
      ? Math.max(0, (track.centers[active] ?? track.left) - track.left)
      : 0;

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight") next = Math.min(index + 1, LEARNING_STAGES.length - 1);
    else if (event.key === "ArrowLeft") next = Math.max(index - 1, 0);
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = LEARNING_STAGES.length - 1;
    else return;

    event.preventDefault();
    goTo(next, true);
  };

  const progressLabel = `${stage.n} / 05`;
  const motionDuration = reduceMotion ? 0 : 0.3;

  return (
    <section
      id="journey"
      className="section-anchor learning-journey-premium"
      style={
        {
          "--progress-width": `${progressWidth}px`,
          "--track-left": `${track.left}px`,
          "--track-span": `${track.span}px`,
        } as CSSProperties
      }
    >
      <div className="learning-journey-premium__scene" aria-hidden>
        <div className="learning-journey-premium__grid" />
        <div className="learning-journey-premium__glow learning-journey-premium__glow--blue" />
        <div className="learning-journey-premium__glow learning-journey-premium__glow--gold" />
        <div className="learning-journey-premium__fade learning-journey-premium__fade--top" />
        <div className="learning-journey-premium__fade learning-journey-premium__fade--bottom" />
      </div>

      <div className="shell relative z-[1] py-20 lg:py-28">
        <header className="learning-journey-premium__intro max-w-2xl" data-reveal>
          <p className="learning-journey-premium__eyebrow eyebrow">Learning journey</p>
          <h2 className="learning-journey-premium__title mt-4 font-display text-h2 font-semibold">
            <span className="learning-journey-premium__title-line">A teaching sequence</span>{" "}
            <span className="learning-journey-premium__title-accent">— not a live tracker.</span>
          </h2>
          <p className="learning-journey-premium__lede mt-5">
            How Sir Khurram’s classroom emphasis becomes a digital study path: understanding first,
            then sources, structure, practice, and review.
          </p>
        </header>

        <div
          className={`learning-journey-premium__stepper${geometryReady ? " is-ready" : ""}`}
          ref={stepperRef}
          data-reveal
        >
          <div className="learning-journey-premium__rail" aria-hidden>
            <div
              className="learning-journey-premium__rail-line"
              style={{ left: track.left, width: track.span }}
            />
            <div
              className="learning-journey-premium__rail-progress"
              style={{ left: track.left, width: progressWidth }}
            />
          </div>

          <div
            ref={scrollTrackRef}
            className="learning-journey-premium__tabs"
            role="tablist"
            aria-label="Learning journey steps"
          >
            {LEARNING_STAGES.map((s, i) => {
              const isActive = active === i;
              const isComplete = i < active;
              const tabId = `journey-tab-${i}`;
              const panelId = "journey-panel";

              return (
                <button
                  key={s.n}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={tabId}
                  aria-selected={isActive}
                  aria-controls={panelId}
                  tabIndex={isActive ? 0 : -1}
                  className={`learning-journey-premium__tab${isActive ? " is-active" : ""}${
                    isComplete ? " is-complete" : ""
                  }`}
                  onClick={() => goTo(i)}
                  onKeyDown={(event) => onTabKeyDown(event, i)}
                >
                  <span
                    data-journey-dot
                    className="learning-journey-premium__dot"
                    aria-hidden
                  >
                    {isComplete ? (
                      <Check className="learning-journey-premium__dot-icon" strokeWidth={2.5} />
                    ) : (
                      <span className="learning-journey-premium__dot-num font-mono">{s.n}</span>
                    )}
                  </span>
                  <span className="learning-journey-premium__tab-label">{s.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        <article
          id="journey-panel"
          role="tabpanel"
          aria-labelledby={`journey-tab-${active}`}
          className="learning-journey-premium__card"
          data-reveal
        >
          <div className="learning-journey-premium__card-grid">
            <div className="learning-journey-premium__card-body">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={active}
                  custom={direction}
                  className="learning-journey-premium__card-copy"
                  initial={
                    reduceMotion ? false : { opacity: 0, x: direction >= 0 ? 16 : -16 }
                  }
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: direction >= 0 ? -16 : 16 }}
                  transition={{ duration: motionDuration, ease: "easeOut" }}
                >
                  <p className="learning-journey-premium__card-num font-display" aria-hidden>
                    {stage.n}
                  </p>
                  <h3 className="learning-journey-premium__card-title font-display">{stage.title}</h3>
                  <p className="learning-journey-premium__card-text">{stage.body}</p>

                  <div className="learning-journey-premium__visual--mobile" aria-hidden>
                    <JourneyStageVisual
                      stageIndex={active}
                      reduceMotion={Boolean(reduceMotion)}
                      variant="mobile"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="learning-journey-premium__card-visual" aria-hidden>
                <JourneyStageVisual
                  stageIndex={active}
                  reduceMotion={Boolean(reduceMotion)}
                  variant="desktop"
                />
              </div>
            </div>
          </div>

          <footer className="learning-journey-premium__card-footer">
            <p className="learning-journey-premium__progress-readout font-mono">{progressLabel}</p>
            <div className="learning-journey-premium__nav">
              <button
                type="button"
                className="learning-journey-premium__nav-btn"
                aria-label="Previous step"
                disabled={active === 0}
                onClick={() => goTo(active - 1, true)}
              >
                <ChevronLeft aria-hidden />
              </button>
              <button
                type="button"
                className="learning-journey-premium__nav-btn"
                aria-label="Next step"
                disabled={active === LEARNING_STAGES.length - 1}
                onClick={() => goTo(active + 1, true)}
              >
                <ChevronRight aria-hidden />
              </button>
            </div>
          </footer>
        </article>
      </div>
    </section>
  );
}
