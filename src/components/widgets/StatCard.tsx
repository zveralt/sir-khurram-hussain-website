"use client";

import type { ReactNode } from "react";
import { useCountUp } from "@/hooks/useCountUp";
import { useWidgetInView } from "@/hooks/useWidgetInView";
import { GlassCard } from "@/components/widgets/GlassCard";
import {
  ClockTicks,
  PinRow,
  SquareGrid,
  StepBars,
  type StatVisual,
} from "@/components/widgets/stat-mini-visuals";

/**
 * Glass stat card with optional mini visual and count-up value.
 * Props: `value` (number), `title`, `subtext`, `visual`, visual-specific counts.
 */
export function StatCard({
  value,
  title,
  subtext,
  visual = "clock",
  visualFilled,
  visualTotal,
  visualActive,
  suffix,
}: {
  value: number;
  title: string;
  subtext?: ReactNode;
  visual?: StatVisual;
  visualFilled?: number;
  visualTotal?: number;
  visualActive?: number;
  suffix?: string;
}) {
  const { ref, inView } = useWidgetInView();
  const display = useCountUp(value, inView);

  const mini = (() => {
    switch (visual) {
      case "pins":
        return <PinRow count={visualTotal ?? 5} />;
      case "grid":
        if (visualTotal == null || visualFilled == null) return null;
        return <SquareGrid filled={visualFilled} total={visualTotal} />;
      case "steps":
        return <StepBars steps={visualTotal ?? 4} active={visualActive ?? 2} />;
      default:
        return <ClockTicks active={visualActive ?? 12} />;
    }
  })();

  return (
    <div ref={ref}>
    <GlassCard className="flex flex-col gap-4 h-full">
      <div className="flex items-start justify-between gap-3">
        <div aria-hidden>{mini}</div>
      </div>
      <p className="font-display text-4xl font-semibold tabular-nums text-fg">
        {display}
        {suffix ? <span className="text-2xl text-muted">{suffix}</span> : null}
      </p>
      <div>
        <p className="font-medium text-fg">{title}</p>
        {subtext ? <p className="mt-1 text-sm text-muted leading-relaxed">{subtext}</p> : null}
      </div>
    </GlassCard>
    </div>
  );
}
