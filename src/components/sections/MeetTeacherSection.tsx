"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useSectionInView } from "@/hooks/useSectionInView";
import { HandDrawnUnderline } from "@/components/widgets";
import {
  DEFAULT_CLASS_STEPS,
  TEACHER_BIO,
  teacherNameParts,
  TIMES_OF_YOUTH_QUOTE,
  TIMES_OF_YOUTH_URL,
} from "@/lib/teacher";
import {
  hasStats,
  hasWhatsApp,
  siteConfig,
  whatsAppChatUrl,
  type ClassStep,
} from "@/lib/site-config";
import { portraits } from "@/lib/media";

/** Native width of public/images/khurram-about.jpg. The frame never exceeds this. */
const PORTRAIT_NATIVE_WIDTH = 780;

type PanelKey = "about" | "class" | "glance";

const TABS: { value: PanelKey; label: string }[] = [
  { value: "about", label: "About" },
  { value: "class", label: "In class" },
  { value: "glance", label: "At a glance" },
];

export function MeetTeacherSection() {
  const { sectionRef, inView } = useSectionInView();
  const [panel, setPanel] = useState<PanelKey>("about");
  const { leading, emphasis } = teacherNameParts();
  const stats = hasStats() ? siteConfig.stats!.slice(0, 4).filter((stat) => stat.value && stat.label) : [];
  const showGlance = stats.length > 0;
  const whatsApp = hasWhatsApp() ? whatsAppChatUrl() : null;
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [bar, setBar] = useState({ width: 0, left: 0 });

  const classSteps = useMemo((): ClassStep[] => {
    const configured = siteConfig.classSteps;
    if (configured?.length) return [...configured];
    return DEFAULT_CLASS_STEPS.map((s) => ({ title: s.title, body: s.body }));
  }, []);

  const placeBar = useCallback(() => {
    const idx = TABS.findIndex((tab) => tab.value === panel);
    const btn = tabRefs.current[idx];
    const parent = btn?.parentElement;
    if (!btn || !parent) return;
    const parentRect = parent.getBoundingClientRect();
    const rect = btn.getBoundingClientRect();
    setBar({ width: rect.width, left: rect.left - parentRect.left });
  }, [panel]);

  useLayoutEffect(() => {
    placeBar();
    window.addEventListener("resize", placeBar);
    return () => window.removeEventListener("resize", placeBar);
  }, [placeBar]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`section-anchor section-premium section-premium--alt meet-teacher${
        inView ? " section-premium--inview" : ""
      }`}
    >
      <div className="shell section-premium__shell">
        <p className="widget-section-header__eyebrow">Meet your teacher</p>

        <div className="meet-teacher__layout">
          <div className="meet-teacher__media">
            <div className="meet-teacher__glow" aria-hidden />
            <div className="meet-teacher__photo-wrap" style={{ maxWidth: PORTRAIT_NATIVE_WIDTH }}>
              <div className="meet-teacher__photo">
                <Image
                  src={portraits.about}
                  alt={siteConfig.teacher.name}
                  fill
                  sizes="(max-width: 767px) 360px, 460px"
                  style={{ objectFit: "cover", objectPosition: "center 18%" }}
                />
                <div className="meet-teacher__shade" aria-hidden />
              </div>
            </div>
            <p className="meet-teacher__caption">Photograph from SKH faculty materials.</p>
          </div>

          <div className="meet-teacher__copy">
            <div>
              <p className="meet-teacher__eyebrow">Karachi &amp; online</p>
              <h2 className="meet-teacher__name">
                {leading} {emphasis ? <HandDrawnUnderline>{emphasis}</HandDrawnUnderline> : null}
              </h2>
              <p className="meet-teacher__role">{siteConfig.teacher.title}</p>
            </div>

            <div>
              <div className="meet-teacher__tabs" role="tablist" aria-label="Teacher information">
                <span
                  className="meet-teacher__tab-bar"
                  style={{ width: bar.width, transform: `translateX(${bar.left}px)` }}
                  aria-hidden
                />
                {TABS.map((tab, i) => (
                  <button
                    key={tab.value}
                    type="button"
                    role="tab"
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    aria-selected={panel === tab.value}
                    className="meet-teacher__tab"
                    onClick={() => setPanel(tab.value)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="meet-teacher__panels">
                <div className="meet-teacher__prose" data-active={panel === "about"} aria-hidden={panel !== "about"} inert={panel !== "about"}>
                  <p>
                    Sir Khurram Hussain is publicly associated with{" "}
                    <a className="meet-teacher__link" href={siteConfig.contact.web} target="_blank" rel="noopener noreferrer">
                      SKH Solutions
                    </a>
                    , a Karachi O and A Level coaching network that emphasises Cambridge syllabus coverage, weekly
                    written practice, and multi-campus access. SKH’s faculty listing places him under Islamiyat, with
                    long-form classroom experience.
                  </p>
                  <p>{TEACHER_BIO[1]}</p>
                  <p>
                    See the full{" "}
                    <Link href="/about" className="meet-teacher__link">
                      about page
                    </Link>{" "}
                    for sources.
                  </p>
                </div>

                <ol className="meet-teacher__timeline" data-active={panel === "class"} aria-hidden={panel !== "class"} inert={panel !== "class"}>
                  {classSteps.map((step, i) => (
                    <li key={step.title} className="meet-teacher__step">
                      <span className="meet-teacher__step-num">{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <p className="meet-teacher__step-title">{step.title}</p>
                        <p className="meet-teacher__step-body">{step.body}</p>
                        {step.duration ? <p className="meet-teacher__step-duration">{step.duration}</p> : null}
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="meet-teacher__stats" data-active={panel === "glance"} aria-hidden={panel !== "glance"} inert={panel !== "glance"}>
                  {showGlance ? (
                    stats.map((stat) => (
                      <div key={stat.label}>
                        <p className="meet-teacher__stat-value">{stat.value}</p>
                        <p className="meet-teacher__stat-label">{stat.label}</p>
                        {stat.source ? <p className="meet-teacher__stat-source">{stat.source}</p> : null}
                      </div>
                    ))
                  ) : (
                    <p className="meet-teacher__empty">
                      Verified headline stats will appear here once they are added to site configuration.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <hr className="meet-teacher__divider" />

            <figure className="meet-teacher__quote">
              <span className="meet-teacher__quote-kicker" aria-hidden />
              <blockquote cite={TIMES_OF_YOUTH_URL}>
                <p className="meet-teacher__quote-text">{TIMES_OF_YOUTH_QUOTE}</p>
              </blockquote>
              <footer className="meet-teacher__quote-cite">
                — Sir Khurram Hussain,{" "}
                <a className="meet-teacher__link" href={TIMES_OF_YOUTH_URL} target="_blank" rel="noopener noreferrer">
                  Times of Youth
                </a>
              </footer>
            </figure>

            <div className="meet-teacher__ctas">
              <Link href="/#register" className="btn btn-primary">
                Register now <span className="arrow">→</span>
              </Link>
              {whatsApp ? (
                <a href={whatsApp} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
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
