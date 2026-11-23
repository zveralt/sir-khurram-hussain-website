"use client";

import Link from "next/link";
import { useSectionInView } from "@/hooks/useSectionInView";
import { GlassCard } from "@/components/widgets";
import { MethodIllustration } from "@/components/widgets/method-illustrations";
import { METHOD_STEPS } from "@/lib/method";

export function MethodSection() {
  const { sectionRef, inView } = useSectionInView();

  return (
    <section
      ref={sectionRef}
      id="approach"
      className={`section-anchor section-premium method-section section-premium--alt${
        inView ? " section-premium--inview" : ""
      }`}
    >
      <div className="method-section__glow" aria-hidden />
      <div className="shell section-premium__shell">
        <div className="method-section__layout">
          <div className="method-section__intro">
            <div className="method-section__titles">
              <p className="widget-section-header__eyebrow">Method</p>
              <h2 className="widget-section-header__title">
                Four movements.{" "}
                <span className="widget-section-header__title-gradient">One discipline.</span>
              </h2>
            </div>
            <div className="method-section__aside">
              <p className="widget-section-header__lede">
                Concept, source, structure, and practice — the studio’s reading of Sir Khurram’s public teaching emphasis.
              </p>
              <Link href="/philosophy" className="btn btn-ghost">
                Teaching philosophy <span className="arrow">→</span>
              </Link>
            </div>
          </div>

          <ul className="method-section__steps">
            {METHOD_STEPS.map((step) => (
              <li key={step.id}>
                <GlassCard className="method-step-card" padding="md">
                  <div className="method-step-card__art">
                    <MethodIllustration kind={step.illustration} />
                  </div>
                  <div className="method-step-card__marker">
                    <span className="method-step-card__dot" aria-hidden />
                    <span className="method-step-card__num">{step.n}</span>
                  </div>
                  <h3 className="method-step-card__title font-display">{step.title}</h3>
                  <p className="method-step-card__body">{step.body}</p>
                </GlassCard>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
