import type { Metadata } from "next";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { ResourcesSection } from "@/components/sections/ResourcesSection";

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
            Notes, worksheets,{" "}
            <span className="text-accent-hot">study companions.</span>
          </>
        }
        lede="A digital academic library. Searchable catalogue lives on the storefront; live files live on the LMS."
      />
      <ResourcesSection compact />
    </MarketingShell>
  );
}
