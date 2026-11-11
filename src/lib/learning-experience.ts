export type LearningExperienceTile = {
  title: string;
  description: string;
  href: string;
  external?: boolean;
  icon: "lectures" | "courses" | "notes" | "worksheets" | "syllabus" | "resources";
  featured?: boolean;
};

export const LEARNING_EXPERIENCE_TILES: LearningExperienceTile[] = [
  {
    title: "Online lectures",
    description: "Structured video is delivered through Aark Academy Learn360 once programmes are live — not streamed here.",
    href: "/store",
    icon: "lectures",
  },
  {
    title: "Islamiyat pathways",
    description: "How digital, campus, syllabus, and resource routes fit together — with clear next steps.",
    href: "/store",
    icon: "courses",
    featured: true,
  },
  {
    title: "Notes & study materials",
    description: "SKH’s published companions and the public books-and-notes index.",
    href: "/resources",
    icon: "notes",
  },
  {
    title: "Written practice",
    description: "SKH emphasises regular composition and timed work — digital practice follows the LMS timetable when connected.",
    href: "/philosophy",
    icon: "worksheets",
  },
  {
    title: "Syllabus maps",
    description: "Interactive orientation across nine published fields — not a Cambridge reprint.",
    href: "/syllabus-map",
    icon: "syllabus",
  },
  {
    title: "Learner access",
    description: "Sign in on Aark Academy for live programmes · portal route here explains status when integration is pending.",
    href: "/portal/login",
    icon: "resources",
  },
];
