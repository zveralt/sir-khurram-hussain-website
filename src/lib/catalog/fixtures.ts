/**
 * Development fixtures only. Replace with LMS-backed fetch when integration is configured.
 * Everywhere in the UI this data is used, the presence of fixtures is labelled.
 */
import type { CatalogCategory, CourseProduct, ResourceProduct } from "@/lib/catalog/types";

export const FIXTURE_CATEGORIES: CatalogCategory[] = [
  { id: "islamiyat", label: "Cambridge Islamiyat (2058)", slug: "islamiyat" },
  { id: "islamic-studies", label: "Islamic Studies Resources", slug: "islamic-studies" },
  { id: "exam-prep", label: "Exam Technique & Revision", slug: "exam-prep" },
];

export const FIXTURE_COURSES: CourseProduct[] = [
  {
    id: "fixture-o-level-islamiyat-core",
    kind: "course",
    slug: "o-level-islamiyat-core",
    title: "O Level Islamiyat — syllabus core (fixture)",
    shortDescription:
      "Placeholder listing for syllabus-aligned video and workbook study — content will mirror Aark Academy / LMS when connected.",
    longDescription:
      "This is a clearly labelled development fixture. Pricing, batches, and lesson outlines will be supplied by the LMS. It is shown so catalogue navigation, filters, and detail pages can be reviewed before go-live.",
    categories: ["islamiyat", "exam-prep"],
    formatLabel: "Video + structured notes (LMS)",
    levelLabel: "O Level",
    pricingLabel: "Set in LMS — not final",
    enrollmentCtaLabel: "Continue to LMS enrollment",
    lmsEnrollmentUrl: "https://aark-academy.learn360lms.com/",
    syllabusHighlights: [
      "Quranic passages and themes (syllabus alignment via LMS)",
      "Life of the Prophet (PBUH) — key narrative and examination focus",
      "Hadith and pillars — structured to Cambridge assessment objectives",
    ],
    isFixture: true,
  },
  {
    id: "fixture-islamic-studies-companion",
    kind: "course",
    slug: "islamic-studies-companion",
    title: "Islamic Studies — study companion track (fixture)",
    shortDescription:
      "Illustrative modular track for compendium-style study; final structure comes from the LMS catalogue.",
    longDescription:
      "Fixture entry for UX validation. Sir Khurram’s publicly listed materials include compendium-style resources on SKH (see books & notes). The purchasable shape on this platform will follow LMS product definitions.",
    categories: ["islamic-studies"],
    formatLabel: "Modular units (LMS)",
    levelLabel: "Secondary",
    pricingLabel: "Set in LMS — not final",
    enrollmentCtaLabel: "Open LMS",
    lmsEnrollmentUrl: "https://aark-academy.learn360lms.com/",
    syllabusHighlights: [
      "Concept compendiums mapped to examination language",
      "Applied past-paper technique (when published on LMS)",
    ],
    isFixture: true,
  },
];

export const FIXTURE_RESOURCES: ResourceProduct[] = [
  {
    id: "fixture-notes-compendium",
    kind: "resource",
    slug: "concept-compendium-notes",
    title: "Concept compendium — notes pack (fixture)",
    shortDescription: "Illustrative notes product. File delivery will be handled via LMS after purchase.",
    longDescription:
      "Development placeholder for PDF / notes commerce. Do not treat as a real downloadable asset until connected to LMS or storage.",
    categories: ["islamiyat", "islamic-studies"],
    formatLabel: "PDF (LMS)",
    pricingLabel: "Set in LMS — not final",
    enrollmentCtaLabel: "View on LMS",
    lmsEnrollmentUrl: "https://aark-academy.learn360lms.com/",
    resourceType: "notes",
    isFixture: true,
  },
  {
    id: "fixture-worksheets-pack",
    kind: "resource",
    slug: "topical-worksheets-pack",
    title: "Topical worksheets — practice pack (fixture)",
    shortDescription: "Illustrative worksheet bundle for storefront UI testing.",
    longDescription:
      "Fixture only. Worksheet content and access rules will come from the LMS product catalogue.",
    categories: ["exam-prep"],
    formatLabel: "Interactive / PDF (LMS)",
    pricingLabel: "Set in LMS — not final",
    enrollmentCtaLabel: "View on LMS",
    lmsEnrollmentUrl: "https://aark-academy.learn360lms.com/",
    resourceType: "worksheets",
    isFixture: true,
  },
];

export function getAllCatalogProducts() {
  return [...FIXTURE_COURSES, ...FIXTURE_RESOURCES];
}

export function getProductBySlug(slug: string) {
  return getAllCatalogProducts().find((p) => p.slug === slug) ?? null;
}
