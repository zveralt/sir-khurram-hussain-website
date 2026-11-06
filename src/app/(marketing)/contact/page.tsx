import type { Metadata } from "next";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { EnrollmentSection } from "@/components/sections/EnrollmentSection";
import { skhContact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Sir Khurram Hussain Academic Studio and SKH Solutions — inquiry form and official SKH channels.",
};

export default function ContactPage() {
  return (
    <MarketingShell>
      <main id="main-content" className="w-full bg-[#F7F6F2] dark:bg-surface min-h-[calc(100vh-20rem)]">
        <section className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter py-16 lg:py-20">
          <p className="font-label-md text-label-md uppercase tracking-widest text-[#123B65] dark:text-primary mb-2">
            Contact
          </p>
          <h1 className="font-headline-xl text-headline-lg lg:text-headline-xl uppercase font-bold text-[#071B33] dark:text-on-surface tracking-tight mb-6">
            Inquiries &amp; admissions routing
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-body-md text-body-md text-[#334155] dark:text-on-surface-variant">
            <div className="border border-[#071B33]/15 dark:border-primary-container/50 p-6 bg-white dark:bg-surface-container">
              <h2 className="font-headline-sm text-headline-sm uppercase font-bold text-[#071B33] dark:text-on-surface mb-3">
                SKH Solutions (Karachi coaching)
              </h2>
              <p>Phone: <a className="text-[#123B65] dark:text-primary underline" href={`tel:${skhContact.phoneTel}`}>{skhContact.phoneDisplay}</a></p>
              <p className="mt-2">
                Email:{" "}
                <a className="text-[#123B65] dark:text-primary underline" href={`mailto:${skhContact.email}`}>
                  {skhContact.email}
                </a>
              </p>
              <p className="mt-2">
                Website:{" "}
                <a className="text-[#123B65] dark:text-primary underline" href={skhContact.web} target="_blank" rel="noopener noreferrer">
                  skh.com.pk
                </a>
              </p>
            </div>
            <div className="border border-[#071B33]/15 dark:border-primary-container/50 p-6 bg-white dark:bg-surface-container">
              <h2 className="font-headline-sm text-headline-sm uppercase font-bold text-[#071B33] dark:text-on-surface mb-3">
                Academic Studio inquiry
              </h2>
              <p>Use the form below for digital programmes. It posts to <code className="font-mono text-sm">/api/enquiry</code> — configure a webhook in production for notifications.</p>
            </div>
          </div>
        </section>
        <EnrollmentSection sectionId="contact-enquiry" inquirySource="contact-page" />
      </main>
    </MarketingShell>
  );
}
