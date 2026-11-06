const principles = [
  {
    n: "01",
    title: "Concept before technique",
    body: "Students are asked to understand sources and examiner expectations before drilling papers — so answers have meaning, not only shape.",
    note: "Aligned with the Times of Youth interview",
  },
  {
    n: "02",
    title: "Written practice",
    body: "SKH publicly emphasises regular written work, composition, and time. Those habits are the intended culture of the digital studio as well.",
    note: "Source · skh.com.pk",
  },
  {
    n: "03",
    title: "What we will not invent",
    body: "SKH states that results and quotations are published only with checks. This site follows the same rule: no anonymous student reviews, no invented grades.",
    note: "Source · SKH publishing notes",
  },
];

export function TestimonialsSection() {
  return (
    <section className="section-anchor border-t border-line bg-sunken/70">
      <div className="shell py-20 lg:py-28">
        <div className="max-w-2xl" data-reveal>
          <p className="eyebrow eyebrow-accent">How we teach</p>
          <h2 className="mt-4 font-heading text-h2 font-semibold text-fg">
            Principles, not anonymous quotations.
          </h2>
        </div>
        <ol className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
          {principles.map((p, i) => (
            <li
              key={p.n}
              className="border border-line p-8"
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
            >
              <span className="font-mono text-sm text-accent-hot">{p.n}</span>
              <h3 className="mt-4 font-heading text-h3 font-semibold text-fg">{p.title}</h3>
              <p className="mt-4 text-soft leading-relaxed">{p.body}</p>
              <p className="mt-6 eyebrow">{p.note}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
