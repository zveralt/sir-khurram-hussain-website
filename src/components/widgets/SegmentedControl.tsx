"use client";

import { useCallback, useId, useLayoutEffect, useRef, useState } from "react";

export type SegmentedOption<T extends string> = { value: T; label: string };

/**
 * Accessible single-select control with sliding pill indicator.
 * Props: `options`, `value`, `onChange`, `ariaLabel`.
 */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (v: T) => void;
  ariaLabel: string;
}) {
  const groupId = useId();
  const btnRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [indicator, setIndicator] = useState({ width: 0, left: 0 });

  const positionIndicator = useCallback(() => {
    const idx = options.findIndex((o) => o.value === value);
    const btn = btnRefs.current[idx];
    const parent = btn?.parentElement;
    if (!btn || !parent) return;
    const parentRect = parent.getBoundingClientRect();
    const rect = btn.getBoundingClientRect();
    setIndicator({ width: rect.width, left: rect.left - parentRect.left });
  }, [options, value]);

  useLayoutEffect(() => {
    positionIndicator();
    window.addEventListener("resize", positionIndicator);
    return () => window.removeEventListener("resize", positionIndicator);
  }, [positionIndicator]);

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className="widget-segmented"
      id={groupId}
    >
      <span
        className="widget-segmented__indicator"
        aria-hidden
        style={{ width: indicator.width, transform: `translateX(${indicator.left}px)` }}
      />
      {options.map((opt, i) => (
        <button
          key={opt.value}
          type="button"
          role="radio"
          ref={(el) => {
            btnRefs.current[i] = el;
          }}
          aria-checked={value === opt.value}
          className="widget-segmented__btn"
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
