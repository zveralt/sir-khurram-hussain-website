import Link from "next/link";
import { PortalDemoLinks } from "@/components/portal/PortalDemoLinks";
import { SectionHeader } from "@/components/widgets";

export function PortalTeaserSection() {
  return (
    <section id="portal-teaser" className="section-anchor border-t border-line">
      <div className="shell">
        <div className="portal-teaser">
          <SectionHeader
            eyebrow="Student portal"
            title="Try the"
            titleLine2="portal demo"
            emphasis="gradient"
            lede="Preview student, parent, and teacher dashboards with clearly labelled sample data. Live logins activate when your registration is approved and the API is connected — nothing here pretends to be a real account."
          />
          <div className="portal-teaser__actions">
            <PortalDemoLinks />
            <Link href="/portal/login" className="portal-teaser__signin">
              Sign in page
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
