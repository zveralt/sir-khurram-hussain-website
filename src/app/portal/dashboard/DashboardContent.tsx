import Link from "next/link";
import { LogoutButton } from "@/app/portal/dashboard/LogoutButton";
import { getDevSession } from "@/lib/auth/session";

export async function DashboardContent() {
  const session = await getDevSession();

  return (
    <>
      {!session ? (
        <div className="border border-amber-500/50 bg-amber-50 dark:bg-amber-950/30 p-6 max-w-2xl">
          <p className="font-body-md text-body-md text-[#334155] dark:text-on-surface-variant mb-4">
            No fixture session found. In production, this page will load after LMS authentication.
          </p>
          <Link
            href="/portal/login"
            className="font-label-md text-[#123B65] dark:text-primary uppercase tracking-wider underline"
          >
            Sign in
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-[#071B33]/15 dark:border-primary-container/60 p-6 bg-white dark:bg-surface-container">
            <h2 className="font-headline-sm uppercase font-bold mb-2">Account (fixture)</h2>
            <p className="font-body-sm">{session.displayName}</p>
            <p className="font-body-sm text-[#64748B] dark:text-outline">{session.email}</p>
          </div>
          <div className="border border-[#071B33]/15 dark:border-primary-container/60 p-6 bg-white dark:bg-surface-container">
            <h2 className="font-headline-sm uppercase font-bold mb-2">Enrolments</h2>
            <p className="font-body-sm text-[#475569] dark:text-on-surface-variant">
              Awaiting LMS catalogue API — no enrolment data is shown yet.
            </p>
          </div>
          <div className="md:col-span-2 border border-[#071B33]/15 dark:border-primary-container/60 p-6 bg-white dark:bg-surface-container">
            <h2 className="font-headline-sm uppercase font-bold mb-2">Resources</h2>
            <p className="font-body-sm text-[#475569] dark:text-on-surface-variant mb-4">
              Downloads and assignments will list here from Learn360 once integrated.
            </p>
            <LogoutButton />
          </div>
        </div>
      )}
    </>
  );
}
