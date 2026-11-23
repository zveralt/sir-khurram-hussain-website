"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useMemo } from "react";
import { useWidgetInView } from "@/hooks/useWidgetInView";

export type OrbitChip = {
  label: string;
  href?: string;
};

/**
 * Monogram or portrait with orbiting label, ring dots, and floating glass chips.
 * Props: `variant` photo|monogram, `initials`, `orbitText`, `chips`, `photoSrc`, `photoAlt`, `size`.
 */
export function OrbitBadge({
  initials,
  orbitText,
  chips = [],
  variant = "monogram",
  photoSrc,
  photoAlt,
  size = "lg",
}: {
  initials: string;
  orbitText: string;
  chips?: OrbitChip[];
  variant?: "monogram" | "photo";
  photoSrc?: string;
  photoAlt?: string;
  size?: "md" | "lg";
}) {
  const { ref, inView, reducedMotion } = useWidgetInView();
  const pathId = useId().replace(/:/g, "");
  const boxClass = size === "lg" ? "widget-orbit-badge--lg" : "widget-orbit-badge--md";
  const showPhoto = variant === "photo" && photoSrc;

  const chipOffsets = useMemo(
    () =>
      chips.slice(0, 3).map((c, i) => ({
        ...c,
        x: [-54, 48, -4][i] ?? 0,
        y: [-44, 36, 52][i] ?? 0,
      })),
    [chips],
  );

  return (
    <div ref={ref} className={`widget-orbit-badge relative mx-auto ${boxClass}`} aria-label={orbitText}>
      {chipOffsets.map((c, i) => {
        const chipClass =
          "widget-glass-card absolute z-20 px-2.5 py-1.5 text-[0.62rem] font-mono uppercase tracking-[0.12em] text-muted";
        const style = {
          left: `calc(50% + ${c.x}px)`,
          top: `calc(50% + ${c.y}px)`,
          animation: reducedMotion
            ? undefined
            : `${i % 2 ? "widget-chip-drift-b" : "widget-chip-drift-a"} ${16 + i * 2}s ease-in-out infinite`,
          animationPlayState: inView ? "running" : "paused",
        } as const;
        if (c.href) {
          return (
            <Link key={c.label} href={c.href} className={`${chipClass} hover:text-fg`} style={style}>
              {c.label}
            </Link>
          );
        }
        return (
          <span key={c.label} className={chipClass} style={style}>
            {c.label}
          </span>
        );
      })}

      <div className="relative h-full w-full">
        <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
          <defs>
            <path id={pathId} d="M 100 24 A 76 76 0 1 1 99.9 24" fill="none" />
          </defs>
          <circle cx="100" cy="100" r="78" fill="none" stroke="var(--widget-stroke)" strokeWidth="0.75" opacity="0.6" />
          {[0, 90, 180, 270].map((deg) => (
            <circle
              key={deg}
              cx={100 + 78 * Math.cos((deg * Math.PI) / 180)}
              cy={100 + 78 * Math.sin((deg * Math.PI) / 180)}
              r="2.2"
              fill="var(--widget-emerald)"
              opacity="0.75"
            />
          ))}
          <g
            className="widget-orbit-badge__orbit"
            style={{
              transformOrigin: "100px 100px",
              animation: reducedMotion ? undefined : "widget-orbit-spin 90s linear infinite",
              animationPlayState: inView ? "running" : "paused",
            }}
          >
            <text fill="var(--muted)" fontSize="6.5" fontFamily="var(--font-ibm-plex-mono), monospace" letterSpacing="0.18em">
              <textPath href={`#${pathId}`} startOffset="0%">
                {orbitText.toUpperCase()} · {orbitText.toUpperCase()}
              </textPath>
            </text>
          </g>
          {!showPhoto ? (
            <>
              <circle
                cx="100"
                cy="100"
                r="50"
                fill="var(--card)"
                stroke="var(--widget-stroke)"
                strokeWidth="1"
              />
              <text
                x="100"
                y="108"
                textAnchor="middle"
                fontFamily="var(--font-bricolage-grotesque), sans-serif"
                fontSize="22"
                fontWeight="600"
                fill="var(--fg)"
              >
                {initials}
              </text>
            </>
          ) : (
            <circle cx="100" cy="100" r="52" fill="none" stroke="var(--widget-stroke)" strokeWidth="1" />
          )}
        </svg>

        {showPhoto ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="relative h-[48%] w-[48%] overflow-hidden rounded-full border border-[color-mix(in_srgb,var(--widget-stroke)_55%,transparent)] shadow-[0_12px_40px_-20px_var(--widget-glow)]">
              <Image
                src={photoSrc}
                alt={photoAlt ?? ""}
                fill
                sizes="(max-width: 768px) 40vw, 240px"
                className="object-cover object-[50%_18%]"
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
