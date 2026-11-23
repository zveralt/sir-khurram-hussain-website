"use client";

import Link from "next/link";
import { PortalProvider } from "@/components/portal/PortalProvider";
import { PortalShell } from "@/components/portal/PortalShell";
import { TopicsView } from "@/components/portal/TopicsView";
import { usePortalDemo } from "@/components/portal/usePortalDemo";

export function PortalTopicsClient() {
  const { demoRole, isDemo } = usePortalDemo();

  if (!isDemo) {
    return (
      <div className="shell py-16">
        <p className="text-muted">Topics are available in demo mode.</p>
        <Link href="/portal?demo=student" className="btn btn-primary mt-4">
          Student demo
        </Link>
      </div>
    );
  }

  return (
    <PortalProvider demoRole={demoRole} isDemo>
      <PortalShell demoRole={demoRole} isDemo>
        <TopicsView />
      </PortalShell>
    </PortalProvider>
  );
}
