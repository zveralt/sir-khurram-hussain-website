import { INSIGHTS } from "@/lib/insights";

export function InsightsSection() {
  return (
    <section id="insights" className="section-anchor border-t border-line">
      <div className="shell py-20 lg:py-28">
        <div className="max-w-2xl" data-reveal>
          <p className="eyebrow eyebrow-accent">Studio notes</p>
          <h2 className="mt-4 font-heading text-h2 font-semibold text-fg">
            Educational insights, written here.
          </h2>
          <p className="mt-5 text-soft leading-relaxed">
            These are original orientation notes for visitors — not published articles and not
            quotations attributed to Sir Khurram. They should be reviewed before being treated as
            syllabus authority.
          </p>
        </div>
        <ol className="mt-14 divide-y divide-line border-y border-line">
          {INSIGHTS.map((item, i) => (
            <li
              key={item.n}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 py-10"
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
            >
              <span className="md:col-span-2 font-mono text-sm text-accent-hot">{item.n}</span>
              <div className="md:col-span-10 max-w-2xl">
                <h3 className="font-heading text-h3 font-semibold text-fg">{item.title}</h3>
                <p className="mt-4 text-soft leading-relaxed">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
