"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import {
  CursorRing,
  FloatingChips,
  GlassCard,
  HandDrawnUnderline,
  KeyboardSearch,
  OrbitBadge,
  PageProgress,
  ProgressRing,
  Rosette,
  ScrollTopButton,
  SeatGrid,
  SectionHeader,
  SegmentedControl,
  StatCard,
  Tabs,
} from "@/components/widgets";

export function WidgetsDemo() {
  const [segment, setSegment] = useState<"all" | "courses" | "faq">("all");
  const [search, setSearch] = useState("");

  return (
    <>
      <PageProgress />
      <ScrollTopButton />
      <CursorRing />

      <div className="relative overflow-x-clip">
        <Rosette className="absolute -right-24 top-8 opacity-[0.09]" size={360} />

        <div className="shell py-16 md:py-24 space-y-20 md:space-y-28">
          <SectionHeader
            eyebrow="Developer"
            title="Widget kit"
            titleLine2="preview."
            emphasis="underline"
            lede="Internal review page for reusable admissions UI. Not indexed. Demo numbers below are labelled — production widgets read site-config only."
          />

          <section className="relative space-y-8">
            <SectionHeader
              eyebrow="Typography"
              title="Section headers"
              titleLine2="and emphasis."
              emphasis="gradient"
              lede="Mono eyebrow with 32px rule; gradient or hand-drawn emerald underline."
            />
            <p className="text-lg font-display">
              Islamiyat revision with{" "}
              <HandDrawnUnderline>structure</HandDrawnUnderline> you can trust.
            </p>
          </section>

          <section className="space-y-8">
            <SectionHeader eyebrow="Identity" title="Orbit badge" lede="Monogram, ring text, drifting chips." />
            <OrbitBadge
              initials="KH"
              orbitText="Academic Studio"
              chips={[{ label: "2058" }, { label: "Karachi" }, { label: "LMS" }]}
            />
          </section>

          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatCard value={siteConfig.campuses.count} title="Karachi campuses" subtext="From site-config." visual="pins" />
            <StatCard value={siteConfig.studyCompanions.length} title="Study companions" subtext="Library index count." visual="grid" visualFilled={4} visualTotal={13} />
            <StatCard value={5} title="Demo clock visual" subtext="Illustration only — not a live stat." visual="clock" visualActive={8} />
            <StatCard value={3} title="Demo steps" subtext="Illustration only." visual="steps" visualTotal={5} visualActive={3} />
          </section>

          <section className="flex flex-wrap items-center gap-10">
            <ProgressRing value={68} label="Syllabus mapped" />
            <GlassCard className="max-w-xs">
              <p className="font-mono text-xs uppercase tracking-widest text-muted">Seat grid</p>
              <p className="mt-2 text-sm text-muted">Demo layout only (not live seat data):</p>
              <div className="mt-4">
                <SeatGrid filled={14} total={20} />
              </div>
              <p className="mt-4 text-xs text-muted">Production: pass real filled/total from config or hide.</p>
            </GlassCard>
          </section>

          <section className="space-y-6">
            <SectionHeader eyebrow="Motion" title="Floating chips" lede="Seeded positions; paused off-screen." />
            <FloatingChips labels={["Syllabus", "Sources", "Practice", "Review", "LMS"]} density="medium" />
          </section>

          <section className="space-y-6 relative min-h-[240px]">
            <SectionHeader eyebrow="Geometry" title="Rosette" lede="12-fold background art." />
            <Rosette className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" opacity={0.18} size={280} />
          </section>

          <section className="space-y-6">
            <SectionHeader eyebrow="Controls" title="Glass, segments, tabs" />
            <GlassCard>
              <SegmentedControl
                ariaLabel="Filter demo"
                value={segment}
                onChange={setSegment}
                options={[
                  { value: "all", label: "All" },
                  { value: "courses", label: "Courses" },
                  { value: "faq", label: "FAQ" },
                ]}
              />
              <p className="mt-4 text-sm text-muted">Selected: {segment}</p>
            </GlassCard>
            <Tabs
              ariaLabel="Widget tabs demo"
              items={[
                { id: "a", label: "Overview", panel: <p className="text-muted text-sm">Tab panel A — keyboard navigable.</p> },
                { id: "b", label: "Syllabus", panel: <p className="text-muted text-sm">Tab panel B — Islamiyat 2058 orientation.</p> },
                { id: "c", label: "Contact", panel: <p className="text-sm">{siteConfig.contact.email}</p> },
              ]}
            />
          </section>

          <section className="max-w-md space-y-4">
            <SectionHeader eyebrow="Search" title="Keyboard search" lede={'Press "/" to focus.'} />
            <KeyboardSearch value={search} onChange={setSearch} placeholder="Filter widgets…" />
            {search ? <p className="text-sm text-muted">Query: {search}</p> : null}
          </section>

          <div className="h-[40vh]" aria-hidden />
        </div>
      </div>
    </>
  );
}
