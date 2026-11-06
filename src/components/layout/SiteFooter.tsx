import Image from "next/image";
import Link from "next/link";
import { FooterNewsletterForm } from "@/components/layout/FooterNewsletterForm";
import { skhContact } from "@/lib/site";

const LOGO_SRC =
  "https://lh3.googleusercontent.com/aida/ALJJyrAnLQVarzRJwvXBzj2hlCK5mxAXKGn4a2jEMQDlNZTFvWqJ7Z6j38xIOOq0N5YkrsBcJpiHvFNEGYOQikzmTgOi1L7R_gdlN4P6rAH1-ORlbdoUuzlQXb0owvPMSKbj2Fij4P79MEtT2WUtOUPlLx0KIKZ7UXyjRzsGpaXISjmhz1ql_-Q6p_BEtnOMK4HZxrlTIS3rZz-bBqk5eYnm0k8ApUiMH5JaMn-T0XjDNLNAlA";

export function SiteFooter() {
  return (
    <footer className="w-full bg-[#071B33] text-on-surface border-t border-[#123B65]/40 mt-space-xl">
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter pt-space-xl pb-margin">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-space-lg mb-space-xl">
          <div className="md:col-span-5 flex flex-col justify-between pr-0 md:pr-space-md">
            <div className="space-y-space-md">
              <div className="flex items-center gap-4">
                <Image
                  alt="Sir Khurram Hussain Monogram Logo"
                  className="h-8 w-auto object-contain"
                  src={LOGO_SRC}
                  width={120}
                  height={32}
                />
                <div className="flex flex-col">
                  <span className="font-headline-sm text-headline-sm uppercase text-on-surface font-bold">
                    Sir Khurram Hussain
                  </span>
                  <span className="font-label-sm text-label-sm tracking-widest text-on-surface-variant uppercase">
                    Academic Studio
                  </span>
                </div>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                Pioneering advanced pedagogy, rigorous scholarship, and intellectual
                mastery. An architectural approach to curriculum and higher secondary
                academic excellence.
              </p>
            </div>
            <div className="pt-space-md">
              <div className="inline-block border border-outline-variant px-space-sm py-space-xs font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
                Publication • Reviewed against public SKH sources
              </div>
            </div>
          </div>
          <div className="md:col-span-3 space-y-space-md">
            <div className="font-label-sm text-label-sm uppercase tracking-widest text-primary border-b border-[#123B65]/40 pb-space-xs font-semibold">
              Directory Index
            </div>
            <ul className="space-y-space-xs font-label-md text-label-md">
              <li className="flex items-center justify-between text-on-surface-variant hover:text-on-surface">
                <Link data-path="about" href="/about">
                  About
                </Link>
                <span className="font-label-sm text-label-sm text-outline">01</span>
              </li>
              <li className="flex items-center justify-between text-on-surface-variant hover:text-on-surface">
                <Link data-path="store" href="/store">
                  Course catalogue
                </Link>
                <span className="font-label-sm text-label-sm text-outline">02</span>
              </li>
              <li className="flex items-center justify-between text-on-surface-variant hover:text-on-surface">
                <Link data-path="resources" href="/resources">
                  Resources
                </Link>
                <span className="font-label-sm text-label-sm text-outline">03</span>
              </li>
              <li className="flex items-center justify-between text-on-surface-variant hover:text-on-surface">
                <Link data-path="contact" href="/contact">
                  Contact
                </Link>
                <span className="font-label-sm text-label-sm text-outline">04</span>
              </li>
              <li className="flex items-center justify-between text-on-surface-variant hover:text-on-surface">
                <Link data-path="student-portal" href="/portal/login">
                  Student portal
                </Link>
                <span className="font-label-sm text-label-sm text-outline">05</span>
              </li>
            </ul>
            <div className="pt-space-sm font-label-sm text-label-sm text-on-surface-variant space-y-space-xs">
              <p>
                SKH admissions:{" "}
                <a className="text-primary hover:underline" href={`mailto:${skhContact.email}`}>
                  {skhContact.email}
                </a>
              </p>
              <p>
                <a className="text-primary hover:underline" href={`tel:${skhContact.phoneTel}`}>
                  {skhContact.phoneDisplay}
                </a>
              </p>
            </div>
          </div>
          <div className="md:col-span-4 space-y-space-md">
            <div className="font-label-sm text-label-sm uppercase tracking-widest text-primary border-b border-[#123B65]/40 pb-space-xs font-semibold">
              Newsletter Inscription
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Receive archival lecture releases, monograph publications, and academic
              session timetables.
            </p>
            <FooterNewsletterForm />
          </div>
        </div>
        <div className="pt-space-md border-t border-[#123B65]/30 flex flex-col md:flex-row items-center justify-between gap-space-md font-label-sm text-label-sm text-on-surface-variant">
          <div className="flex items-center gap-space-md">
            <span>© 2025 Sir Khurram Hussain Academic Studio. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-space-md text-center md:text-right">
            <span>Editorial Archival System</span>
            <span className="text-outline">•</span>
            <span>Coordinate 24.8607° N, 67.0011° E</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
