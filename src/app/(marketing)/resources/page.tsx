import type { Metadata } from "next";
import { DigitalLibrary } from "@/components/sections/DigitalLibrary";
import { ResourcesSection } from "@/components/sections/ResourcesSection";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Islamic Studies notes, worksheets, and revision materials — public SKH index plus LMS storefront listings.",
};

export default function ResourcesPage() {
  return (
    <MarketingShell>
      <PageHeader
        eyebrow="Library"
        title={
          <>
            A curated academic{" "}
            <span className="text-accent-hot">archive.</span>
          </>
        }
        lede="Titles from SKH’s public books-and-notes index. Typographic covers only. Live files live on the LMS."
      />
      <DigitalLibrary compact />
      <ResourcesSection compact />
    </MarketingShell>
  );
}
