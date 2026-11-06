"use client";

import { useState } from "react";
import { ANSWER_STAGES } from "@/lib/answerStudio";

export function AnswerStudio() {
  const [active, setActive] = useState(0);
  const stage = ANSWER_STAGES[active];

  return (
    <section id="answer-studio" className="section-anchor border-t border-line">
      <div className="shell py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4" data-reveal>
            <p className="eyebrow eyebrow-accent">Answer studio</p>
            <h2 className="mt-5 font-heading text-h2 font-semibold text-fg max-w-[12ch]">
              How a response is built.
            </h2>
            <p className="mt-5 text-soft leading-relaxed">
              A demonstration of teaching sequence — not a mark scheme, guaranteed grade, or
              examiner script. The illustrative prompt is educational, not a past paper.
            </p>
          </div>

          <div className="lg:col-span-8">
            <ol className="flex gap-2 overflow-x-auto pb-2">
              {ANSWER_STAGES.map((s, i) => (
                <li key={s.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={active === i}
                    className={`rounded-full border px-4 py-2 font-heading text-sm font-semibold transition-colors ${
                      active === i
                        ? "border-accent-hot bg-accent-hot text-white"
                        : "border-line text-fg hover:border-accent-hot"
                    }`}
                  >
                    {s.n} {s.title}
                  </button>
                </li>
              ))}
            </ol>

            <article className="mt-8 relative z-[1] spot-surface border border-line-strong bg-raised p-8 lg:p-10">
              <p className="eyebrow eyebrow-accent">{stage.n}</p>
              <h3 className="mt-4 font-heading text-h3 font-semibold text-fg">{stage.title}</h3>
              <p className="mt-4 text-soft leading-relaxed">{stage.body}</p>
              <p className="mt-8 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                Illustrative example
              </p>
              <p className="mt-3 max-w-prose text-fg leading-relaxed">{stage.example}</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
