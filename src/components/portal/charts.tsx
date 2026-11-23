"use client";

type SparklineProps = {
  values: number[];
  max?: number;
  className?: string;
  "aria-label"?: string;
};

export function TestSparkline({ values, max, className, "aria-label": ariaLabel }: SparklineProps) {
  if (!values.length) {
    return <p className="text-sm text-muted">No scores yet.</p>;
  }
  const top = max ?? Math.max(...values, 1);
  const w = 160;
  const h = 48;
  const pad = 4;
  const step = values.length > 1 ? (w - pad * 2) / (values.length - 1) : 0;
  const points = values
    .map((v, i) => {
      const x = pad + i * step;
      const y = h - pad - (v / top) * (h - pad * 2);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={className ?? "h-12 w-40 text-[var(--widget-emerald)]"}
      role="img"
      aria-label={ariaLabel ?? "Recent test scores trend"}
    >
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

type BarChartProps = {
  labels: string[];
  values: number[];
  max?: number;
};

export function WeeklyMarksChart({ labels, values, max }: BarChartProps) {
  const top = max ?? Math.max(...values, 1);
  const w = 280;
  const h = 120;
  const barW = w / values.length - 8;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[280px] h-auto" role="img" aria-label="Weekly test marks">
      {values.map((v, i) => {
        const barH = (v / top) * (h - 24);
        const x = 8 + i * (barW + 8);
        const y = h - 16 - barH;
        return (
          <g key={labels[i]}>
            <rect
              x={x}
              y={y}
              width={barW}
              height={barH}
              rx={4}
              fill="color-mix(in srgb, var(--widget-blue) 55%, transparent)"
            />
            <text x={x + barW / 2} y={h - 4} textAnchor="middle" className="fill-[var(--muted)]" fontSize="9">
              {labels[i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
