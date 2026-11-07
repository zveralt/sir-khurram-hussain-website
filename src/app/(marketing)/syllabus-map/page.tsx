import type { Metadata } from "next";
import { Suspense } from "react";
import { MarketingShell } from "@/components/layout/MarketingShell";
import { SyllabusMap } from "@/components/sections/SyllabusMap";

export const metadata: Metadata = {
  title: "Syllabus map",
  description:
    "Interactive map of SKH’s published Cambridge O Level Islamiyat companions. An orientation, not the official specification.",
};

export default function SyllabusMapPage() {
  return (
    <MarketingShell>
      <div className="band-deep">
        <Suspense fallback={<div className="shell py-24 text-ice">Loading the syllabus map…</div>}>
          <SyllabusMap />
        </Suspense>
      </div>
    </MarketingShell>
  );
}
