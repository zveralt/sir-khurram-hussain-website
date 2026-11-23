"use client";

import Link from "next/link";
import { ParentDashboard } from "@/components/portal/ParentDashboard";
import { PortalDemoLinks } from "@/components/portal/PortalDemoLinks";
import { PortalProvider } from "@/components/portal/PortalProvider";
import { PortalShell } from "@/components/portal/PortalShell";
import { StudentDashboard } from "@/components/portal/StudentDashboard";
import { TeacherDashboard } from "@/components/portal/TeacherDashboard";
import { usePortalDemo } from "@/components/portal/usePortalDemo";
export function PortalHome({ backendConfigured }: { backendConfigured: boolean }) {
  const { demoRole, isDemo } = usePortalDemo();

  if (!isDemo && !backendConfigured) {
    return (
      <div className="shell portal-welcome py-16">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">Portal</p>
        <h1 className="font-display text-3xl font-semibold text-fg mt-2">Student portal preview</h1>
        <p className="mt-4 max-w-xl text-muted leading-relaxed">
          Live student logins are not enabled on this site yet. Try the demo with clearly labelled sample data, or
          register for approval.
        </p>
        <PortalDemoLinks className="mt-8" />
        <Link href="/portal/login" className="btn btn-primary mt-4 min-h-11">
          Sign in
        </Link>
        <Link href="/#register" className="btn btn-ghost mt-4 min-h-11 ml-0 sm:ml-2">
          Register
        </Link>
      </div>
    );
  }

  if (!isDemo && backendConfigured) {
    return (
      <div className="shell portal-welcome py-16">
        <h1 className="font-display text-3xl font-semibold text-fg">Portal</h1>
        <p className="mt-4 text-muted">Sign in with your approved student account.</p>
        <Link href="/portal/login" className="btn btn-primary mt-6">
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <PortalProvider demoRole={demoRole} isDemo>
      <PortalShell demoRole={demoRole} isDemo>
        {demoRole === "parent" ? <ParentDashboard /> : demoRole === "teacher" ? <TeacherDashboard /> : <StudentDashboard />}
      </PortalShell>
    </PortalProvider>
  );
}
