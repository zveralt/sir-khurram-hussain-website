import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { Cover } from "@/components/ui/Cover";
import { FixtureMark } from "@/components/ui/FixtureMark";
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
  return { title: p.title, description: p.shortDescription };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) notFound();

  const cats = FIXTURE_CATEGORIES.filter((c) => p.categories.includes(c.id));
  const displayTitle = p.title.replace(" (fixture)", "");

  return (
    <MarketingShell>
      <article className="shell pt-16 pb-24 lg:pt-24 lg:pb-32">
        <Link href="/store" className="eyebrow link-u text-muted hover:text-fg">
          ← Catalogue
        </Link>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="max-w-sm">
              <Cover
                title={displayTitle}
                series={p.kind === "course" ? "Course" : "Resource"}
                no="—"
                tone={p.kind === "course" ? "ink" : "paper"}
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              <span className="eyebrow eyebrow-accent">{p.kind === "course" ? "Course" : "Resource"}</span>
              {p.isFixture ? <FixtureMark /> : null}
            </div>
            <h1 className="mt-5 font-display text-h1 font-semibold text-fg">{displayTitle}</h1>
            <p className="mt-6 text-lede text-soft max-w-xl">{p.longDescription}</p>

            <dl className="mt-10 grid grid-cols-2 gap-8 max-w-lg">
              <div>
                <dt className="eyebrow">Format</dt>
                <dd className="mt-2 text-fg">{p.formatLabel}</dd>
              </div>
              <div>
                <dt className="eyebrow">Price</dt>
                <dd className="mt-2 text-fg">{p.pricingLabel}</dd>
              </div>
              {p.kind === "course" ? (
                <div>
                  <dt className="eyebrow">Level</dt>
                  <dd className="mt-2 text-fg">{p.levelLabel}</dd>
                </div>
              ) : (
                <div>
                  <dt className="eyebrow">Type</dt>
                  <dd className="mt-2 text-fg capitalize">{p.resourceType}</dd>
                </div>
              )}
              <div>
                <dt className="eyebrow">Categories</dt>
                <dd className="mt-2 text-fg">{cats.map((c) => c.label).join(" · ")}</dd>
              </div>
            </dl>

            <p className="mt-10 text-sm text-muted max-w-md">
              Account creation, payment, and unlock happen on Aark Academy Learn360. The button
              opens that site — it does not confirm a purchase here.
            </p>
            <a
              href={p.lmsEnrollmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-6"
            >
              {p.enrollmentCtaLabel} ↗
            </a>
          </div>
        </div>

        {p.kind === "course" ? (
          <div className="mt-20 pt-12 border-t border-line">
            <h2 className="font-heading text-h3 font-semibold text-fg">Indicative outline</h2>
            <ol className="mt-8 divide-y divide-line border-y border-line max-w-2xl">
              {p.syllabusHighlights.map((line, i) => (
                <li key={line} className="py-5 grid grid-cols-[3rem_1fr] gap-4">
                  <span className="font-mono text-accent-hot">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-soft leading-relaxed">{line}</span>
                </li>
              ))}
            </ol>
          </div>
        ) : null}
      </article>
    </MarketingShell>
  );
}
