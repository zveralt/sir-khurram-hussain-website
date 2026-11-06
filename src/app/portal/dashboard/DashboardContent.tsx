import Link from "next/link";
import { LogoutButton } from "@/app/portal/dashboard/LogoutButton";
import { getDevSession } from "@/lib/auth/session";

export async function DashboardContent() {
  const session = await getDevSession();

  if (!session) {
    return (
      <div className="max-w-xl border-t border-line pt-10">
        <p className="text-soft leading-relaxed">
          No fixture session. In production this page will follow LMS authentication.
        </p>
        <Link href="/portal/login" className="btn btn-primary mt-8">
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-line pt-12">
      <div>
        <p className="eyebrow">Account (fixture)</p>
        <h2 className="mt-3 font-heading text-h3 font-semibold text-fg">{session.displayName}</h2>
        <p className="mt-2 text-muted">{session.email}</p>
      </div>
      <div>
        <p className="eyebrow">Enrolments</p>
        <p className="mt-3 text-soft leading-relaxed">
          Awaiting LMS catalogue API — none shown yet.
        </p>
      </div>
      <div className="md:col-span-2">
        <p className="eyebrow">Resources</p>
        <p className="mt-3 text-soft leading-relaxed max-w-xl">
          Downloads and assignments will list here from Learn360 once integrated.
        </p>
        <div className="mt-8">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
