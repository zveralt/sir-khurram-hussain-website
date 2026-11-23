/** Geometric stacked-paper line art — no figurative decoration. */
export function StackedPaperIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 88" className={className} fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden>
      <rect x="8" y="12" width="52" height="64" rx="3" opacity="0.35" />
      <rect x="12" y="8" width="52" height="64" rx="3" opacity="0.55" />
      <rect x="16" y="4" width="52" height="64" rx="3" />
      <path d="M24 22 H60 M24 30 H56 M24 38 H58" opacity="0.6" />
    </svg>
  );
}
