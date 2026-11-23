"use client";

import { useEffect, useState } from "react";
import { GlassCard } from "@/components/widgets";
import { WeeklyMarksChart } from "@/components/portal/charts";
import { PortalSkeleton } from "@/components/portal/PortalSkeleton";
import { usePortal } from "@/components/portal/PortalProvider";
import type {
  MonthlyReport,
  NextClass,
  PortalAttendance,
  PortalChild,
  PortalTestScore,
  TeacherNote,
} from "@/lib/portal/types";

export function ParentDashboard() {
  const { dataSource, refreshKey } = usePortal();
  const [loading, setLoading] = useState(true);
  const [children, setChildren] = useState<PortalChild[]>([]);
  const [childId, setChildId] = useState("");
  const [attendance, setAttendance] = useState<PortalAttendance | null>(null);
  const [tests, setTests] = useState<PortalTestScore[]>([]);
  const [notes, setNotes] = useState<TeacherNote[]>([]);
  const [nextClass, setNextClass] = useState<NextClass | null>(null);
  const [report, setReport] = useState<MonthlyReport | null>(null);

  useEffect(() => {
    let cancelled = false;
    void dataSource.getChildren().then((c) => {
      if (cancelled) return;
      setChildren(c);
      setChildId(c[0]?.id ?? "");
    });
    return () => {
      cancelled = true;
    };
  }, [dataSource]);

  useEffect(() => {
    if (!childId) return;
    let cancelled = false;
    const loadId = requestAnimationFrame(() => setLoading(true));
    void (async () => {
      const [a, t, n, nc, mr] = await Promise.all([
        dataSource.getAttendance(),
        dataSource.getTests(),
        dataSource.getTeacherNotes(),
        dataSource.getNextClass(childId),
        dataSource.getMonthlyReport(childId),
      ]);
      if (cancelled) return;
      setAttendance(a);
      setTests(t);
      setNotes(n);
      setNextClass(nc);
      setReport(mr);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
      cancelAnimationFrame(loadId);
    };
  }, [dataSource, childId, refreshKey]);

  if (loading && !attendance) return <PortalSkeleton rows={4} />;

  const chartLabels = tests.slice(0, 4).map((t) => t.takenAt.slice(5));
  const chartValues = tests.slice(0, 4).map((t) => t.score);

  return (
    <div className="portal-parent">
      <p className="font-mono text-xs uppercase tracking-widest text-muted">Parent view · demo data</p>
      <h1 className="font-display text-2xl font-semibold text-fg">Family dashboard</h1>

      {children.length > 1 ? (
        <label className="mt-4 block max-w-xs">
          <span className="text-xs font-mono uppercase tracking-widest text-muted">Child</span>
          <select
            value={childId}
            onChange={(e) => setChildId(e.target.value)}
            className="field mt-1 w-full"
          >
            {children.map((c) => (
              <option key={c.id} value={c.id}>
                {c.displayName}
              </option>
            ))}
          </select>
        </label>
      ) : null}

      <div className="portal-dashboard__grid mt-8">
        <GlassCard padding="md" className="portal-card">
          <h2 className="font-display text-lg font-semibold text-fg">Attendance</h2>
          <p className="mt-2 font-display text-3xl font-semibold text-fg">{attendance?.percent ?? 0}%</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {attendance?.recent.map((d) => (
              <span
                key={d.date}
                className={`portal-attendance-chip portal-attendance-chip--${d.status}`}
                title={d.date}
              >
                {d.date.slice(5)} · {d.status}
              </span>
            ))}
          </div>
        </GlassCard>

        <GlassCard padding="md" className="portal-card">
          <h2 className="font-display text-lg font-semibold text-fg">Weekly test marks</h2>
          <p className="text-xs text-muted">Sample chart — not live marks.</p>
          <div className="mt-4">
            <WeeklyMarksChart labels={chartLabels} values={chartValues} max={20} />
          </div>
        </GlassCard>

        <GlassCard padding="md" className="portal-card portal-card--wide">
          <h2 className="font-display text-lg font-semibold text-fg">Teacher notes</h2>
          <ul className="mt-3 space-y-3">
            {notes.map((n) => (
              <li key={n.id} className="text-sm">
                <p className="text-fg">{n.body}</p>
                <p className="text-xs text-muted mt-1">
                  {n.author} · {new Date(n.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard padding="md" className="portal-card">
          <h2 className="font-display text-lg font-semibold text-fg">Next class</h2>
          {nextClass ? (
            <>
              <p className="mt-2 font-medium text-fg">{nextClass.label}</p>
              <p className="text-sm text-muted">{nextClass.when}</p>
              <p className="text-sm text-muted">{nextClass.location}</p>
            </>
          ) : (
            <p className="mt-2 text-sm text-muted">Not scheduled in demo data.</p>
          )}
        </GlassCard>

        <GlassCard padding="md" className="portal-card">
          <h2 className="font-display text-lg font-semibold text-fg">Monthly report</h2>
          {report ? (
            <>
              <p className="mt-1 text-xs font-mono uppercase tracking-widest text-muted">{report.monthLabel}</p>
              <p className="mt-2 text-sm text-muted">{report.summary}</p>
              <p className="mt-2 text-sm text-fg capitalize">Effort: {report.effort.replace("-", " ")}</p>
            </>
          ) : (
            <p className="mt-2 text-sm text-muted">No report in demo data.</p>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
