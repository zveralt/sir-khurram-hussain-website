"use client";

import { GraduationCap, MapPin, PlayCircle, Tag, ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FixtureMark } from "@/components/ui/FixtureMark";
import { Spotlight } from "@/components/ui/Spotlight";

export function CohortsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" },
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cohorts"
      className={`section-anchor programmes-premium${inView ? " programmes-premium--inview" : ""}`}
    >
      <div className="programmes-premium__scene" aria-hidden>
        <div className="programmes-premium__grid" />
        <div className="programmes-premium__glow programmes-premium__glow--blue" />
        <div className="programmes-premium__glow programmes-premium__glow--emerald" />
        <div className="programmes-premium__fade programmes-premium__fade--top" />
        <div className="programmes-premium__fade programmes-premium__fade--bottom" />
      </div>

      <div className="shell relative z-[1] py-20 lg:py-28">
        <header className="programmes-premium__header">
          <div className="programmes-premium__header-main">
            <p className="programmes-premium__eyebrow eyebrow">Programmes</p>
            <h2 className="programmes-premium__title mt-4 font-display text-h2 font-semibold">
              <span className="programmes-premium__title-line">Cambridge pathways.</span>{" "}
              <span className="programmes-premium__title-accent">Digitally structured.</span>
            </h2>
          </div>
          <p className="programmes-premium__lede">
            Public teaching emphasis is O Level Islamiyat. Digital listings below are{" "}
            <span className="programmes-premium__lede-emphasis">fixtures</span> until the LMS
            catalogue is connected.
          </p>
        </header>

        <ul className="programmes-premium__cards">
          <li className="programmes-premium__cards-item programmes-premium__cards-item--featured">
            <Spotlight className="programmes-premium__spot" borderRadius="1.75rem">
              <article className="programmes-premium__card programmes-premium__card--featured">
                <span className="programmes-premium__card-pattern" aria-hidden />
                <span className="programmes-premium__card-watermark font-display" aria-hidden>
                  01
                </span>

                <div className="programmes-premium__card-inner">
                  <div className="programmes-premium__card-head">
                    <div className="programmes-premium__card-pills">
                      <span className="programmes-premium__pill">O Level · 2058</span>
                      <FixtureMark className="programmes-premium__fixture" />
                    </div>
                    <span className="programmes-premium__card-index font-display" aria-hidden>
                      <span className="programmes-premium__card-index-rule" />
                      01
                    </span>
                  </div>

                  <h3 className="programmes-premium__card-title font-display">
                    Islamiyat — syllabus core
                  </h3>
                  <p className="programmes-premium__card-body">
                    Intended shape of the flagship digital track: Qur’anic passages, seerah, hadith,
                    and pillars, taught toward Cambridge assessment objectives. Module map, batches,
                    and pricing will come from the LMS.
                  </p>

                  <dl className="programmes-premium__meta">
                    <div className="programmes-premium__meta-item">
                      <GraduationCap
                        className="programmes-premium__meta-icon"
                        strokeWidth={1.65}
                        aria-hidden
                      />
                      <div>
                        <dt className="programmes-premium__meta-label">Level</dt>
                        <dd className="programmes-premium__meta-value">O Level</dd>
                      </div>
                    </div>
                    <div className="programmes-premium__meta-item">
                      <PlayCircle
                        className="programmes-premium__meta-icon"
                        strokeWidth={1.65}
                        aria-hidden
                      />
                      <div>
                        <dt className="programmes-premium__meta-label">Format</dt>
                        <dd className="programmes-premium__meta-value">Video + notes (LMS)</dd>
                      </div>
                    </div>
                    <div className="programmes-premium__meta-item">
                      <Tag className="programmes-premium__meta-icon" strokeWidth={1.65} aria-hidden />
                      <div>
                        <dt className="programmes-premium__meta-label">Price</dt>
                        <dd className="programmes-premium__meta-value">Set in LMS</dd>
                      </div>
                    </div>
                  </dl>

                  <Link
                    href="/store/o-level-islamiyat-core"
                    className="programmes-premium__cta programmes-premium__cta--primary btn btn-primary"
                  >
                    Open listing <span className="programmes-premium__cta-arrow arrow">→</span>
                  </Link>
                </div>
              </article>
            </Spotlight>
          </li>

          <li className="programmes-premium__cards-item">
            <Spotlight className="programmes-premium__spot" borderRadius="1.75rem">
              <article className="programmes-premium__card programmes-premium__card--secondary">
                <span
                  className="programmes-premium__card-pattern programmes-premium__card-pattern--emerald"
                  aria-hidden
                />
                <span className="programmes-premium__card-watermark font-display" aria-hidden>
                  02
                </span>

                <div className="programmes-premium__card-inner">
                  <div className="programmes-premium__card-head">
                    <div className="programmes-premium__card-pills">
                      <span className="programmes-premium__pill">In person · Karachi</span>
                    </div>
                    <span className="programmes-premium__card-index font-display" aria-hidden>
                      <span className="programmes-premium__card-index-rule" />
                      02
                    </span>
                  </div>

                  <div className="programmes-premium__location-tile" aria-hidden>
                    <MapPin className="programmes-premium__location-icon" strokeWidth={1.65} />
                  </div>

                  <h3 className="programmes-premium__card-title programmes-premium__card-title--secondary font-display">
                    SKH Solutions coaching
                  </h3>
                  <p className="programmes-premium__card-body">
                    SKH publishes O and A Level support across five Karachi campuses. This site does
                    not replace admissions, timetables, or fees — confirm those with SKH.
                  </p>

                  <a
                    href="https://www.skh.com.pk/contact-us/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="programmes-premium__cta programmes-premium__cta--ghost btn"
                  >
                    SKH contact <ArrowUpRight className="programmes-premium__cta-external" aria-hidden />
                  </a>
                </div>
              </article>
            </Spotlight>
          </li>
        </ul>

        <p className="programmes-premium__catalogue">
          Full catalogue with search and filters —{" "}
          <Link href="/store" className="programmes-premium__catalogue-link link-u">
            /store
            <ArrowRight className="programmes-premium__catalogue-icon" aria-hidden />
          </Link>
        </p>
      </div>
    </section>
  );
}
