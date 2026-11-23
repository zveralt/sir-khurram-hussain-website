/** Mini visuals for StatCard — geometric only, no figurative art. */

export function ClockTicks({ active = 12 }: { active?: number }) {
  const n = 12;
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10 text-[var(--widget-stroke)]" aria-hidden>
      <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
      {Array.from({ length: n }, (_, i) => {
        const a = (i / n) * Math.PI * 2 - Math.PI / 2;
        const x1 = 24 + Math.cos(a) * 16;
        const y1 = 24 + Math.sin(a) * 16;
        const x2 = 24 + Math.cos(a) * (i < active ? 19 : 17);
        const y2 = 24 + Math.sin(a) * (i < active ? 19 : 17);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={i < active ? "var(--widget-emerald)" : "currentColor"}
            strokeWidth={i % 3 === 0 ? 1.5 : 1}
          />
        );
      })}
    </svg>
  );
}

export function PinRow({ count = 5 }: { count?: number }) {
  return (
    <svg viewBox="0 0 80 24" className="h-8 w-16" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <g key={i} transform={`translate(${6 + i * 14}, 4)`}>
          <path
            d="M6 2 C6 2 6 10 6 14 L6 18 M2 6 L10 6"
            fill="none"
            stroke="var(--widget-blue)"
            strokeWidth="1.2"
            opacity={0.5 + (i / count) * 0.5}
          />
          <circle cx="6" cy="2" r="2" fill="var(--widget-emerald)" opacity={0.4 + (i / count) * 0.6} />
        </g>
      ))}
    </svg>
  );
}

export function SquareGrid({ filled, total }: { filled: number; total: number }) {
  const cols = Math.min(6, total);
  return (
    <div
      className="grid gap-0.5"
      style={{ gridTemplateColumns: `repeat(${cols}, 0.45rem)` }}
      aria-hidden
    >
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className="h-[0.45rem] w-[0.45rem] rounded-[2px]"
          style={{
            background: i < filled ? "var(--widget-emerald)" : "transparent",
            border: "1px solid color-mix(in srgb, var(--widget-stroke) 55%, transparent)",
          }}
        />
      ))}
      <span className="sr-only">{filled} of {total}</span>
    </div>
  );
}

export function StepBars({ steps = 4, active = 2 }: { steps?: number; active?: number }) {
  return (
    <div className="flex items-end gap-1 h-10" aria-hidden>
      {Array.from({ length: steps }, (_, i) => (
        <span
          key={i}
          className="w-2 rounded-sm"
          style={{
            height: `${40 + i * 12}%`,
            background:
              i < active
                ? "linear-gradient(180deg, var(--widget-blue-soft), var(--widget-blue))"
                : "color-mix(in srgb, var(--widget-stroke) 30%, transparent)",
          }}
        />
      ))}
    </div>
  );
}

export type StatVisual = "clock" | "pins" | "grid" | "steps";
