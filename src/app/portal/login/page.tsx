import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/app/portal/login/LoginForm";
import { isPortalBackendConfigured } from "@/lib/portal/config";
import { aarkLmsPublicUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Student sign in",
  description: "Portal sign-in when approved — demo previews available without authentication.",
};

export default function PortalLoginPage() {
  const backendConfigured = isPortalBackendConfigured();

  return (
    <div className="shell py-12 lg:py-16 max-w-4xl">
      <Link href="/" className="text-sm link-u text-muted">
        ← Home
      </Link>
      <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted">Portal</p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-fg">
        Student{" "}
        <span className="bg-gradient-to-r from-[var(--widget-blue)] to-[var(--secondary)] bg-clip-text text-transparent">
          access
        </span>
      </h1>
      <p className="mt-4 max-w-xl text-muted leading-relaxed">
        Production courses and downloads are on Aark Academy Learn360. This on-site portal previews dashboards until your
        API connection is live — no fake logins.
      </p>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 border-t border-line pt-10">
        <LoginForm backendConfigured={backendConfigured} />
        <div>
          <h2 className="font-display text-xl font-semibold text-fg">Official LMS</h2>
          <p className="mt-3 text-sm text-muted leading-relaxed mb-6">
            Use your real Aark Academy credentials for courses, payments, and downloads.
          </p>
          <a href={aarkLmsPublicUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost min-h-11">
            Sign in on Learn360 ↗
          </a>
        </div>
      </div>
    </div>
  );
}
