"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SectionScene } from "@/components/ui/SectionScene";
import { useSectionInView } from "@/hooks/useSectionInView";
import {
  GlassCard,
  HandDrawnUnderline,
  OrbitBadge,
  SegmentedControl,
  StatCard,
} from "@/components/widgets";
import {
  DEFAULT_CLASS_STEPS,
  ORBIT_TEACHER_LABEL,
  TEACHER_BIO,
  teacherNameParts,
  TIMES_OF_YOUTH_QUOTE,
  TIMES_OF_YOUTH_URL,
} from "@/lib/teacher";
import {
  hasAdmissionsOpen,
  hasStats,
  hasWhatsApp,
  siteConfig,
  whatsAppChatUrl,
  type ClassStep,
} from "@/lib/site-config";
import { portraits } from "@/lib/media";

type PanelKey = "about" | "class" | "glance";

function parseStatNumber(value: string): { n: number; suffix: string } | null {
  const m = /^(\d+)(.*)$/.exec(value.trim());
  if (!m) return null;
  return { n: Number(m[1]), suffix: m[2] ?? "" };
}

export function MeetTeacherSection() {
  const { sectionRef, inView } = useSectionInView();
  const [panel, setPanel] = useState<PanelKey>("about");
  const { leading, emphasis } = teacherNameParts();

  const orbitChips = useMemo(() => {
    const chips: { label: string; href?: string }[] = [
      { label: "Teaches 2058" },
      { label: "Register online", href: "/#register" },
    ];
    if (hasAdmissionsOpen()) chips.push({ label: "Now enrolling" });
    return chips;
  }, []);

  const classSteps = useMemo((): ClassStep[] => {
    const configured = siteConfig.classSteps;
    if (configured?.length) return [...configured];
    return DEFAULT_CLASS_STEPS.map((s) => ({ title: s.title, body: s.body }));
  }, []);

  const stats = hasStats() ? siteConfig.stats!.slice(0, 4) : [];

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`section-anchor section-premium section-premium--alt meet-teacher${
        inView ? " section-premium--inview" : ""
      }`}
    >
      <SectionScene />
      <div className="shell section-premium__shell">
        <header className="widget-section-header__eyebrow-only">
          <p className="widget-section-header__eyebrow">Meet your teacher</p>
        </header>

        <div className="meet-teacher__layout mt-8">
          <GlassCard className="meet-teacher__portrait-panel" padding="lg">
            <OrbitBadge
              variant="photo"
              initials="KH"
              orbitText={ORBIT_TEACHER_LABEL}
              chips={orbitChips}
              photoSrc={portraits.about}
              photoAlt={siteConfig.teacher.name}
              size="lg"
            />
            <p className="meet-teacher__caption">Photograph from SKH faculty materials.</p>
          </GlassCard>

          <div>
            <p className="widget-section-header__eyebrow">Karachi &amp; online</p>
            <h2 className="widget-section-header__title mt-3">
              {leading} {emphasis ? <HandDrawnUnderline>{emphasis}</HandDrawnUnderline> : null}
            </h2>
            <p className="meet-teacher__role">{siteConfig.teacher.title}</p>

            <GlassCard className="meet-teacher__panel-body mt-6">
              <SegmentedControl
                ariaLabel="Teacher information"
                value={panel}
                onChange={setPanel}
                options={[
                  { value: "about", label: "About" },
                  { value: "class", label: "In class" },
                  { value: "glance", label: "At a glance" },
                ]}
              />

              <div className="mt-6">
                {panel === "about" ? (
                  <div className="meet-teacher__prose">
                    <p>
                      Sir Khurram Hussain is publicly associated with{" "}
                      <a href={siteConfig.contact.web} target="_blank" rel="noopener noreferrer">
                        SKH Solutions
                      </a>
                      , a Karachi O and A Level coaching network that emphasises Cambridge syllabus coverage, weekly
                      written practice, and multi-campus access. SKH’s faculty listing places him under Islamiyat, with
                      long-form classroom experience.
                    </p>
                    <p className="mt-5">{TEACHER_BIO[1]}</p>
                    <p className="mt-5">
                      See the full{" "}
                      <Link href="/about" className="text-[var(--widget-blue-soft)] underline underline-offset-2">
                        about page
                      </Link>{" "}
                      for sources.
                    </p>
                  </div>
                ) : null}

                {panel === "class" ? (
                  <ol className="meet-teacher__timeline">
                    {classSteps.map((step, i) => (
                      <li key={step.title} className="meet-teacher__step">
                        <span className="meet-teacher__step-num">{String(i + 1).padStart(2, "0")}</span>
                        <p className="meet-teacher__step-title">{step.title}</p>
                        <p className="meet-teacher__step-body">{step.body}</p>
                        {step.duration ? <p className="meet-teacher__step-duration">{step.duration}</p> : null}
                      </li>
                    ))}
                  </ol>
                ) : null}

                {panel === "glance" ? (
                  stats.length ? (
                    <div className="meet-teacher__stats">
                      {stats.map((stat) => {
                        const parsed = parseStatNumber(stat.value);
                        if (parsed) {
                          return (
                            <StatCard
                              key={stat.label}
                              value={parsed.n}
                              suffix={parsed.suffix}
                              title={stat.label}
                              subtext={stat.source}
                              visual="steps"
                              visualActive={Math.min(parsed.n, 4)}
                            />
                          );
                        }
                        return (
                          <GlassCard key={stat.label}>
                            <p className="meet-teacher__stat-text-value">{stat.value}</p>
                            <p className="mt-2 font-medium text-fg">{stat.label}</p>
                            {stat.source ? <p className="mt-1 text-sm text-muted">{stat.source}</p> : null}
                          </GlassCard>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-muted">
                      Verified headline stats will appear here once they are added to site configuration.
                    </p>
                  )
                ) : null}
              </div>
            </GlassCard>

            <figure className="meet-teacher__quote">
              <blockquote cite={TIMES_OF_YOUTH_URL}>
                <p className="meet-teacher__quote-text">“{TIMES_OF_YOUTH_QUOTE}”</p>
              </blockquote>
              <footer className="meet-teacher__quote-cite">
                — Sir Khurram Hussain,{" "}
                <HandDrawnUnderline>
                  <a href={TIMES_OF_YOUTH_URL} target="_blank" rel="noopener noreferrer" className="text-fg link-u">
                    Times of Youth
                  </a>
                </HandDrawnUnderline>
              </footer>
            </figure>

            <div className="meet-teacher__ctas">
              <Link href="/#register" className="btn btn-primary">
                Register now <span className="arrow">→</span>
              </Link>
              {hasWhatsApp() ? (
                <a href={whatsAppChatUrl()!} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
                  Ask on WhatsApp
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
