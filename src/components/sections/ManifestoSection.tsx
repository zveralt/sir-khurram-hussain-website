import Link from "next/link";

const tenets = [
  {
    n: "01",
    title: "Understanding before examination language",
    body: "Islamiyat rewards close reading of sources, context, and argument — not memorised model paragraphs. Students learn why an answer earns marks before they practise writing it.",
  },
  {
    n: "02",
    title: "Steady, structured progression",
    body: "Video lessons, notes, and guided practice are meant to move in sequence: concept, then composition, then timed work. Pace is the student’s; sequence is the studio’s.",
  },
  {
    n: "03",
    title: "Written practice as discipline",
    body: "SKH’s public teaching culture emphasises regular written work, composition, and time. The same habit is intended for digital tracks once they are live on the LMS.",
  },
];

export function ManifestoSection() {
  return (
    <section id="manifesto" className="section-anchor border-t border-line">
      <div className="shell py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5" data-reveal>
            <p className="eyebrow eyebrow-accent">Teaching</p>
            <h2 className="mt-5 font-heading text-h2 font-semibold text-fg max-w-[13ch]">
              Education as an art of understanding.
            </h2>
            <blockquote className="mt-10 border-l-2 border-accent-hot pl-6">
              <p className="font-heading text-h3 font-medium text-fg leading-snug">
                “Education is not just about studying and exams. Education is an art; the art of
                learning, the art of implementing, the art of understanding.”
              </p>
              <footer className="mt-4 text-sm text-muted">
                — Sir Khurram Hussain,{" "}
                <a
                  href="https://timesofyouth.com/exclusive-interview-of-khurram-hussain/"
                  className="link-u text-fg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Times of Youth
                </a>
              </footer>
            </blockquote>
            <Link href="/teaching-philosophy" className="mt-10 inline-flex btn btn-ghost">
              Read the philosophy <span className="arrow">→</span>
            </Link>
          </div>

          <ol className="lg:col-span-7 divide-y divide-line">
            {tenets.map((t, i) => (
              <li
                key={t.n}
                className="py-8 first:pt-0 last:pb-0 grid grid-cols-[auto_1fr] gap-6"
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
              >
                <span className="font-mono text-sm text-accent-hot leading-none pt-1">{t.n}</span>
                <div>
                  <h3 className="font-heading text-h3 font-semibold text-fg">{t.title}</h3>
                  <p className="mt-3 text-[1.05rem] leading-relaxed text-soft max-w-prose">{t.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
