/**
 * Past paper metadata — client-supplied only.
 * TODO(client): Add entries with URLs only where you have hosting rights.
 * Otherwise leave `questionPaperUrl` / `markSchemeUrl` null and rely on `officialListingUrl`.
 */

export type ExamSession = "may-june" | "oct-nov";

export type PaperLevel = {
  id: string;
  label: string;
};

export type PastPaper = {
  id: string;
  levelId: string;
  /** Syllabus field id from `SYLLABUS_NODES` — used for “By topic” grouping when set. */
  topicId?: string | null;
  year: number;
  session: ExamSession;
  paperCode: string;
  title?: string;
  durationMinutes?: number | null;
  marks?: number | null;
  /** Client-hosted file — only if rights allow */
  questionPaperUrl?: string | null;
  markSchemeUrl?: string | null;
  officialListingUrl: string;
};

export const CAMBRIDGE_PAST_PAPERS_OFFICIAL =
  "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-o-level-islamiyat-2058/past-papers/";

export const PAPER_LEVELS: PaperLevel[] = [
  { id: "2058", label: "O Level Islamiyat (2058)" },
];

/** Empty until the client supplies licensed or official links per paper. */
export const PAST_PAPERS: PastPaper[] = [];

export function hasPastPaperCatalog(): boolean {
  return PAST_PAPERS.length > 0;
}
