import type { ReactNode } from "react";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { aarkLmsPublicUrl } from "@/lib/site";

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="pt-16 md:pt-[4.5rem] min-h-dvh">
        <div className="shell py-4 flex justify-end border-b border-line">
          <Link
            href={aarkLmsPublicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow link-u"
          >
            Official LMS ↗
          </Link>
        </div>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
