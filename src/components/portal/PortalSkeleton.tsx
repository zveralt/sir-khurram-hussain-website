export function PortalSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="portal-skeleton" aria-hidden>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="portal-skeleton__row" style={{ ["--row-delay" as string]: `${i * 80}ms` }} />
      ))}
      <span className="sr-only">Loading</span>
    </div>
  );
}
