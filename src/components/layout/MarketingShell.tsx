import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";

export function MarketingShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <div className="pt-20">{children}</div>
      <SiteFooter />
    </>
  );
}
