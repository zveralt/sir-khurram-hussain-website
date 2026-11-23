import type { CourseOffering } from "@/lib/site-config";
import { siteConfig } from "@/lib/site-config";
import { SYLLABUS_NODES } from "@/lib/syllabus";

const ISLAMIYAT_COVERAGE = SYLLABUS_NODES.map((n) => n.title);

/** Homepage course cards — merges config overrides with verified defaults. */
export const DEFAULT_COURSES: CourseOffering[] = [
  {
    id: "o-level-islamiyat-2058",
    numeral: "01",
    codeLine: "2058 · O Level",
    title: "Islamiyat — syllabus core",
    description:
      "Flagship digital track toward Cambridge assessment objectives: Qur’anic passages, seerah, hadith, and pillars. Module map, batches, and pricing publish through the LMS when live.",
    illustration: "open-book",
    coverageFields: ISLAMIYAT_COVERAGE,
    registerCourseValue: "lms-islamiyat",
  },
  {
    id: "skh-campus-coaching",
    numeral: "02",
    codeLine: "In person · Karachi",
    title: "SKH Solutions coaching",
    description:
      "O and A Level support across five Karachi campuses. Admissions, timetables, and fees are confirmed with SKH — not through this enquiry form alone.",
    illustration: "minaret",
    coverageFields: [],
    registerCourseValue: "skh-campus",
  },
];

export function getCourseOfferings(): CourseOffering[] {
  return siteConfig.courses.length ? siteConfig.courses : DEFAULT_COURSES;
}

export function hasCustomCourses(): boolean {
  return siteConfig.courses.length > 0;
}
