"use client";

type Drawn = { drawn: boolean };

const stroke = {
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  pathLength: 1,
};

export function CampusPins({ drawn }: Drawn) {
  const pins = [0, 1, 2, 3, 4].map((i) => {
    const x = 16 + i * 32;
    const lift = Math.sin((i / 4) * Math.PI) * 10;
    return { x, y: 30 - lift };
  });
  return (
    <svg viewBox="0 0 160 72" className={`stats-visual${drawn ? " is-drawn" : ""}`} aria-hidden>
      {pins.map((pin, i) => (
        <g key={pin.x} transform={`translate(${pin.x - 8} ${pin.y - 4})`}>
          <path
            d="M8 2.5 C4 2.5 1.5 5.4 1.5 9.2 C1.5 13.6 8 22 8 22 C8 22 14.5 13.6 14.5 9.2 C14.5 5.4 12 2.5 8 2.5 Z"
            stroke={i % 2 === 0 ? "var(--widget-blue)" : "var(--widget-emerald)"}
            fill={
              i % 2 === 0
                ? "color-mix(in srgb, var(--widget-blue) 14%, transparent)"
                : "color-mix(in srgb, var(--widget-emerald) 14%, transparent)"
            }
            {...stroke}
          />
          <circle
            cx="8"
            cy="9"
            r="2.1"
            stroke={i % 2 === 0 ? "var(--widget-emerald)" : "var(--widget-blue)"}
            fill="none"
            strokeWidth="1.5"
            pathLength={1}
          />
        </g>
      ))}
    </svg>
  );
}

export function CompanionSpines({ drawn }: Drawn) {
  return (
    <svg viewBox="0 0 160 72" className={`stats-visual${drawn ? " is-drawn" : ""}`} aria-hidden>
      {Array.from({ length: 13 }, (_, i) => {
        const h = 34 + ((i * 5) % 6) * 4;
        const x = 2 + i * 12;
        const y = 66 - h;
        const blue = i % 2 === 0;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width="8"
            height={h}
            rx="1.2"
            stroke={blue ? "var(--widget-blue)" : "var(--widget-emerald)"}
            fill={
              blue
                ? "color-mix(in srgb, var(--widget-blue) 14%, transparent)"
                : "color-mix(in srgb, var(--widget-emerald) 14%, transparent)"
            }
            strokeWidth="1.5"
            pathLength={1}
          />
        );
      })}
    </svg>
  );
}

export function SyllabusNodes({ drawn }: Drawn) {
  const cx = 36;
  const cy = 36;
  const r = 26;
  const nodes = Array.from({ length: 9 }, (_, i) => {
    const a = -Math.PI / 2 + (i / 9) * Math.PI * 2;
    return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r, i };
  });
  return (
    <svg viewBox="0 0 160 72" className={`stats-visual${drawn ? " is-drawn" : ""}`} aria-hidden>
      {nodes.map((node) => (
        <line
          key={`l-${node.i}`}
          x1={cx}
          y1={cy}
          x2={node.x}
          y2={node.y}
          stroke={node.i % 2 === 0 ? "var(--widget-blue)" : "var(--widget-emerald)"}
          strokeWidth="1.5"
          pathLength={1}
        />
      ))}
      <circle
        cx={cx}
        cy={cy}
        r="3.2"
        stroke="var(--widget-emerald)"
        fill="color-mix(in srgb, var(--widget-emerald) 18%, transparent)"
        strokeWidth="1.5"
        pathLength={1}
      />
      {nodes.map((node) => (
        <circle
          key={`n-${node.i}`}
          cx={node.x}
          cy={node.y}
          r="3.2"
          stroke={node.i % 2 === 0 ? "var(--widget-blue)" : "var(--widget-emerald)"}
          fill={
            node.i % 2 === 0
              ? "color-mix(in srgb, var(--widget-blue) 16%, transparent)"
              : "color-mix(in srgb, var(--widget-emerald) 16%, transparent)"
          }
          strokeWidth="1.5"
          pathLength={1}
        />
      ))}
    </svg>
  );
}
