"use client";

import { useSectionInView } from "@/hooks/useSectionInView";
import { useCountUp } from "@/hooks/useCountUp";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { GlassCard } from "@/components/widgets";
import { CampusPins, CompanionSpines, SyllabusNodes } from "@/components/sections/stats-visuals";
import { StatsStatement } from "@/components/sections/StatsStatement";
import { siteConfig } from "@/lib/site-config";

const SOURCE_NOTE = "Sources: SKH public listing, SKH books & notes index, this site's syllabus map.";

type VisualKind = "pins" | "spines" | "nodes";

export function StatsSection() {
  const { sectionRef, inView } = useSectionInView();
  const hs = siteConfig.headlineStats;
  const reduced = usePrefersReducedMotion();

  const items: { key: string; value: number; label: string; visual: VisualKind }[] = [];
  if (hs.campuses) {
    items.push({
      key: "campuses",
      value: hs.campuses.value,
      label: hs.campuses.label,
      visual: "pins",
    });
  }
  if (hs.companions) {
    items.push({
      key: "companions",
      value: hs.companions.value,
      label: hs.companions.label,
      visual: "spines",
    });
  }
  if (hs.syllabusFields) {
    items.push({
      key: "fields",
      value: hs.syllabusFields.value,
      label: hs.syllabusFields.label,
      visual: "nodes",
    });
  }
  if (hs.yearsTeaching) {
    items.push({
      key: "years",
      value: hs.yearsTeaching.value,
      label: hs.yearsTeaching.label,
      visual: "nodes",
    });
  }

  if (!items.length) return null;

  const statement = siteConfig.statement;

  return (
    <section
      ref={sectionRef}
      id="stats"
      className={`section-anchor section-premium section-premium--alt stats-section${
        inView ? " section-premium--inview" : ""
      }`}
    >
      <div className="stats-section__glow" aria-hidden />
      <div className="shell section-premium__shell">
        <div className="stats-section__layout">
          <div className="stats-section__intro">
            <div className="stats-section__titles">
              <p className="widget-section-header__eyebrow">By the numbers</p>
              <h2 className="widget-section-header__title">
                Verified facts.{" "}
                <span className="widget-section-header__title-gradient">On the record.</span>
              </h2>
            </div>
            <div className="stats-section__aside">
              <p className="widget-section-header__lede">
                Counts from SKH’s public index and this site’s syllabus map — not invented metrics.
              </p>
            </div>
          </div>

          <ul className="stats-section__grid" data-count={items.length}>
            {items.map((item, index) => (
              <li key={item.key} style={{ ["--i" as string]: index }}>
                <StatsFact
                  value={item.value}
                  label={item.label}
                  visual={item.visual}
                  active={inView}
                  reduced={reduced}
                />
              </li>
            ))}
          </ul>
          <p className="stats-section__sources">{SOURCE_NOTE}</p>
          <StatsStatement text={statement} />
        </div>
      </div>
    </section>
  );
}

function StatsFact({
  value,
  label,
  visual,
  active,
  reduced,
}: {
  value: number;
  label: string;
  visual: VisualKind;
  active: boolean;
  reduced: boolean;
}) {
  const counted = useCountUp(value, active && !reduced);
  const display = reduced ? value : counted;
  const drawn = reduced || active;

  return (
    <GlassCard className="stats-card" padding="md">
      <div className="stats-card__art">
        {visual === "pins" ? <CampusPins drawn={drawn} /> : null}
        {visual === "spines" ? <CompanionSpines drawn={drawn} /> : null}
        {visual === "nodes" ? <SyllabusNodes drawn={drawn} /> : null}
      </div>
      <p className="stats-card__value font-display">{display}</p>
      <h3 className="stats-card__title font-display">{label}</h3>
    </GlassCard>
  );
}
