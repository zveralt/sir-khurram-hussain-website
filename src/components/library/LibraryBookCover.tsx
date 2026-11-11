"use client";

import { ArrowUpRight } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import type { LibraryTitle } from "@/lib/library";
import { SKH_BOOKS_URL } from "@/lib/library";
import { LIBRARY_CATEGORY_KEY, motifIdForCategory } from "@/components/library/LibraryMotifs";

type Props = {
  title: LibraryTitle["title"];
  series: LibraryTitle["series"];
  no: LibraryTitle["no"];
  reduceMotion: boolean;
};

export function LibraryBookCover({ title, series, no, reduceMotion }: Props) {
  const cat = LIBRARY_CATEGORY_KEY[series];
  const tiltRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [pointerFine, setPointerFine] = useState(false);

  const handlePointerEnter = useCallback(() => {
    if (typeof window !== "undefined") {
      setPointerFine(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
    }
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduceMotion || !pointerFine) return;
      const el = tiltRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: py * -6, y: px * 6 });
    },
    [pointerFine, reduceMotion],
  );

  const resetTilt = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  const ariaLabel = `Open ${title} on SKH books and notes (opens in a new tab)`;

  return (
    <a
      href={SKH_BOOKS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="library-premium__cover-link"
      aria-label={ariaLabel}
    >
      <div
        className="library-premium__cover"
        data-category={cat}
        style={{ ["--cover-cat" as string]: `var(--cat-${cat})` }}
      >
        <div
          ref={tiltRef}
          className="library-premium__cover-body"
          style={
            reduceMotion
              ? undefined
              : {
                  ["--tilt-x" as string]: `${tilt.x}deg`,
                  ["--tilt-y" as string]: `${tilt.y}deg`,
                }
          }
          onPointerEnter={handlePointerEnter}
          onPointerMove={handlePointerMove}
          onPointerLeave={resetTilt}
        >
          <div className="library-premium__cover-spine" aria-hidden />
          <div className="library-premium__cover-sheen" aria-hidden />
          <div className="library-premium__cover-noise" aria-hidden />
          <svg className="library-premium__cover-motif" aria-hidden>
            <use href={motifIdForCategory(cat)} />
          </svg>

          <span className="library-premium__cover-category">
            <span className="library-premium__cover-category-dot" aria-hidden />
            {series}
          </span>
          <span className="library-premium__cover-index font-mono">{String(no).padStart(2, "0")}</span>

          <div className="library-premium__cover-title-block">
            <span className="library-premium__cover-title-rule" aria-hidden />
            <p className="library-premium__cover-title font-display">{title}</p>
          </div>

          <div className="library-premium__cover-foot">
            <span className="library-premium__cover-foot-rule" aria-hidden />
            <span className="library-premium__cover-foot-mark font-mono">KH / 2058</span>
          </div>

          <ArrowUpRight className="library-premium__cover-external" strokeWidth={1.75} aria-hidden />
        </div>
      </div>
    </a>
  );
}
