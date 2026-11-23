/** Line art course motifs — geometric / open book only. */

export function OpenBookIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 56" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
      <path d="M8 12 C8 8, 14 6, 22 8 L40 14 L58 8 C66 6, 72 8, 72 12 V44 C72 48, 66 50, 58 48 L40 42 L22 48 C14 50, 8 48, 8 44 Z" />
      <path d="M40 14 V42" opacity="0.5" />
      <path d="M16 22 H32 M16 28 H30 M48 22 H64 M48 28 H62" opacity="0.65" />
    </svg>
  );
}

export function MinaretIllustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 72" className={className} fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
      <path d="M32 6 L36 14 H28 Z" />
      <rect x="28" y="14" width="8" height="50" rx="1" />
      <path d="M22 64 H42" />
      <path d="M26 20 H38 M26 28 H38 M26 36 H38" opacity="0.5" />
      <circle cx="32" cy="44" r="3" stroke="var(--widget-emerald)" />
    </svg>
  );
}

export function Star8Illustration({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="1" aria-hidden>
      <g transform="translate(32, 32)">
        <rect x="-18" y="-18" width="36" height="36" />
        <rect x="-18" y="-18" width="36" height="36" transform="rotate(45)" />
      </g>
    </svg>
  );
}

export function CourseIllustration({ kind }: { kind: "open-book" | "minaret" | "star-8" }) {
  const cls = "h-14 w-auto text-[var(--widget-stroke)]";
  if (kind === "minaret") return <MinaretIllustration className={cls} />;
  if (kind === "star-8") return <Star8Illustration className={cls} />;
  return <OpenBookIllustration className={cls} />;
}
