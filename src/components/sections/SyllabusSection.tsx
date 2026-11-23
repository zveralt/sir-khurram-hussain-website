"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SyllabusRadialEmbed } from "@/components/syllabus/SyllabusRadialEmbed";
import { SectionScene } from "@/components/ui/SectionScene";
import { useSectionInView } from "@/hooks/useSectionInView";
import { GlassCard, SectionHeader, SegmentedControl } from "@/components/widgets";
import { subtopicChipsForNode } from "@/data/syllabus-2058";
import { LIBRARY_TITLES } from "@/lib/library";
import {
  SYLLABUS_CATEGORY_FILTERS,
  categoryForNode,
  categoryLabel,
  type SyllabusCategoryKey,
} from "@/lib/syllabus-categories";
import { SYLLABUS_NODES, type SyllabusNode } from "@/lib/syllabus";
import { siteConfig } from "@/lib/site-config";

export function SyllabusSection() {
  const { sectionRef, inView } = useSectionInView();
  const [filter, setFilter] = useState<SyllabusCategoryKey>("all");
  const [mapView, setMapView] = useState(false);

  const nodes = useMemo(() => {
    if (filter === "all") return SYLLABUS_NODES;
    return SYLLABUS_NODES.filter((n) => categoryForNode(n) === filter);
  }, [filter]);

  return (
    <section
      ref={sectionRef}
      id="syllabus"
      className={`section-anchor section-premium syllabus-section${inView ? " section-premium--inview" : ""}`}
    >
      <SectionScene />
      <div className="shell section-premium__shell py-20 lg:py-28">
        <SectionHeader
          eyebrow="Syllabus"
          title="Nine fields."
          titleLine2="One subject."
          emphasis="gradient"
          lede="SKH’s published Islamiyat companions mapped to Cambridge 2058 teaching areas — orientation, not a specification reprint."
        />

        <div className="syllabus-section__toolbar mt-10">
          <SegmentedControl
            ariaLabel="Syllabus category"
            value={filter}
            onChange={setFilter}
            options={SYLLABUS_CATEGORY_FILTERS.map((c) => ({ value: c.key, label: c.label }))}
          />
          <button
            type="button"
            className="btn btn-ghost text-sm min-h-10"
            aria-pressed={mapView}
            onClick={() => setMapView((v) => !v)}
          >
            {mapView ? "Card view" : "Map view"}
          </button>
        </div>

        {mapView ? (
          <GlassCard className="syllabus-section__map-slot" padding="md">
            <SyllabusRadialEmbed />
          </GlassCard>
        ) : (
          <ul className="syllabus-section__cards">
            {nodes.map((node) => (
              <li key={node.id}>
                <SyllabusTopicCard node={node} />
              </li>
            ))}
          </ul>
        )}

        {siteConfig.cambridgeDocuments.length ? (
          <div className="syllabus-docs">
            {siteConfig.cambridgeDocuments.map((doc) => (
              <GlassCard key={doc.url} padding="md" className="flex flex-col gap-2">
                <a href={doc.url} target="_blank" rel="noopener noreferrer" className="font-medium text-fg link-u">
                  {doc.title} ↗
                </a>
                <p className="text-sm text-muted">{doc.note}</p>
              </GlassCard>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function SyllabusTopicCard({ node }: { node: SyllabusNode }) {
  const cat = categoryForNode(node);
  const chips = subtopicChipsForNode(node.id, node.companions);
  const chipCount = chips.length;

  return (
    <GlassCard className="syllabus-topic-card" padding="md">
      <div className="flex items-start justify-between gap-2">
        <span className="syllabus-topic-card__index">{node.n}</span>
        <span className="syllabus-topic-card__count">{chipCount} topics</span>
      </div>
      <h3 className="syllabus-topic-card__title">{node.title}</h3>
      <p className="syllabus-topic-card__intro">{node.intro}</p>
      <div className="syllabus-topic-card__chips">
        {chips.map((chip) => (
          <ChipLink key={chip} chip={chip} category={categoryLabel(cat)} companion={chip} />
        ))}
      </div>
    </GlassCard>
  );
}

function ChipLink({ chip, category, companion }: { chip: string; category: string; companion: string }) {
  const book = LIBRARY_TITLES.find((t) => t.title === companion);
  const href = book ? `/#library` : "/resources";

  return (
    <span className="syllabus-chip-wrap relative inline-flex max-w-full">
      <Link href={href} className="syllabus-chip-btn" title={`Open ${companion} in library`}>
        {chip}
      </Link>
      <span className="syllabus-chip-tooltip" role="tooltip">
        <span className="font-mono text-[0.6rem] uppercase tracking-widest text-muted">{category}</span>
        <span className="mt-1 block text-fg">{companion}</span>
      </span>
    </span>
  );
}
