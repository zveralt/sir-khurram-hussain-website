import type { SyllabusNode } from "@/lib/syllabus";

export type SyllabusCategoryKey = "quran" | "seerah" | "history" | "hadith" | "faith" | "all";

export const SYLLABUS_CATEGORY_FILTERS: { key: SyllabusCategoryKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "quran", label: "Qur'an" },
  { key: "seerah", label: "Seerah" },
  { key: "history", label: "History" },
  { key: "hadith", label: "Hadith" },
  { key: "faith", label: "Faith & Practice" },
];

const NODE_CATEGORY: Record<string, Exclude<SyllabusCategoryKey, "all">> = {
  "quranic-passages": "quran",
  "quran-history": "quran",
  seerah: "seerah",
  "first-community": "history",
  hadith: "hadith",
  "hadith-history": "hadith",
  caliphs: "history",
  articles: "faith",
  pillars: "faith",
};

export function categoryForNode(node: SyllabusNode): Exclude<SyllabusCategoryKey, "all"> {
  return NODE_CATEGORY[node.id] ?? "faith";
}

export function categoryLabel(key: Exclude<SyllabusCategoryKey, "all">) {
  return SYLLABUS_CATEGORY_FILTERS.find((c) => c.key === key)?.label ?? key;
}
