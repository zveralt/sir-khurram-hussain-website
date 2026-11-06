import type { Metadata } from "next";
import { Suspense } from "react";
import { DashboardContent } from "@/app/portal/dashboard/DashboardContent";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Student dashboard preview — LMS data connects when API integration is complete.",
};

export default function PortalDashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Dashboard"
        title={
          <>
            Your studio{" "}
            <em className="italic">preview.</em>
          </>
        }
        lede="Enrolments and files will appear here from Learn360. Until then, this is layout only."
      />
      <section className="shell pb-24 lg:pb-32">
        <Suspense fallback={<p className="text-muted">Loading…</p>}>
          <DashboardContent />
        </Suspense>
      </section>
    </>
  );
}
