"use client";

import { useState } from "react";
import { SectionScene } from "@/components/ui/SectionScene";
import { useSectionInView } from "@/hooks/useSectionInView";
import { GlassCard, SectionHeader } from "@/components/widgets";
import { CourseIllustration } from "@/components/widgets/course-illustrations";
import { getCourseOfferings } from "@/lib/courses";
import { selectCourseForRegistration } from "@/lib/enquiry-course";

export function CoursesSection() {
  const { sectionRef, inView } = useSectionInView();
  const courses = getCourseOfferings();

  return (
    <section
      ref={sectionRef}
      id="cohorts"
      className={`section-anchor section-premium courses-section${inView ? " section-premium--inview" : ""}`}
    >
      <SectionScene />
      <div className="shell section-premium__shell py-20 lg:py-28">
        <SectionHeader
          eyebrow="Courses"
          title="Cambridge pathways."
          titleLine2="Digitally structured."
          emphasis="gradient"
          lede="Public teaching emphasis is O Level Islamiyat. Hover or tap a card to explore it."
        />
        <ul className="courses-section__grid mt-12">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function CourseCard({ course }: { course: ReturnType<typeof getCourseOfferings>[number] }) {
  const [open, setOpen] = useState(false);
  const hasCover = course.coverageFields.length > 0;

  return (
    <li>
      <GlassCard
        className={`course-card${open ? " course-card--open" : ""}`}
        onMouseEnter={() => hasCover && setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <span className="course-card__watermark" aria-hidden>
          {course.numeral}
        </span>
        {course.popular ? <span className="course-card__badge">Most popular</span> : null}
        <CourseIllustration kind={course.illustration} />
        <p className="course-card__code">{course.codeLine}</p>
        <h3 className="course-card__title">{course.title}</h3>
        <p className="course-card__body">{course.description}</p>
        {course.chips?.length ? (
          <div className="course-card__chips">
            {course.chips.map((c) => (
              <span key={c.label} className="course-card__chip">
                {c.label}
              </span>
            ))}
          </div>
        ) : null}
        {hasCover ? (
          <button
            type="button"
            className="text-left text-xs font-mono uppercase tracking-widest text-[var(--widget-blue-soft)] lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
          >
            {open ? "Hide coverage" : "Explore coverage"}
          </button>
        ) : null}
        {hasCover ? (
          <div className="course-card__cover-panel">
            <p className="course-card__cover-title">What you&apos;ll cover</p>
            <ul className="course-card__cover-list">
              {course.coverageFields.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <button
          type="button"
          className="btn btn-primary mt-2 self-start"
          onClick={(e) => {
            e.stopPropagation();
            selectCourseForRegistration(course.registerCourseValue, course.title);
          }}
        >
          Join <span className="arrow">→</span>
        </button>
      </GlassCard>
    </li>
  );
}
