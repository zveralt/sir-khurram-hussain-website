/**
 * Seat availability micro-grid. Renders only when `total` > 0 and counts are valid.
 * Props: `filled`, `total`, optional `leftLabel` override.
 */
export function SeatGrid({
  filled,
  total,
  leftLabel,
}: {
  filled: number;
  total: number;
  leftLabel?: string;
}) {
  if (total <= 0 || filled < 0 || filled > total) return null;
  const left = total - filled;
  const label = leftLabel ?? `${left} left`;

  return (
    <div className="inline-flex flex-col gap-2" aria-label={`${left} of ${total} seats available`}>
      <div className="flex flex-wrap gap-1" role="presentation">
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className="h-2.5 w-2.5 rounded-sm border border-[color-mix(in_srgb,var(--widget-stroke)_50%,transparent)]"
            style={{
              background: i < filled ? "var(--widget-blue)" : "transparent",
              opacity: i < filled ? 0.85 : 0.35,
            }}
          />
        ))}
      </div>
      <span className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">{label}</span>
    </div>
  );
}
