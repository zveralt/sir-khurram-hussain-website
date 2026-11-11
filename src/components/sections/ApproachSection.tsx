"use client";

import Link from "next/link";
import { Spotlight } from "@/components/ui/Spotlight";

const pillars = [
  {
    n: "01",
    title: "Concept first",
    body: "Students meet the idea — revelation, community, belief, practice — before they meet examination wording.",
    icon: "lightbulb" as const,
  },
  {
    n: "02",
    title: "Source analysis",
    body: "Passages, ahadith, and historical episodes are read for meaning and context, not harvested as quotations.",
    icon: "book" as const,
  },
  {
    n: "03",
    title: "Structured writing",
    body: "Answers are built: relevant knowledge, evidence, explanation, then a coherent close.",
    icon: "pen" as const,
  },
  {
    n: "04",
    title: "Examination preparation",
    body: "Timed practice comes after understanding. SKH’s public culture of weekly writing is the intended digital habit too.",
    icon: "target" as const,
  },
] as const;

function ApproachIcon({ kind }: { kind: (typeof pillars)[number]["icon"] }) {
  const common = "h-[1.15rem] w-[1.15rem]";
  switch (kind) {
    case "lightbulb":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.65" aria-hidden>
          <path d="M9 18h6M10 22h4M12 3a6 6 0 0 0-3 11v2h6v-2a6 6 0 0 0-3-11Z" strokeLinejoin="round" />
        </svg>
      );
    case "book":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.65" aria-hidden>
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v18H6.5A2.5 2.5 0 0 0 4 23.5V5.5Z" />
          <path d="M6.5 3H20v18H6.5A2.5 2.5 0 0 1 4 18.5V5.5A2.5 2.5 0 0 1 6.5 3Z" />
        </svg>
      );
    case "pen":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.65" aria-hidden>
          <path d="M16 4l4 4-10 10H6v-4L16 4Z" />
          <path d="M14 6l4 4" />
        </svg>
      );
    case "target":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.65" aria-hidden>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
        </svg>
      );
  }
}

export function ApproachSection() {
  return (
    <section id="approach" className="section-anchor approach-premium section-band atmosphere atmosphere--feature band-deep">
      <div className="approach-premium__scene" aria-hidden>
        <div className="approach-premium__glow approach-premium__glow--lead" />
        <div className="approach-premium__glow approach-premium__glow--cards" />
        <div className="approach-premium__grid" />
        <div className="approach-premium__section-fade" />
      </div>

      <div className="shell relative z-[1] py-20 lg:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="approach-premium__intro lg:col-span-5" data-reveal>
            <p className="approach-premium__eyebrow eyebrow eyebrow-accent">Educational approach</p>
            <h2 className="approach-premium__title mt-5 font-heading font-semibold max-w-[14ch]">
              <span className="approach-premium__title-lead">Four movements.</span>{" "}
              <span className="approach-premium__title-accent">One discipline.</span>
            </h2>
            <p className="approach-premium__lede mt-6">
              Concept, source, structure, and practice are not four products. They are the same
              lesson seen at different depths — the studio’s reading of Sir Khurram’s public
              teaching emphasis.
            </p>
            <Link href="/philosophy" className="approach-premium__cta mt-10 inline-flex btn btn-ghost">
              Teaching philosophy <span className="arrow">→</span>
            </Link>
          </div>

          <ul className="approach-premium__cards lg:col-span-7 grid grid-cols-1 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <li
                key={p.n}
                className="approach-premium__cards-item"
                data-reveal
                style={{ ["--reveal-delay" as string]: `${160 + i * 100}ms` }}
              >
                <Spotlight className="h-full" size={400}>
                  <article className="approach-card card-glow">
                    <span className="approach-card__num" aria-hidden>
                      {p.n}
                    </span>
                    <div className="approach-card__icon-wrap">
                      <ApproachIcon kind={p.icon} />
                    </div>
                    <h3 className="approach-card__title font-heading font-semibold">{p.title}</h3>
                    <p className="approach-card__body">{p.body}</p>
                  </article>
                </Spotlight>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
