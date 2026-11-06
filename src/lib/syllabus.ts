import { SKH_BOOKS_URL } from "@/lib/library";

/**
 * Topic map aligned to SKH’s published books-and-notes index
 * (https://www.skh.com.pk/booksnotes/), which tracks Cambridge O Level Islamiyat (2058) teaching areas.
 * Copy here is orientation only — not a substitute for the official Cambridge specification.
 */
export type SyllabusNode = {
  id: string;
  n: string;
  title: string;
  paper: "1" | "2";
  intro: string;
  companions: string[];
  x: number;
  y: number;
};

export const SYLLABUS_NOTE =
  "Labels follow SKH’s published study-companion index. Lesson lists, mark schemes, and live resource files are not invented here.";

export const SYLLABUS_NODES: SyllabusNode[] = [
  {
    id: "quranic-passages",
    n: "01",
    title: "Qur’anic passages",
    paper: "1",
    intro:
      "Close reading of set passages and their themes — language, context, and how meaning is carried into answers.",
    companions: ["The Qur'anic Passages"],
    x: 18,
    y: 22,
  },
  {
    id: "quran-history",
    n: "02",
    title: "History & importance of the Qur’an",
    paper: "1",
    intro:
      "How the Qur’an was revealed, compiled, and why that history matters for Muslim belief and examination writing.",
    companions: ["The History & Importance of Qur'an"],
    x: 42,
    y: 14,
  },
  {
    id: "seerah",
    n: "03",
    title: "Biography of the Prophet (PBUH)",
    paper: "1",
    intro:
      "Seerah as narrative and as evidence — Makkah and Madinah periods taught toward Cambridge assessment objectives.",
    companions: [
      "The Biography of Muhammad (PBUH) — Life in Makkah",
      "The Biography of Muhammad (PBUH)",
    ],
    x: 68,
    y: 22,
  },
  {
    id: "first-community",
    n: "04",
    title: "The first Muslim community",
    paper: "1",
    intro:
      "The early community’s formation, relationships, and the themes students are asked to explain rather than list.",
    companions: ["The First Muslim Community"],
    x: 86,
    y: 38,
  },
  {
    id: "hadith",
    n: "05",
    title: "Hadith",
    paper: "2",
    intro:
      "Selected ahadith: what they teach, how they are used as evidence, and how answers stay faithful to the text.",
    companions: ["The Ahadith of Prophet Muhammad (PBUH)"],
    x: 22,
    y: 62,
  },
  {
    id: "hadith-history",
    n: "06",
    title: "History & importance of Hadith",
    paper: "2",
    intro:
      "Collection, authentication, and why Hadith sits beside the Qur’an in Islamiyat study — not as a shortcut to quotes.",
    companions: ["The History & Importance of Hadith"],
    x: 48,
    y: 72,
  },
  {
    id: "caliphs",
    n: "07",
    title: "The Rightly Guided Caliphs",
    paper: "2",
    intro:
      "The four caliphs as historical period and as examination themes: leadership, community, and continuity after the Prophet.",
    companions: ["The Rightly Guided Caliphs"],
    x: 74,
    y: 64,
  },
  {
    id: "articles",
    n: "08",
    title: "Articles of Faith",
    paper: "2",
    intro:
      "Belief as a structured field of study — including how SKH’s companion treats articles of faith and modes of jihad.",
    companions: ["The Articles of Faith & the Modes of Jihad"],
    x: 38,
    y: 88,
  },
  {
    id: "pillars",
    n: "09",
    title: "Pillars of Islam",
    paper: "2",
    intro:
      "Practice and meaning together: pillars as lived worship and as answers that must show understanding, not only sequence.",
    companions: ["The Five Pillars of Islam"],
    x: 64,
    y: 88,
  },
];

export const SYLLABUS_EDGES: [string, string][] = [
  ["quranic-passages", "quran-history"],
  ["quran-history", "seerah"],
  ["seerah", "first-community"],
  ["quranic-passages", "hadith"],
  ["hadith", "hadith-history"],
  ["hadith-history", "caliphs"],
  ["caliphs", "articles"],
  ["articles", "pillars"],
  ["seerah", "caliphs"],
];

export { SKH_BOOKS_URL };
