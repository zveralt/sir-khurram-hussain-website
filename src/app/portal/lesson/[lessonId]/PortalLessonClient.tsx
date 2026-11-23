"use client";

import Link from "next/link";
import { LessonView } from "@/components/portal/LessonView";
import { PortalProvider } from "@/components/portal/PortalProvider";
import { PortalShell } from "@/components/portal/PortalShell";
import { usePortalDemo } from "@/components/portal/usePortalDemo";

export function PortalLessonClient({ lessonId }: { lessonId: string }) {
  const { demoRole, isDemo } = usePortalDemo();

  if (!isDemo) {
    return (
      <div className="shell py-16">
        <p className="text-muted">Lessons are available in demo mode.</p>
        <Link href="/portal?demo=student" className="btn btn-primary mt-4">
          Student demo
        </Link>
      </div>
    );
  }

  return (
    <PortalProvider demoRole={demoRole} isDemo>
      <PortalShell demoRole={demoRole} isDemo>
        <LessonView lessonId={lessonId} />
      </PortalShell>
    </PortalProvider>
  );
}
