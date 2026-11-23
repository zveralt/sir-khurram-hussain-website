import type { Metadata } from "next";
import { Suspense } from "react";
import { PortalHome } from "@/components/portal/PortalHome";
import { PortalSkeleton } from "@/components/portal/PortalSkeleton";
import { isPortalBackendConfigured } from "@/lib/portal/config";

export const instant = false;

export const metadata: Metadata = {
  title: "Student portal",
  description: "Demo student, parent, and teacher portal previews — live logins when backend is connected.",
};

export default function PortalPage() {
  const backendConfigured = isPortalBackendConfigured();
  return (
    <Suspense fallback={<PortalSkeleton rows={3} />}>
      <PortalHome backendConfigured={backendConfigured} />
    </Suspense>
  );
}
