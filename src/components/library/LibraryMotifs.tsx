/** Shared 8-point star (two overlapping squares) for all library covers. */
export function LibraryMotifs() {
  return (
    <svg className="library-premium__motifs-defs" aria-hidden>
      <defs>
        <symbol id="library-motif-star" viewBox="0 0 120 120">
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <g transform="translate(60, 60)">
              <rect x="-30" y="-30" width="60" height="60" />
              <rect x="-30" y="-30" width="60" height="60" transform="rotate(45)" />
            </g>
          </g>
        </symbol>
      </defs>
    </svg>
  );
}

export type LibraryCategoryKey = "quran" | "seerah" | "hadith" | "history" | "faith" | "exam";

export const LIBRARY_CATEGORY_KEY: Record<
  import("@/lib/library").LibraryTitle["series"],
  LibraryCategoryKey
> = {
  "Qur'an": "quran",
  Seerah: "seerah",
  Hadith: "hadith",
  History: "history",
  "Faith & Practice": "faith",
  Examination: "exam",
};

export const LIBRARY_MOTIF_HREF = "#library-motif-star";
