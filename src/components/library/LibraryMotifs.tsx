/** Shared SVG motif symbols for library covers — one <use> per category. */
export function LibraryMotifs() {
  return (
    <svg className="library-premium__motifs-defs" aria-hidden>
      <defs>
        <symbol id="library-motif-quran" viewBox="0 0 120 120">
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <polygon points="60,12 70,36 96,36 75,52 84,76 60,60 36,76 45,52 24,36 50,36" />
            <polygon points="60,28 66,44 82,44 69,54 75,70 60,60 45,70 51,54 38,44 54,44" opacity="0.65" />
          </g>
        </symbol>
        <symbol id="library-motif-seerah" viewBox="0 0 120 120">
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M78 62a26 26 0 0 0-52 0" />
            <path d="M78 62a18 18 0 0 0-36 0" opacity="0.7" />
            <circle cx="82" cy="58" r="12" />
            <circle cx="82" cy="58" r="7" opacity="0.55" />
          </g>
        </symbol>
        <symbol id="library-motif-hadith" viewBox="0 0 120 120">
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M38 34h44v52H38z" />
            <path d="M48 34V28h24v6M60 34v52" opacity="0.7" />
            <circle cx="60" cy="60" r="14" />
            <polygon
              points="60,52 64,58 71,58 66,63 68,70 60,66 52,70 54,63 49,58 56,58"
              opacity="0.6"
            />
          </g>
        </symbol>
        <symbol id="library-motif-history" viewBox="0 0 120 120">
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M32 88V44h12v16h16V36h16v24h16V52h12v36" />
            <path d="M44 60h16M76 76h16" opacity="0.55" />
          </g>
        </symbol>
        <symbol id="library-motif-faith" viewBox="0 0 120 120">
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="52" cy="58" r="18" />
            <circle cx="76" cy="58" r="18" />
            <circle cx="64" cy="72" r="18" opacity="0.75" />
          </g>
        </symbol>
        <symbol id="library-motif-exam" viewBox="0 0 120 120">
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="60" cy="60" r="32" />
            <circle cx="60" cy="60" r="22" opacity="0.75" />
            <circle cx="60" cy="60" r="12" opacity="0.5" />
            <circle cx="60" cy="60" r="3" fill="currentColor" stroke="none" opacity="0.4" />
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

export function motifIdForCategory(key: LibraryCategoryKey): string {
  return `#library-motif-${key}`;
}
