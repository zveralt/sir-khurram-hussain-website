"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { GlassCard } from "@/components/widgets";
import { AskSirForm } from "@/components/portal/AskSirForm";
import { PortalSkeleton } from "@/components/portal/PortalSkeleton";
import { usePortal } from "@/components/portal/PortalProvider";
import { usePortalDemo } from "@/components/portal/usePortalDemo";
import type { PortalLesson, PortalStudent } from "@/lib/portal/types";

export function LessonView({ lessonId }: { lessonId: string }) {
  const { dataSource, refresh, refreshKey } = usePortal();
  const { querySuffix } = usePortalDemo();
  const [loading, setLoading] = useState(true);
  const [lesson, setLesson] = useState<PortalLesson | null>(null);
  const [upNext, setUpNext] = useState<PortalLesson[]>([]);
  const [student, setStudent] = useState<PortalStudent | null>(null);
  const [marking, setMarking] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const [l, lessons, s] = await Promise.all([
        dataSource.getLesson(lessonId),
        dataSource.getLessons(),
        dataSource.getStudent(),
      ]);
      if (cancelled) return;
      setLesson(l);
      setStudent(s);
      if (l) {
        const sorted = lessons.filter((x) => x.topicId === l.topicId).sort((a, b) => a.order - b.order);
        const idx = sorted.findIndex((x) => x.id === l.id);
        setUpNext(sorted.slice(idx + 1, idx + 4));
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [dataSource, lessonId, refreshKey]);

  async function markWatched() {
    if (!lesson) return;
    setMarking(true);
    await dataSource.markWatched(lesson.id);
    refresh();
    setMarking(false);
  }

  if (loading) return <PortalSkeleton rows={4} />;
  if (!lesson) {
    return (
      <div>
        <p className="text-fg">Lesson not found.</p>
        <Link href="/portal" className="btn btn-ghost mt-4">
          Back to dashboard
        </Link>
      </div>
    );
  }

  const locked = lesson.access === "locked";

  return (
    <article className="portal-lesson">
      <Link href={`/portal/topics${querySuffix}`} className="text-sm link-u text-muted">
        ← Topics
      </Link>
      <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted">{lesson.topicTitle}</p>
      <h1 className="font-display text-2xl font-semibold text-fg">{lesson.title}</h1>

      <GlassCard padding="md" className="portal-card mt-6">
        <div className="aspect-video w-full overflow-hidden rounded-xl border border-line bg-[var(--midnight,#020817)]">
          {locked ? (
            <div className="flex h-full items-center justify-center p-6 text-center text-sm text-muted">
              This demo lesson is locked. Enrol via registration when live access is enabled.
            </div>
          ) : lesson.youtubeEmbedUrl ? (
            <iframe
              title={lesson.title}
              src={lesson.youtubeEmbedUrl}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted">
              Video URL not set — placeholder player area.
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            className="btn btn-primary min-h-10"
            disabled={locked || marking}
            onClick={() => void markWatched()}
          >
            {marking ? "Saving…" : "Mark as watched"}
          </button>
          <span
            className="btn btn-ghost min-h-10 pointer-events-none opacity-60"
            title={lesson.notesPdfUrl ? undefined : "Notes file not supplied yet"}
          >
            Download notes (PDF)
          </span>
        </div>

        <div className="mt-8">
          <AskSirForm
            dataSource={dataSource}
            lessonId={lesson.id}
            lessonTitle={lesson.title}
            defaultName={student?.displayName ?? ""}
            defaultEmail={student?.email ?? ""}
          />
        </div>
      </GlassCard>

      {upNext.length ? (
        <section className="mt-8" aria-labelledby="up-next-heading">
          <h2 id="up-next-heading" className="font-display text-lg font-semibold text-fg">
            Up next
          </h2>
          <ul className="mt-3 space-y-2">
            {upNext.map((l) => (
              <li key={l.id}>
                <Link href={`/portal/lesson/${l.id}${querySuffix}`} className="link-u text-fg">
                  {l.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
