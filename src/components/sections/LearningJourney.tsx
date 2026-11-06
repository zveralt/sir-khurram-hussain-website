"use client";

import { useState } from "react";
import { LEARNING_STAGES } from "@/lib/journey";

export function LearningJourney() {
  const [active, setActive] = useState(0);
  const stage = LEARNING_STAGES[active];

  return (
    <section id="journey" className="section-anchor band-deep">
      <div className="shell py-20 lg:py-28">
        <div className="max-w-2xl" data-reveal>
          <p className="eyebrow !text-ice">Learning journey</p>
          <h2 className="mt-4 font-heading text-h2 font-semibold text-white">
            A teaching sequence — not a live tracker.
          </h2>
          <p className="mt-5 text-ice/85 leading-relaxed">
            How Sir Khurram’s classroom emphasis becomes a digital study path: understanding first,
            then sources, structure, practice, and review.
          </p>
        </div>

        <ol className="mt-14 hidden lg:grid grid-cols-5 gap-4" data-reveal>
          {LEARNING_STAGES.map((s, i) => (
            <li key={s.n} className="relative">
              {i < LEARNING_STAGES.length - 1 ? (
                <span
                  className="pointer-events-none absolute left-[calc(50%+1.4rem)] top-5 h-px w-[calc(100%-1.2rem)] bg-white/20"
                  aria-hidden
                />
              ) : null}
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className={`w-full text-left transition-colors ${active === i ? "text-white" : "text-ice/70 hover:text-white"}`}
              >
                <span
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-full border font-mono text-xs ${
                    active === i
                      ? "border-accent-hot bg-accent-hot text-white"
                      : "border-white/25 bg-midnight/40"
                  }`}
                >
                  {s.n}
                </span>
                <span className="mt-4 block font-heading text-xl font-semibold uppercase tracking-tight">
                  {s.title}
                </span>
              </button>
            </li>
          ))}
        </ol>

        <ol className="mt-10 lg:hidden space-y-0 border-l border-white/20 ml-4">
          {LEARNING_STAGES.map((s, i) => (
            <li key={s.n}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className={`relative -ml-[0.6rem] flex w-full items-center gap-4 py-4 text-left ${
                  active === i ? "text-white" : "text-ice/70"
                }`}
              >
                <span
                  className={`inline-flex h-5 w-5 shrink-0 rounded-full border ${
                    active === i ? "border-accent-hot bg-accent-hot" : "border-white/40 bg-deep"
                  }`}
                />
                <span className="font-heading text-lg font-semibold">{s.title}</span>
              </button>
            </li>
          ))}
        </ol>

        <div className="mt-10 border border-white/15 bg-midnight/70 p-8 lg:p-10">
          <p className="eyebrow !text-ice">{stage.n}</p>
          <h3 className="mt-3 font-heading text-h3 font-semibold text-white">{stage.title}</h3>
          <p className="mt-4 max-w-2xl text-ice/90 leading-relaxed">{stage.body}</p>
        </div>
      </div>
    </section>
  );
}
