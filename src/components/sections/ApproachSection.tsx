import Link from "next/link";
import { TiltCard } from "@/components/effects/TiltCard";

const pillars = [
  {
    n: "01",
    title: "Concept first",
    body: "Students meet the idea — revelation, community, belief, practice — before they meet examination wording.",
  },
  {
    n: "02",
    title: "Source analysis",
    body: "Passages, ahadith, and historical episodes are read for meaning and context, not harvested as quotations.",
  },
  {
    n: "03",
    title: "Structured writing",
    body: "Answers are built: relevant knowledge, evidence, explanation, then a coherent close.",
  },
  {
    n: "04",
    title: "Examination preparation",
    body: "Timed practice comes after understanding. SKH’s public culture of weekly writing is the intended digital habit too.",
  },
];

export function ApproachSection() {
  return (
    <section id="approach" className="section-anchor border-t border-line">
      <div className="shell py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5" data-reveal>
            <p className="eyebrow eyebrow-accent">Educational approach</p>
            <h2 className="mt-5 font-heading text-h2 font-semibold text-fg max-w-[13ch]">
              Four movements. One discipline.
            </h2>
            <p className="mt-6 text-lede text-soft max-w-prose">
              Concept, source, structure, and practice are not four products. They are the same
              lesson seen at different depths — the studio’s reading of Sir Khurram’s public
              teaching emphasis.
            </p>
            <Link href="/teaching-philosophy" className="mt-10 inline-flex btn btn-ghost">
              Teaching philosophy <span className="arrow">→</span>
            </Link>
          </div>
          <ul className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((p, i) => (
              <li key={p.n} data-reveal style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}>
                <TiltCard className="h-full border border-line bg-raised p-7">
                  <span className="font-mono text-sm text-accent-hot">{p.n}</span>
                  <h3 className="mt-4 font-heading text-xl font-semibold text-fg">{p.title}</h3>
                  <p className="mt-3 text-soft leading-relaxed">{p.body}</p>
                </TiltCard>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
