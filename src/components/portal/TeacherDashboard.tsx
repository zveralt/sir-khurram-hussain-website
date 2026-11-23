"use client";

import { useEffect, useState } from "react";
import { GlassCard } from "@/components/widgets";
import { PortalSkeleton } from "@/components/portal/PortalSkeleton";
import { usePortal } from "@/components/portal/PortalProvider";
import type { PendingRegistration, PortalBatch, RosterStudent } from "@/lib/portal/types";

const UPLOAD_SLOTS = [
  { id: "slot-notes", label: "Week notes (PDF)", kind: "notes" as const },
  { id: "slot-lecture", label: "Lecture link", kind: "lecture-link" as const },
];

export function TeacherDashboard() {
  const { dataSource, refresh, refreshKey } = usePortal();
  const [loading, setLoading] = useState(true);
  const [batches, setBatches] = useState<PortalBatch[]>([]);
  const [batchId, setBatchId] = useState("");
  const [roster, setRoster] = useState<RosterStudent[]>([]);
  const [pending, setPending] = useState<PendingRegistration[]>([]);
  const [uploadHint, setUploadHint] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const b = await dataSource.getBatches();
      if (cancelled) return;
      setBatches(b);
      setBatchId(b[0]?.id ?? "");
      const p = await dataSource.getPendingRegistrations();
      setPending(p);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [dataSource, refreshKey]);

  useEffect(() => {
    if (!batchId) return;
    let cancelled = false;
    void dataSource.getRoster(batchId).then((r) => {
      if (!cancelled) setRoster(r);
    });
    return () => {
      cancelled = true;
    };
  }, [dataSource, batchId, refreshKey]);

  async function approve(id: string) {
    await dataSource.approveRegistration(id);
    refresh();
    const p = await dataSource.getPendingRegistrations();
    setPending(p);
  }

  async function reject(id: string) {
    await dataSource.rejectRegistration(id);
    refresh();
    const p = await dataSource.getPendingRegistrations();
    setPending(p);
  }

  if (loading) return <PortalSkeleton rows={4} />;

  return (
    <div className="portal-teacher">
      <p className="font-mono text-xs uppercase tracking-widest text-muted">Teacher view · demo data</p>
      <h1 className="font-display text-2xl font-semibold text-fg">Studio dashboard</h1>

      <div className="mt-6 flex flex-wrap gap-2">
        {batches.map((b) => (
          <button
            key={b.id}
            type="button"
            className={`rounded-full border px-3 py-1.5 text-xs font-mono uppercase tracking-widest ${
              batchId === b.id ? "border-[var(--widget-emerald)] text-fg" : "border-line text-muted"
            }`}
            onClick={() => setBatchId(b.id)}
          >
            {b.label}
          </button>
        ))}
      </div>

      <GlassCard padding="md" className="portal-card mt-6">
        <h2 className="font-display text-lg font-semibold text-fg">Student roster</h2>
        <ul className="mt-4 space-y-3">
          {roster.map((s) => (
            <li key={s.id}>
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-fg">{s.displayName}</span>
                <span className="font-mono text-muted">{s.progressPercent}%</span>
              </div>
              <div className="portal-progress-bar mt-1" role="progressbar" aria-valuenow={s.progressPercent} aria-valuemin={0} aria-valuemax={100}>
                <span style={{ width: `${s.progressPercent}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </GlassCard>

      <GlassCard padding="md" className="portal-card mt-6">
        <h2 className="font-display text-lg font-semibold text-fg">Pending registrations</h2>
        <p className="text-xs text-muted">Demo only — actions update local demo state.</p>
        <ul className="mt-4 space-y-3">
          {pending.length ? (
            pending.map((r) => (
              <li key={r.id} className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3">
                <div>
                  <p className="font-medium text-fg">{r.applicantName}</p>
                  <p className="text-sm text-muted">{r.course}</p>
                </div>
                <div className="flex gap-2">
                  <button type="button" className="btn btn-primary min-h-9 text-xs" onClick={() => void approve(r.id)}>
                    Approve
                  </button>
                  <button type="button" className="btn btn-ghost min-h-9 text-xs" onClick={() => void reject(r.id)}>
                    Decline
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="text-sm text-muted">No pending demo registrations.</li>
          )}
        </ul>
      </GlassCard>

      <GlassCard padding="md" className="portal-card mt-6">
        <h2 className="font-display text-lg font-semibold text-fg">Upload slots</h2>
        <p className="text-sm text-muted">UI preview only — files are not uploaded in demo mode.</p>
        <ul className="mt-4 space-y-3">
          {UPLOAD_SLOTS.map((slot) => (
            <li key={slot.id} className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-fg">{slot.label}</span>
              <button
                type="button"
                className="btn btn-ghost min-h-9 text-xs"
                onClick={() => setUploadHint(`Demo: ${slot.label} upload not connected.`)}
              >
                Choose file
              </button>
            </li>
          ))}
        </ul>
        {uploadHint ? <p className="mt-3 text-sm text-muted">{uploadHint}</p> : null}
      </GlassCard>
    </div>
  );
}
