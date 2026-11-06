import type { Metadata } from "next";
import { KnowledgeFaq } from "@/components/sections/KnowledgeFaq";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Questions",
  description:
    "Course access, resources, Cambridge Islamiyat, digital learning, and enrolment — answered without a fake chatbot.",
};

export default function FaqPage() {
  return (
    <MarketingShell>
      <PageHeader
        eyebrow="Knowledge"
        title={
          <>
            Clear answers.{" "}
            <span className="text-accent-hot">No invented access.</span>
          </>
        }
        lede="Search the studio’s published answers. This is not an AI assistant."
      />
      <KnowledgeFaq compact />
    </MarketingShell>
  );
}
