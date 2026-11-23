/**
 * Optional extended copy per companion — keyed by SKH index number.
 * TODO(client): Add `description` strings when you want them in the study-hub drawer.
 */
export type CompanionMeta = {
  description?: string | null;
};

export const COMPANION_META: Record<number, CompanionMeta> = {};

export function getCompanionDescription(no: number): string | null {
  const d = COMPANION_META[no]?.description;
  return typeof d === "string" && d.trim() ? d.trim() : null;
}
