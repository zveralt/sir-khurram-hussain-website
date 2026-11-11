/** Decorative pathway sample beside the syllabus spotlight — not live student progress. */
export const SYLLABUS_PATHWAY_SAMPLE = [
  {
    n: "01",
    title: "Start with a question",
    detail: "Name what you are being asked before you reach for an answer.",
    status: "done" as const,
  },
  {
    n: "02",
    title: "Build the idea",
    detail: "Connect Qur’anic, seerah, hadith, or history to a clear mental model.",
    status: "focus" as const,
  },
  {
    n: "03",
    title: "Practise the thinking",
    detail: "Write in sequence: point, evidence, explanation — under time when you can.",
    status: "next" as const,
  },
  {
    n: "04",
    title: "Reflect and revisit",
    detail: "Return to the source for what stayed unclear after marking or discussion.",
    status: "next" as const,
  },
] as const;
