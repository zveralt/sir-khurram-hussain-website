"use client";

import { SectionScene } from "@/components/ui/SectionScene";
import { useSectionInView } from "@/hooks/useSectionInView";
import { INSIGHTS } from "@/lib/insights";

export function InsightsSection() {
  const { sectionRef, inView } = useSectionInView();

  return (
    <section
      ref={sectionRef}
      id="insights"
      className={`section-anchor section-premium studio-notes-premium section-premium--deeper${
        inView ? " section-premium--inview" : ""
      }`}
    >
      <SectionScene />
      <div className="shell section-premium__shell">
        <header className="section-premium__header">
          <div className="section-premium__header-main" data-premium-reveal>
            <p className="section-premium__eyebrow eyebrow">Studio notes</p>
            <h2 className="section-premium__title mt-4 font-display font-semibold">
              <span className="section-premium__title-line">Educational insights,</span>{" "}
              <span className="section-premium__title-accent">written here.</span>
            </h2>
          </div>
          <p className="section-premium__lede" data-premium-reveal style={{ ["--reveal-delay" as string]: "80ms" }}>
            These are original orientation notes for visitors — not published articles and not quotations attributed to
            Sir Khurram. They should be reviewed before being treated as syllabus authority.
          </p>
        </header>

        <ol className="studio-notes-premium__bento">
          {INSIGHTS.map((item, i) => (
            <li
              key={item.n}
              className="section-premium__glass-card studio-notes-premium__card"
              data-premium-reveal
              style={{ ["--reveal-delay" as string]: `${120 + i * 80}ms` }}
            >
              <span className="studio-notes-premium__num font-display" aria-hidden>
                {item.n}
              </span>
              <h3 className="studio-notes-premium__card-title font-display">{item.title}</h3>
              <p className="studio-notes-premium__card-body">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
