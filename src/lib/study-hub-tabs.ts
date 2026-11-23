import { hasLectureCatalog } from "@/data/lectures";
import { hasPastPaperCatalog } from "@/data/papers";

export type StudyHubTabId = "books" | "lectures" | "papers";

export const STUDY_HUB_TAB_ORDER: StudyHubTabId[] = ["books", "lectures", "papers"];

const LABELS: Record<StudyHubTabId, string> = {
  books: "Books and notes",
  lectures: "Recorded lectures",
  papers: "Past papers",
};

export function visibleStudyHubTabs(): { id: StudyHubTabId; label: string }[] {
  const out: { id: StudyHubTabId; label: string }[] = [
    { id: "books", label: LABELS.books },
  ];
  if (hasLectureCatalog()) {
    out.push({ id: "lectures", label: LABELS.lectures });
  }
  if (hasPastPaperCatalog()) {
    out.push({ id: "papers", label: LABELS.papers });
  }
  return out;
}

export function defaultStudyHubTab(): StudyHubTabId {
  return "books";
}
