"use client";

import { BookOpen, Building2, Monitor } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SectionScene } from "@/components/ui/SectionScene";
import { useSectionInView } from "@/hooks/useSectionInView";
import { portraits } from "@/lib/media";

const notes = [
  {
    title: "SKH Solutions",
    body: "Karachi O and A Level coaching network. Public faculty listing places Sir Khurram under Islamiyat.",
    Icon: Building2,
  },
  {
    title: "This studio",
    body: "Digital discovery of courses and resources. Learner accounts and commerce remain with Aark Academy’s LMS.",
    Icon: Monitor,
  },
  {
    title: "Study companions",
    body: "SKH publishes a structured books-and-notes index for Islamic Studies. Digital fulfilment will follow LMS products.",
    Icon: BookOpen,
  },
];

export function AboutSection() {
  const { sectionRef, inView } = useSectionInView();

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`section-anchor section-premium section-premium--alt educator-premium${
        inView ? " section-premium--inview" : ""
      }`}
    >
      <SectionScene />
      <div className="shell section-premium__shell">
        <div className="educator-premium__layout">
          <figure className="educator-premium__media" data-premium-reveal style={{ ["--reveal-delay" as string]: "0ms" }}>
            <span className="educator-premium__frame-back" aria-hidden />
            <div className="educator-premium__portrait-wrap">
              <Image
                src={portraits.about}
                alt="Sir Khurram Hussain"
                fill
                sizes="(max-width: 1024px) 100vw, 36vw"
                className="object-cover object-[50%_18%] zoom-img img-grade"
              />
            </div>
            <figcaption className="educator-premium__caption">Photograph from SKH faculty materials.</figcaption>
          </figure>

          <div data-premium-reveal style={{ ["--reveal-delay" as string]: "80ms" }}>
            <header className="section-premium__header section-premium__header--stacked" style={{ marginBottom: "1.5rem" }}>
              <div className="section-premium__header-main">
                <p className="section-premium__eyebrow eyebrow">The educator</p>
                <h2 className="section-premium__title mt-4 font-display font-semibold">
                  <span className="section-premium__title-line">A dedication to clear,</span>{" "}
                  <span className="section-premium__title-accent">patient teaching.</span>
                </h2>
              </div>
            </header>

            <div className="section-premium__prose">
              <p>
                Sir Khurram Hussain is known as the founder and academic face of{" "}
                <a href="https://www.skh.com.pk/" className="section-premium__link" target="_blank" rel="noopener noreferrer">
                  SKH Solutions
                </a>
                , a Cambridge-aligned coaching network in Karachi. SKH lists him under Islamiyat, with long-form classroom
                experience.
              </p>
              <p className="mt-6">
                Academic Studio extends that work online without replacing campus admissions. We publish only what can be
                sourced — see{" "}
                <Link href="/about" className="section-premium__link">
                  the about page
                </Link>
                .
              </p>
            </div>

            <ul className="educator-premium__cards">
              {notes.map((n, i) => (
                <li
                  key={n.title}
                  className="section-premium__glass-card educator-premium__note-card"
                  data-premium-reveal
                  style={{ ["--reveal-delay" as string]: `${160 + i * 60}ms` }}
                >
                  <span className="educator-premium__note-icon" aria-hidden>
                    <n.Icon strokeWidth={1.65} className="h-5 w-5" />
                  </span>
                  <h3 className="educator-premium__note-title font-display">{n.title}</h3>
                  <p className="educator-premium__note-body">{n.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
