"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GlassCard, ProgressRing } from "@/components/widgets";
import { TestSparkline } from "@/components/portal/charts";
import { PortalSkeleton } from "@/components/portal/PortalSkeleton";
import { usePortal } from "@/components/portal/PortalProvider";
import { usePortalDemo } from "@/components/portal/usePortalDemo";
import { loadPaperProgress } from "@/lib/paper-progress";
import type { PortalAnnouncement, PortalLesson, PortalStudent, PortalTestScore } from "@/lib/portal/types";

export function StudentDashboard() {
  const { dataSource, refreshKey } = usePortal();
  const { querySuffix } = usePortalDemo();
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<PortalStudent | null>(null);
  const [progress, setProgress] = useState<{ lessonsWatched: number; lessonsTotal: number; percent: number } | null>(
    null,
  );
  const [upNext, setUpNext] = useState<PortalLesson | null>(null);
  const [tests, setTests] = useState<PortalTestScore[]>([]);
  const [announcements, setAnnouncements] = useState<PortalAnnouncement[]>([]);
  const [paperAttempts, setPaperAttempts] = useState(0);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const [s, p, lessons, t, a] = await Promise.all([
        dataSource.getStudent(),
        dataSource.getProgress(),
        dataSource.getLessons(),
        dataSource.getTests(),
        dataSource.getAnnouncements(),
      ]);
      if (cancelled) return;
      setStudent(s);
      setProgress(p);
      const next =
        lessons.find((l) => l.access !== "watched" && (l.access === "free" || l.access === "unlocked")) ??
        lessons.find((l) => l.access !== "watched") ??
        null;
      setUpNext(next);
      setTests(t);
      setAnnouncements(a);
      setPaperAttempts(loadPaperProgress().attempts.length);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [dataSource, refreshKey]);

  if (loading) return <PortalSkeleton rows={4} />;

  const sparkValues = tests.map((t) => Math.round((t.score / t.maxScore) * 100));

  return (
    <div className="portal-dashboard">
      <header className="portal-dashboard__greet">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">Student</p>
        <h1 className="font-display text-2xl font-semibold text-fg">
          Hello, {student?.displayName ?? "learner"}
        </h1>
        {student?.isDemo ? (
          <p className="mt-1 text-sm text-muted">Demo profile — fictional metrics below.</p>
        ) : null}
      </header>

      <div className="portal-dashboard__grid">
        <GlassCard className="portal-card" padding="md">
          <h2 className="font-display text-lg font-semibold text-fg">Lesson progress</h2>
          <div className="mt-4 flex items-center gap-4">
            <ProgressRing
              value={progress?.percent ?? 0}
              label={`${progress?.lessonsWatched ?? 0} watched`}
              size={88}
            />
            <p className="text-sm text-muted leading-relaxed">
              {progress?.lessonsWatched ?? 0} of {progress?.lessonsTotal ?? 0} demo lessons marked watched.
            </p>
          </div>
        </GlassCard>

        <GlassCard className="portal-card" padding="md">
          <h2 className="font-display text-lg font-semibold text-fg">Up next in this topic</h2>
          {upNext ? (
            <>
              <p className="mt-2 text-sm text-muted">{upNext.topicTitle}</p>
              <p className="mt-1 font-medium text-fg">{upNext.title}</p>
              <Link href={`/portal/lesson/${upNext.id}${querySuffix}`} className="btn btn-primary mt-4 min-h-10">
                Open lesson
              </Link>
            </>
          ) : (
            <p className="mt-3 text-sm text-muted">No upcoming lesson in the demo catalogue.</p>
          )}
        </GlassCard>

        <GlassCard className="portal-card" padding="md">
          <h2 className="font-display text-lg font-semibold text-fg">Recent test scores</h2>
          <p className="mt-1 text-xs text-muted">Demo weekly marks — not live results.</p>
          <div className="mt-4">
            <TestSparkline values={sparkValues} aria-label="Recent demo test scores" />
          </div>
          <ul className="mt-3 space-y-1 text-sm text-muted">
            {tests.slice(-3).map((t) => (
              <li key={t.id}>
                {t.label}: {t.score}/{t.maxScore}
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard className="portal-card" padding="md">
          <h2 className="font-display text-lg font-semibold text-fg">Past-paper attempts</h2>
          <p className="mt-2 text-sm text-muted">
            {paperAttempts > 0
              ? `${paperAttempts} timed attempt${paperAttempts === 1 ? "" : "s"} saved on this device from the study hub.`
              : "No timed attempts saved on this device yet."}
          </p>
          <Link href="/#library" className="btn btn-ghost mt-4 min-h-10">
            Study hub ↗
          </Link>
        </GlassCard>

        <GlassCard className="portal-card portal-card--wide" padding="md">
          <h2 className="font-display text-lg font-semibold text-fg">Announcements</h2>
          <ul className="mt-4 space-y-3">
            {announcements.length ? (
              announcements.map((a) => (
                <li key={a.id}>
                  <p className="font-medium text-fg">{a.title}</p>
                  <p className="text-sm text-muted">{a.body}</p>
                </li>
              ))
            ) : (
              <li className="text-sm text-muted">No announcements.</li>
            )}
          </ul>
        </GlassCard>
      </div>
    </div>
  );
}
