import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarketingShell } from "@/components/layout/MarketingShell";
import {
  FIXTURE_CATEGORIES,
  getAllCatalogProducts,
  getProductBySlug,
} from "@/lib/catalog/fixtures";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllCatalogProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) return { title: "Not found" };
  return {
    title: p.title,
    description: p.shortDescription,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) notFound();

  const cats = FIXTURE_CATEGORIES.filter((c) => p.categories.includes(c.id));

  return (
    <MarketingShell>
      <main
        id="main-content"
        className="w-full bg-[#F7F6F2] dark:bg-surface text-[#071B33] dark:text-on-surface min-h-[calc(100vh-20rem)]"
      >
        <article className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter py-24 lg:py-32">
          <Link href="/store" className="font-label-md text-[#123B65] dark:text-primary uppercase tracking-wider inline-flex items-center gap-2 mb-8">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Catalogue
          </Link>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#123B65] dark:text-primary border border-[#123B65]/30 px-2 py-1">
              {p.kind === "course" ? "Course" : "Resource"}
            </span>
            {cats.map((c) => (
              <span key={c.id} className="font-label-sm text-[10px] uppercase tracking-wider border border-[#071B33]/15 dark:border-outline-variant/40 px-2 py-1">
                {c.label}
              </span>
            ))}
            {p.isFixture ? (
              <span className="font-label-sm text-[10px] uppercase tracking-wider border border-amber-500/50 px-2 py-1 text-amber-900 dark:text-amber-100 bg-amber-50/90 dark:bg-amber-950/30">
                Development fixture — not a live product
              </span>
            ) : null}
          </div>
          <h1 className="font-headline-xl text-headline-lg lg:text-headline-xl uppercase font-bold tracking-tight mb-6">{p.title}</h1>
          <p className="font-body-lg text-body-md text-[#334155] dark:text-on-surface-variant max-w-3xl mb-10">{p.longDescription}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="border border-[#071B33]/15 dark:border-primary-container/60 p-6 bg-white dark:bg-surface-container">
              <h2 className="font-headline-sm text-headline-sm uppercase font-bold mb-4">Commercial</h2>
              <p className="font-body-sm text-body-sm text-[#475569] dark:text-on-surface-variant mb-2">
                <strong className="text-[#071B33] dark:text-on-surface">Price:</strong> {p.pricingLabel}
              </p>
              <p className="font-body-sm text-body-sm text-[#475569] dark:text-on-surface-variant">
                <strong className="text-[#071B33] dark:text-on-surface">Format:</strong> {p.formatLabel}
              </p>
            </div>
            <div className="border border-[#071B33]/15 dark:border-primary-container/60 p-6 bg-white dark:bg-surface-container">
              <h2 className="font-headline-sm text-headline-sm uppercase font-bold mb-4">Next step</h2>
              <p className="font-body-sm text-body-sm text-[#475569] dark:text-on-surface-variant mb-4">
                Account creation, payment, and content unlock are handled by{" "}
                <strong className="font-semibold">Aark Academy Learn360</strong>. This button opens the learner site in a new tab — it does not confirm purchase on its own.
              </p>
              <a
                href={p.lmsEnrollmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-[#071B33] dark:bg-primary text-white dark:text-on-primary font-label-lg uppercase tracking-wider border border-[#071B33] dark:border-[#245B91]"
              >
                {p.enrollmentCtaLabel}
                <span className="material-symbols-outlined text-[18px]">open_in_new</span>
              </a>
            </div>
          </div>
          {p.kind === "course" ? (
            <div>
              <h2 className="font-headline-sm text-headline-sm uppercase font-bold mb-4">Indicative outline</h2>
              <ul className="space-y-3 border-t border-[#071B33]/10 dark:border-primary-container/40">
                {p.syllabusHighlights.map((line) => (
                  <li
                    key={line}
                    className="font-body-md text-body-md text-[#334155] dark:text-on-surface-variant pt-3 border-b border-[#071B33]/10 dark:border-primary-container/30 pb-3 flex gap-3"
                  >
                    <span className="font-headline-md text-[#123B65] dark:text-primary shrink-0">→</span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <h2 className="font-headline-sm text-headline-sm uppercase font-bold mb-4">Resource type</h2>
              <p className="font-body-md text-body-md text-[#334155] dark:text-on-surface-variant capitalize">{p.resourceType}</p>
            </div>
          )}
        </article>
      </main>
    </MarketingShell>
  );
}
