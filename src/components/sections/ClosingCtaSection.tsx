"use client";

import Link from "next/link";
import { useSectionInView } from "@/hooks/useSectionInView";
import { LIBRARY_MOTIF_HREF } from "@/components/library/LibraryMotifs";

export function ClosingCtaSection() {
  const { sectionRef, inView } = useSectionInView();

  return (
    <section
      ref={sectionRef}
      className={`section-anchor closing-cta-premium${inView ? " section-premium--inview" : ""}`}
      aria-labelledby="closing-cta-heading"
    >
      <div className="shell">
        <div className="closing-cta-premium__band surface-dark" data-premium-reveal>
          <svg className="closing-cta-premium__star" aria-hidden>
            <use href={LIBRARY_MOTIF_HREF} />
          </svg>
          <h2 id="closing-cta-heading" className="closing-cta-premium__title font-display">
            Clarity first.{" "}
            <span className="section-premium__title-accent">Confidence</span> through understanding.
          </h2>
          <div className="closing-cta-premium__actions">
            <Link href="/store" className="btn btn-primary">
              Explore the catalogue <span className="arrow">→</span>
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Make an enquiry
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
