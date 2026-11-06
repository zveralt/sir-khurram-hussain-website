import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { ResourcesSection } from "@/components/sections/ResourcesSection";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Islamic Studies notes, worksheets, and revision materials — public SKH index plus LMS storefront listings.",
};

export default function ResourcesPage() {
  return (
    <MarketingShell>
      <main
        id="main-content"
        className="w-full bg-[#F7F6F2] dark:bg-surface min-h-[calc(100vh-20rem)]"
      >
        <section className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter pt-16 pb-8">
          <p className="font-label-md text-label-md uppercase tracking-widest text-[#123B65] dark:text-primary mb-2">
            Resources
          </p>
          <h1 className="font-headline-xl text-headline-lg lg:text-headline-xl uppercase font-bold text-[#071B33] dark:text-on-surface tracking-tight mb-4">
            Notes, worksheets &amp; study companions
          </h1>
          <p className="font-body-md text-body-md text-[#475569] dark:text-on-surface-variant max-w-2xl">
            Use the cards below for quick links. For search, filters, and PDPs, go to the{" "}
            <Link href="/store" className="text-[#123B65] dark:text-primary font-semibold underline">
              storefront
            </Link>
            .
          </p>
        </section>
        <ResourcesSection />
      </main>
    </MarketingShell>
  );
}
