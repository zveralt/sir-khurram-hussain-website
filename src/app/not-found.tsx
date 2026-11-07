import Link from "next/link";
import { MarketingShell } from "@/components/layout/MarketingShell";

export default function NotFound() {
  return (
    <MarketingShell>
      <section className="shell py-28 lg:py-40">
        <p className="eyebrow eyebrow-accent">404</p>
        <h1 className="mt-4 font-display text-h1 text-fg max-w-[12ch]">This page is not on the map.</h1>
        <p className="mt-6 max-w-md text-soft leading-relaxed">
          The address does not match a studio page. Use the navigation, or return home.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-primary">
            Home <span className="arrow">→</span>
          </Link>
          <Link href="/syllabus-map" className="btn btn-ghost">
            Syllabus map
          </Link>
        </div>
      </section>
    </MarketingShell>
  );
}
