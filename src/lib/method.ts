/** Teaching method steps — same copy as the former approach section (no new claims). */
export const METHOD_STEPS = [
  {
    id: "concept",
    n: "01",
    title: "Concept first",
    body: "Students meet the idea — revelation, community, belief, practice — before they meet examination wording.",
    illustration: "idea-link" as const,
  },
  {
    id: "sources",
    n: "02",
    title: "Source analysis",
    body: "Passages, ahadith, and historical episodes are read for meaning and context, not harvested as quotations.",
    illustration: "source" as const,
  },
  {
    id: "writing",
    n: "03",
    title: "Structured writing",
    body: "Answers are built: relevant knowledge, evidence, explanation, then a coherent close.",
    illustration: "scaffold" as const,
  },
  {
    id: "practice",
    n: "04",
    title: "Examination preparation",
    body: "Timed practice comes after understanding. SKH’s public culture of weekly writing is the intended digital habit too.",
    illustration: "timer" as const,
  },
] as const;
