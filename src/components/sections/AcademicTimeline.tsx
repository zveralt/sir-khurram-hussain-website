import { ACADEMIC_MILESTONES } from "@/lib/timeline";

export function AcademicTimeline() {
  return (
    <section id="timeline" className="section-anchor border-t border-line">
      <div className="shell py-20 lg:py-28">
        <div className="max-w-2xl" data-reveal>
          <p className="eyebrow eyebrow-accent">Professional path</p>
          <h2 className="mt-4 font-heading text-h2 font-semibold text-fg">
            Cited milestones. No invented dates.
          </h2>
          <p className="mt-5 text-soft leading-relaxed">
            Periods follow public SKH materials and a published interview. Where a year is not
            verified, it is omitted.
          </p>
        </div>

        <ol className="mt-16 relative">
          <span
            className="pointer-events-none absolute left-[1.15rem] top-3 bottom-3 w-px bg-line md:left-1/2 md:-translate-x-px"
            aria-hidden
          />
          {ACADEMIC_MILESTONES.map((m, i) => (
            <li
              key={m.n}
              className={`relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 py-8 md:py-12 ${
                i % 2 === 1 ? "md:[&>*:first-child]:col-start-2" : ""
              }`}
              data-reveal
            >
              <span
                className="absolute left-0 top-10 z-[1] flex h-9 w-9 items-center justify-center rounded-full border border-accent-hot bg-bg font-mono text-[0.65rem] text-accent-hot md:left-1/2 md:-translate-x-1/2"
                aria-hidden
              >
                {m.n}
              </span>
              <article className={`pl-14 md:pl-0 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                <p className="eyebrow">{m.period}</p>
                <h3 className="mt-3 font-heading text-h3 font-semibold text-fg">{m.title}</h3>
                <p className="mt-4 text-soft leading-relaxed">{m.body}</p>
                <a
                  href={m.href}
                  target={m.href.startsWith("http") ? "_blank" : undefined}
                  rel={m.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="mt-4 inline-flex link-u text-sm text-fg"
                >
                  {m.source}
                  {m.href.startsWith("http") ? " ↗" : ""}
                </a>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
