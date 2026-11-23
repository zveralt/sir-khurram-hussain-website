/** Decorative background grid, glow, and edge fades for premium sections. */
export function SectionScene({ emerald = false }: { emerald?: boolean }) {
  return (
    <div className="section-premium__scene" aria-hidden>
      <div className="section-premium__grid" />
      <div className="section-premium__glow section-premium__glow--blue" />
      {emerald ? <div className="section-premium__glow section-premium__glow--emerald" /> : null}
      <div className="section-premium__fade section-premium__fade--top" />
      <div className="section-premium__fade section-premium__fade--bottom" />
    </div>
  );
}
