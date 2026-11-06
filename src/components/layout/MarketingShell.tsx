import type { ReactNode } from "react";
import { AmbientGrid } from "@/components/effects/AmbientGrid";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export function MarketingShell({ children }: { children: ReactNode }) {
  return (
    <>
      <AmbientGrid />
      <div className="relative z-[1]">
        <SiteHeader />
        <main id="main-content" className="pt-16 md:pt-[4.5rem]">
          {children}
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
