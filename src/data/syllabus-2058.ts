/**
 * Official Cambridge 2058 sub-topics keyed by syllabus node id.
 * TODO(client): Populate from the current Cambridge syllabus document.
 * Until then, the UI falls back to companion book titles from `SYLLABUS_NODES`.
 */
export const SYLLABUS_2058_SUBTOPICS: Partial<Record<string, string[]>> | null = null;

export function subtopicChipsForNode(nodeId: string, companionFallback: string[]): string[] {
  const fromSyllabus = SYLLABUS_2058_SUBTOPICS?.[nodeId];
  if (fromSyllabus?.length) return fromSyllabus;
  return companionFallback;
}
