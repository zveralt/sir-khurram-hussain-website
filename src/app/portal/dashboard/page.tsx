import type { Metadata } from "next";
import { Suspense } from "react";
import { DashboardContent } from "@/app/portal/dashboard/DashboardContent";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Student dashboard preview — LMS data connects when API integration is complete.",
};

export default function PortalDashboardPage() {
  return (
    <main id="main-content" className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter pb-24">
      <h1 className="font-headline-xl text-headline-lg uppercase font-bold tracking-tight mb-4">
        Dashboard
      </h1>
      <Suspense fallback={<p className="font-body-md text-[#475569] dark:text-on-surface-variant">Loading…</p>}>
        <DashboardContent />
      </Suspense>
    </main>
  );
}
