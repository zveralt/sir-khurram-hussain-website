import { siteConfig } from "@/lib/site-config";

/** Public bio copy — aligned with the about page and educator section (no new claims). */
export const TEACHER_BIO = [
  `Sir Khurram Hussain is publicly associated with SKH Solutions, a Karachi O and A Level coaching network that emphasises Cambridge syllabus coverage, weekly written practice, and multi-campus access. SKH’s faculty listing places him under Islamiyat, with long-form classroom experience.`,
  `Academic Studio extends that work online without replacing campus admissions. We publish only what can be sourced on the about page and SKH’s public materials.`,
] as const;

export const TIMES_OF_YOUTH_QUOTE =
  "To me, education is not just about studying and exams. Education is an art; the art of learning, the art of implementing, the art of understanding.";

export const TIMES_OF_YOUTH_URL =
  "https://timesofyouth.com/exclusive-interview-of-khurram-hussain/";

/** Default in-class sequence (from the home approach pillars). Durations come from site-config when set. */
export const DEFAULT_CLASS_STEPS = [
  {
    id: "concept",
    title: "Concept first",
    body: "Students meet the idea — revelation, community, belief, practice — before they meet examination wording.",
  },
  {
    id: "sources",
    title: "Source analysis",
    body: "Passages, ahadith, and historical episodes are read for meaning and context, not harvested as quotations.",
  },
  {
    id: "writing",
    title: "Structured writing",
    body: "Answers are built: relevant knowledge, evidence, explanation, then a coherent close.",
  },
] as const;

export function teacherDisplayName() {
  return siteConfig.teacher.name;
}

export function teacherNameParts() {
  const parts = siteConfig.teacher.name.trim().split(/\s+/);
  if (parts.length < 2) return { leading: siteConfig.teacher.name, emphasis: "" };
  const emphasis = parts.pop()!;
  return { leading: parts.join(" "), emphasis };
}

export const ORBIT_TEACHER_LABEL =
  "SIR KHURRAM HUSSAIN · O LEVEL ISLAMIYAT · KARACHI & ONLINE";
