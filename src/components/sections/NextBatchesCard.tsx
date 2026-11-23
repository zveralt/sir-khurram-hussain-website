"use client";

import { GlassCard, ProgressRing, SeatGrid } from "@/components/widgets";
import { siteConfig } from "@/lib/site-config";

const STORAGE_KEY = "enquiry-batch";

/**
 * Featured batch card for the registration area — only render when `siteConfig.batches` has entries.
 */
export function NextBatchesCard() {
  const batches = siteConfig.batches;
  if (!batches?.length) return null;

  const featured = batches.find((b) => b.featured) ?? batches[0];
  const others = batches.filter((b) => b.id !== featured.id);

  function reserve(batchId: string, label: string) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ id: batchId, label }));
    } catch {
      /* ignore */
    }
    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
    window.dispatchEvent(new CustomEvent("enquiry-batch-selected", { detail: { id: batchId, label } }));
  }

  const fillPct =
    featured.seatsTotal > 0 ? Math.round((featured.seatsFilled / featured.seatsTotal) * 100) : 0;

  return (
    <GlassCard className="next-batches">
      <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">Next batches</p>
      <h3 className="mt-2 font-display text-xl font-semibold text-fg">{featured.label}</h3>
      <p className="mt-1 text-sm text-muted">{featured.schedule}</p>
      <div className="mt-4 flex flex-wrap items-center gap-6">
        <SeatGrid filled={featured.seatsFilled} total={featured.seatsTotal} />
        <ProgressRing value={fillPct} label={`${fillPct}% filled`} size={72} strokeWidth={5} />
      </div>
      <button type="button" className="btn btn-primary mt-4 w-full sm:w-auto" onClick={() => reserve(featured.id, featured.label)}>
        Reserve my seat <span className="arrow">→</span>
      </button>

      {others.length ? (
        <div className="next-batches__list mt-6 pt-4 border-t border-line">
          {others.map((b) => {
            const pct = b.seatsTotal > 0 ? Math.round((b.seatsFilled / b.seatsTotal) * 100) : 0;
            return (
              <div key={b.id} className="next-batches__row">
                <div>
                  <p className="font-medium text-fg">{b.label}</p>
                  <p className="text-sm text-muted">{b.schedule}</p>
                </div>
                <ProgressRing value={pct} size={56} strokeWidth={4} showValue={false} />
              </div>
            );
          })}
        </div>
      ) : null}
    </GlassCard>
  );
}

export const ENQUIRY_BATCH_STORAGE_KEY = STORAGE_KEY;
