import { Suspense } from "react";
import { PortalTopicsClient } from "@/app/portal/topics/PortalTopicsClient";
import { PortalSkeleton } from "@/components/portal/PortalSkeleton";

export const instant = false;

export default function PortalTopicsPage() {
  return (
    <Suspense fallback={<PortalSkeleton rows={4} />}>
      <PortalTopicsClient />
    </Suspense>
  );
}
