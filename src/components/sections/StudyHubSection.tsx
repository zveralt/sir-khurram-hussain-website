"use client";

import { useEffect, useMemo, useState } from "react";
import { BooksNotesTab } from "@/components/study-hub/BooksNotesTab";
import { LecturesTab } from "@/components/study-hub/LecturesTab";
import { PastPapersTab } from "@/components/study-hub/PastPapersTab";
import { SectionScene } from "@/components/ui/SectionScene";
import { useSectionInView } from "@/hooks/useSectionInView";
import { StudyHubErrorBoundary } from "@/components/study-hub/StudyHubErrorBoundary";
import { SectionHeader } from "@/components/widgets";
import {
  defaultStudyHubTab,
  type StudyHubTabId,
  visibleStudyHubTabs,
} from "@/lib/study-hub-tabs";

function tabFromHash(hash: string, visible: StudyHubTabId[]): StudyHubTabId | null {
  if ((hash === "journey" || hash === "lectures") && visible.includes("lectures")) return "lectures";
  if (hash === "library-books" || hash === "library") return "books";
  if (hash === "papers" && visible.includes("papers")) return "papers";
  return null;
}

export function StudyHubSection() {
  const { sectionRef, inView } = useSectionInView();
  const tabs = useMemo(() => visibleStudyHubTabs(), []);
  const [tab, setTab] = useState<StudyHubTabId>(defaultStudyHubTab());

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const visibleIds = tabs.map((t) => t.id);
      const next = tabFromHash(window.location.hash.replace("#", ""), visibleIds);
      if (next) setTab(next);
    });
    return () => cancelAnimationFrame(id);
  }, [tabs]);

  useEffect(() => {
    const onHash = () => {
      const visibleIds = tabs.map((t) => t.id);
      const next = tabFromHash(window.location.hash.replace("#", ""), visibleIds);
      if (next) setTab(next);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [tabs]);

  useEffect(() => {
    if (tabs.some((t) => t.id === tab)) return;
    const id = requestAnimationFrame(() => setTab(tabs[0]?.id ?? "books"));
    return () => cancelAnimationFrame(id);
  }, [tabs, tab]);

  return (
    <section
      ref={sectionRef}
      id="library"
      className={`section-anchor section-premium study-hub${inView ? " section-premium--inview" : ""}`}
    >
      <span id="journey" className="sr-only" tabIndex={-1}>
        Lectures anchor
      </span>
      <SectionScene />
      <div className="shell study-hub__shell">
        <SectionHeader
          eyebrow="Study hub"
          title="Companions, lessons,"
          titleLine2="and papers."
          emphasis="gradient"
          lede="SKH’s companion index, recorded lessons when published, and past papers when catalogued — nothing invented."
        />

        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Study hub">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              className={`rounded-full border px-4 py-2 text-xs font-mono uppercase tracking-widest ${
                tab === item.id ? "border-[var(--widget-emerald)] text-fg" : "border-line text-muted"
              }`}
              onClick={() => setTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <h2 className="sr-only">
          {tabs.find((t) => t.id === tab)?.label ?? "Study hub"}
        </h2>

        <div className={`study-hub__panel mt-6${tab === "papers" ? "" : " study-hub__panel--stack"}`}>
          <StudyHubErrorBoundary>
            {tab === "papers" ? <PastPapersTab /> : null}
            {tab === "books" ? <BooksNotesTab /> : null}
            {tab === "lectures" ? <LecturesTab /> : null}
          </StudyHubErrorBoundary>
        </div>
      </div>
    </section>
  );
}
