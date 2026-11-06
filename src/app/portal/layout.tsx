import type { ReactNode } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <div className="pt-20 min-h-screen bg-[#F7F6F2] dark:bg-surface text-[#071B33] dark:text-on-surface">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-gutter py-4 flex justify-end">
          <Link
            href="https://aark-academy.learn360lms.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-label-sm text-label-sm uppercase tracking-wider text-[#123B65] dark:text-primary border border-[#123B65]/30 px-3 py-1.5"
          >
            Open LMS ↗
          </Link>
        </div>
        {children}
      </div>
    </>
  );
}
