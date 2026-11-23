import Link from "next/link";
import { PortalDemoLinks } from "@/components/portal/PortalDemoLinks";
import { SectionHeader } from "@/components/widgets";

export function PortalTeaserSection() {
  return (
    <section id="portal-teaser" className="section-anchor border-t border-line">
      <div className="shell">
        <div className="portal-teaser max-w-3xl">
          <SectionHeader
            eyebrow="Student portal"
            title="Try the"
            titleLine2="portal demo"
            emphasis="gradient"
            lede="Preview student, parent, and teacher dashboards with clearly labelled sample data. Live logins activate when your registration is approved and the API is connected — nothing here pretends to be a real account."
          />
          <PortalDemoLinks />
          <Link href="/portal/login" className="btn btn-ghost mt-4 min-h-10 inline-flex">
            Sign in page
          </Link>
        </div>
      </div>
    </section>
  );
}
