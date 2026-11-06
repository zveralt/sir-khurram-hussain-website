import type { Metadata } from "next";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { EnrollmentSection } from "@/components/sections/EnrollmentSection";
import { PageHeader } from "@/components/ui/PageHeader";
import { skhContact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Sir Khurram Hussain Academic Studio and SKH Solutions — inquiry form and official SKH channels.",
};

export default function ContactPage() {
  return (
    <MarketingShell>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Two doors.{" "}
            <span className="text-accent-hot">Use the right one.</span>
          </>
        }
      />
      <section className="shell pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-b border-line pb-16">
          <div>
            <p className="eyebrow">SKH Solutions</p>
            <h2 className="mt-4 font-heading text-h3 font-semibold text-fg">Karachi coaching</h2>
            <p className="mt-4 text-soft leading-relaxed max-w-sm">
              Batches, campuses, fees, and timetables belong to SKH admissions.
            </p>
            <ul className="mt-6 space-y-2 text-fg">
              <li>
                <a className="link-u" href={`tel:${skhContact.phoneTel}`}>
                  {skhContact.phoneDisplay}
                </a>
              </li>
              <li>
                <a className="link-u" href={`mailto:${skhContact.email}`}>
                  {skhContact.email}
                </a>
              </li>
              <li>
                <a className="link-u" href={skhContact.web} target="_blank" rel="noopener noreferrer">
                  skh.com.pk ↗
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="eyebrow eyebrow-accent">Academic Studio</p>
            <h2 className="mt-4 font-heading text-h3 font-semibold text-fg">Digital programmes</h2>
            <p className="mt-4 text-soft leading-relaxed max-w-sm">
              The form below posts to our inquiry endpoint. In production it requires a webhook;
              otherwise you will see an honest error, not a fake success.
            </p>
          </div>
        </div>
      </section>
      <EnrollmentSection sectionId="contact-enquiry" inquirySource="contact-page" />
    </MarketingShell>
  );
}
