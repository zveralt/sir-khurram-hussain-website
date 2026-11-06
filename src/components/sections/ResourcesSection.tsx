import Link from "next/link";
import { Cover } from "@/components/ui/Cover";

const volumes = [
  {
    href: "https://www.skh.com.pk/booksnotes/",
    external: true,
    series: "SKH index",
    no: 1,
    title: "Books & notes",
    body: "Public SKH index of Islamic Studies companions — Qur’anic passages, seerah, hadith, pillars, and review volumes. Confirm format with admissions.",
    cta: "View the index",
    tone: "ink" as const,
  },
  {
    href: "/store/concept-compendium-notes",
    external: false,
    series: "Studio",
    no: 2,
    title: "Concept compendium",
    body: "Fixture listing for a notes pack. File delivery will follow LMS product rules — this is not a live download.",
    cta: "Open listing",
    tone: "paper" as const,
  },
  {
    href: "/store/topical-worksheets-pack",
    external: false,
    series: "Studio",
    no: 3,
    title: "Topical worksheets",
    body: "Fixture listing for practice sheets. Scope and access will be defined in the LMS catalogue.",
    cta: "Open listing",
    tone: "bronze" as const,
  },
];

export function ResourcesSection({ compact = false }: { compact?: boolean }) {
  return (
    <section id="resources" className={`section-anchor ${compact ? "" : "border-t border-line"}`}>
      <div className={`shell ${compact ? "pb-24 lg:pb-32" : "py-20 lg:py-28"}`}>
        {compact ? null : (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8" data-reveal>
            <div>
              <p className="eyebrow eyebrow-accent">Library</p>
              <h2 className="mt-4 font-heading text-h2 font-semibold text-fg max-w-[16ch]">
                A structured digital library.
              </h2>
            </div>
            <p className="max-w-sm text-soft leading-relaxed">
              Structured catalogue entries. Digital purchase and download happen on the LMS when products
              are live.
            </p>
          </div>
        )}

        <ul className={`${compact ? "" : "mt-16 "}grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14`}>
          {volumes.map((v, i) => (
            <li key={v.title} data-reveal style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
              <Link
                href={v.href}
                target={v.external ? "_blank" : undefined}
                rel={v.external ? "noopener noreferrer" : undefined}
                className="group block"
              >
                <div className="book-3d">
                  <Cover title={v.title} series={v.series} no={v.no} tone={v.tone} />
                </div>
                <p className="mt-6 text-sm leading-relaxed text-soft">{v.body}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-fg">
                  {v.cta}
                  <span className="arrow transition-transform duration-300 group-hover:translate-x-1">
                    {v.external ? "↗" : "→"}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
