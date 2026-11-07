import Link from "next/link";
import { SYLLABUS_NODES } from "@/lib/syllabus";

export function SyllabusPreview() {
  return (
    <section id="syllabus" className="section-anchor band-midnight">
      <div className="shell py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow !text-ice">Syllabus map</p>
            <h2 className="mt-4 font-display text-h2 text-white max-w-[14ch]">
              Nine fields. One subject.
            </h2>
          </div>
          <p className="lg:col-span-5 text-ice/80 leading-relaxed">
            A radial map of SKH’s published Islamiyat companions. It is a study orientation, not a reprint of the Cambridge specification.
          </p>
        </div>
        <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {SYLLABUS_NODES.map((node) => (
            <li key={node.id} className="bg-midnight">
              <Link href={`/syllabus-map?topic=${node.id}`} className="group flex items-baseline justify-between gap-4 px-5 py-5">
                <span className="font-heading text-2xl text-white group-hover:text-ice">{node.title}</span>
                <span className="font-mono text-xs text-accent-hot">{node.n}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/syllabus-map" className="mt-10 inline-flex btn btn-primary">
          Open the syllabus map <span className="arrow">→</span>
        </Link>
      </div>
    </section>
  );
}
