import type { ReactNode } from "react";

const frame = "method-illustration";

function Frame({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 64 64" className={frame} aria-hidden>
      {children}
    </svg>
  );
}

export function IdeaLinkIllustration() {
  return (
    <Frame>
      <circle cx="16" cy="32" r="8" stroke="var(--widget-blue)" strokeWidth="1.5" fill="color-mix(in srgb, var(--widget-blue) 12%, transparent)" />
      <circle cx="48" cy="32" r="8" stroke="var(--widget-emerald)" strokeWidth="1.5" fill="color-mix(in srgb, var(--widget-emerald) 12%, transparent)" />
      <path d="M24 32 H40" stroke="var(--widget-blue)" strokeWidth="1.5" strokeLinecap="round" />
    </Frame>
  );
}

export function SourceBookIllustration() {
  return (
    <Frame>
      <path
        d="M32 16 C26 13 16 13 10 17 V48 C18 44 26 45 32 49"
        stroke="var(--widget-blue)"
        strokeWidth="1.5"
        fill="color-mix(in srgb, var(--widget-blue) 10%, transparent)"
        strokeLinejoin="round"
      />
      <path
        d="M32 16 C38 13 48 13 54 17 V48 C46 44 38 45 32 49"
        stroke="var(--widget-emerald)"
        strokeWidth="1.5"
        fill="color-mix(in srgb, var(--widget-emerald) 10%, transparent)"
        strokeLinejoin="round"
      />
      <path d="M16 26 H26 M16 32 H24 M16 38 H22" stroke="var(--widget-blue)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M38 26 H48 M40 32 H48 M42 38 H48" stroke="var(--widget-emerald)" strokeWidth="1.5" strokeLinecap="round" />
    </Frame>
  );
}

export function AnswerScaffoldIllustration() {
  const bars = [44, 34, 26, 18];
  return (
    <Frame>
      {bars.map((width, i) => (
        <rect
          key={width}
          x="10"
          y={12 + i * 12}
          width={width}
          height="6"
          rx="1.5"
          stroke={i % 2 === 0 ? "var(--widget-blue)" : "var(--widget-emerald)"}
          strokeWidth="1.5"
          fill={
            i % 2 === 0
              ? "color-mix(in srgb, var(--widget-blue) 12%, transparent)"
              : "color-mix(in srgb, var(--widget-emerald) 12%, transparent)"
          }
        />
      ))}
    </Frame>
  );
}

export function TimerRingIllustration() {
  return (
    <Frame>
      <circle cx="32" cy="32" r="18" stroke="var(--widget-stroke)" strokeWidth="1.5" fill="none" />
      <circle
        cx="32"
        cy="32"
        r="18"
        stroke="var(--widget-emerald)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="84 40"
        transform="rotate(-90 32 32)"
      />
      <path d="M32 22 V32 L39 36" stroke="var(--widget-blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  );
}

export function MethodIllustration({ kind }: { kind: "idea-link" | "source" | "scaffold" | "timer" }) {
  if (kind === "timer") return <TimerRingIllustration />;
  if (kind === "source") return <SourceBookIllustration />;
  if (kind === "scaffold") return <AnswerScaffoldIllustration />;
  return <IdeaLinkIllustration />;
}
