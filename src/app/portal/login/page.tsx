import type { Metadata } from "next";
import { LoginForm } from "@/app/portal/login/LoginForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { aarkLmsPublicUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Student sign in",
  description: "Development fixture sign-in and LMS link-out for Aark Academy Learn360.",
};

export default function PortalLoginPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portal"
        title={
          <>
            Student access{" "}
            <span className="text-accent-hot">lives on the LMS.</span>
          </>
        }
        lede="Production sign-in is Aark Academy Learn360. The form on the left is a development fixture only — it does not authenticate a real student."
      />
      <section className="shell pb-24 lg:pb-32 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="border-t border-line pt-10">
          <h2 className="font-heading text-h3 font-semibold text-fg">Fixture preview (development)</h2>
          <p className="mt-3 text-sm text-muted mb-8">
            Creates a local cookie so the dashboard layout can be reviewed. Blocked in production.
          </p>
          <LoginForm />
        </div>
        <div className="border-t border-line pt-10">
          <h2 className="font-heading text-h3 font-semibold text-fg">Official LMS</h2>
          <p className="mt-3 text-soft leading-relaxed mb-8 max-w-md">
            Use your real Aark Academy credentials on Learn360 for courses, payments, and downloads.
          </p>
          <a href={aarkLmsPublicUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Sign in on Learn360 ↗
          </a>
        </div>
      </section>
    </>
  );
}
