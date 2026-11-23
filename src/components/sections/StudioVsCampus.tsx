"use client";

import { Check, Phone } from "lucide-react";
import Link from "next/link";
import { SectionScene } from "@/components/ui/SectionScene";
import { useSectionInView } from "@/hooks/useSectionInView";
import { skhContact } from "@/lib/site";

const studioBullets = [
  "Course and resource listings on this studio; details sync when the LMS catalogue is connected.",
  "Intended video lessons, notes, and structured revision through Aark Academy.",
  "Enquiry form on this site. Payment and enrolment complete through SKH or Learn360.",
];

const skhBullets = [
  "Five campuses. Batches, fees, and timetables belong to SKH admissions.",
  "Classroom Islamiyat with the public emphasis on weekly written practice.",
];

export function StudioVsCampus() {
  const { sectionRef, inView } = useSectionInView();

  return (
    <section
      ref={sectionRef}
      id="studio-campus"
      className={`section-anchor section-premium two-doors-premium${
        inView ? " section-premium--inview" : ""
      }`}
    >
      <SectionScene emerald />
      <div className="shell section-premium__shell">
        <header className="section-premium__header">
          <div className="section-premium__header-main" data-premium-reveal>
            <p className="section-premium__eyebrow eyebrow">Two doors</p>
            <h2 className="section-premium__title mt-4 font-display font-semibold">
              <span className="section-premium__title-line">Online studio.</span>{" "}
              <span className="section-premium__title-accent">In-person SKH.</span>
            </h2>
          </div>
        </header>

        <div className="two-doors-premium__grid">
          <article
            className="section-premium__glass-card two-doors-premium__card"
            data-premium-reveal
            style={{ ["--reveal-delay" as string]: "100ms" }}
          >
            <span className="two-doors-premium__pill">Academic Studio</span>
            <h3 className="two-doors-premium__card-title font-display">Digital discovery</h3>
            <ul className="two-doors-premium__list">
              {studioBullets.map((line) => (
                <li key={line}>
                  <Check className="two-doors-premium__check" strokeWidth={1.75} aria-hidden />
                  {line}
                </li>
              ))}
            </ul>
            <div className="two-doors-premium__cta">
              <Link href="/store" className="btn btn-primary">
                Open the catalogue <span className="arrow">→</span>
              </Link>
            </div>
          </article>

          <article
            className="section-premium__glass-card section-premium__glass-card--emerald two-doors-premium__card"
            data-premium-reveal
            style={{ ["--reveal-delay" as string]: "180ms" }}
          >
            <span className="two-doors-premium__pill two-doors-premium__pill--emerald">SKH Solutions</span>
            <h3 className="two-doors-premium__card-title font-display">Karachi campuses</h3>
            <ul className="two-doors-premium__list">
              {skhBullets.map((line) => (
                <li key={line}>
                  <Check className="two-doors-premium__check two-doors-premium__check--emerald" strokeWidth={1.75} aria-hidden />
                  {line}
                </li>
              ))}
              <li>
                <Phone className="two-doors-premium__check two-doors-premium__check--emerald" strokeWidth={1.75} aria-hidden />
                <a className="two-doors-premium__contact-link" href={`tel:${skhContact.phoneTel}`}>
                  {skhContact.phoneDisplay}
                </a>
                {" · "}
                <a className="two-doors-premium__contact-link" href={`mailto:${skhContact.email}`}>
                  {skhContact.email}
                </a>
              </li>
            </ul>
            <div className="two-doors-premium__cta">
              <a href={skhContact.web} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ borderColor: "var(--accent-secondary-border)" }}>
                skh.com.pk ↗
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
