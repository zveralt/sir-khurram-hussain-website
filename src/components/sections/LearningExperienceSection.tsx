import Link from "next/link";
import { Spotlight } from "@/components/ui/Spotlight";
import { LEARNING_EXPERIENCE_TILES, type LearningExperienceTile } from "@/lib/learning-experience";

function TileIcon({ kind }: { kind: LearningExperienceTile["icon"] }) {
  const common = "h-[1.05rem] w-[1.05rem]";
  switch (kind) {
    case "lectures":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.65" aria-hidden>
          <polygon points="8,5 19,12 8,19" />
        </svg>
      );
    case "courses":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.65" aria-hidden>
          <path d="M5 5.5h14v13H5z" />
          <path d="M8 9h8M8 12.5h5.5" />
        </svg>
      );
    case "notes":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.65" aria-hidden>
          <path d="M7 4h10v16H7z" />
          <path d="M9.5 8h5M9.5 11.5h5M9.5 15h3.5" />
        </svg>
      );
    case "worksheets":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.65" aria-hidden>
          <path d="M6 6.5l4 4-4 4M13 16.5h5" />
        </svg>
      );
    case "syllabus":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.65" aria-hidden>
          <circle cx="12" cy="12" r="7.5" />
          <path d="M12 8v4l2.5 2.5" />
        </svg>
      );
    case "resources":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.65" aria-hidden>
          <path d="M5 9.5c0-2 2.2-3.5 7-3.5s7 1.5 7 3.5-2.2 3.5-7 3.5-7-1.5-7-3.5z" />
          <path d="M5 9.5V14c0 2 2.2 3.5 7 3.5M19 9.5V14" />
        </svg>
      );
  }
}

function ExperienceCell({ tile }: { tile: LearningExperienceTile }) {
  const cellClass = `learning-experience__cell card-glow group h-full${tile.featured ? " learning-experience__cell--featured" : ""}`;

  const inner = (
    <>
      <span className="learning-experience__cell-top">
        <span className="learning-experience__icon" aria-hidden>
          <TileIcon kind={tile.icon} />
        </span>
        <span className="learning-experience__arrow" aria-hidden>
          ↗
        </span>
      </span>
      <span className="font-heading text-[clamp(1.2rem,1.9vw,1.5rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-fg">
        {tile.title}
      </span>
      <span className="mt-3 block text-[0.9375rem] leading-relaxed text-soft">{tile.description}</span>
    </>
  );

  return (
    <Spotlight className="h-full">
      {tile.external ? (
        <a href={tile.href} target="_blank" rel="noopener noreferrer" className={cellClass}>
          {inner}
        </a>
      ) : (
        <Link href={tile.href} className={cellClass}>
          {inner}
        </Link>
      )}
    </Spotlight>
  );
}

export function LearningExperienceSection() {
  return (
    <section
      id="experience"
      className="section-anchor section-canvas learning-experience atmosphere atmosphere--minimal dark:studio-band"
    >
      <div className="shell py-20 lg:py-28">
        <div className="max-w-3xl" data-reveal>
          <p className="learning-experience__eyebrow">A connected learning experience</p>
          <h2 className="mt-5 font-heading text-editorial-h2 font-semibold text-fg max-w-[16ch]">
            Everything for the work of learning.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-soft">
            A single studio entry point for catalogue fixtures, the public companion index, syllabus orientation,
            and the student portal — each link goes to a real route on this site or SKH.
          </p>
        </div>

        <div className="learning-experience__grid mt-14" data-reveal>
          {LEARNING_EXPERIENCE_TILES.map((tile) => (
            <ExperienceCell key={tile.title} tile={tile} />
          ))}
        </div>
      </div>
    </section>
  );
}
