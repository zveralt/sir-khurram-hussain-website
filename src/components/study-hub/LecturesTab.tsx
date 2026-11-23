"use client";

import Link from "next/link";
import { useState } from "react";
import { LectureVideoModal } from "@/components/study-hub/LectureVideoModal";
import { GlassCard } from "@/components/widgets";
import { LECTURE_PLAYLISTS, type LectureLesson } from "@/data/lectures";
import { siteConfig } from "@/lib/site-config";

export function LecturesTab() {
  const [video, setVideo] = useState<LectureLesson | null>(null);
  const price = siteConfig.studyHub.lectureUnlockPrice;

  return (
    <div className="study-hub__content study-hub__lectures">
      <p className="text-sm text-muted max-w-2xl mb-6">
        Topics follow the nine syllabus fields. Only lessons listed in <code className="text-xs">data/lectures.ts</code>{" "}
        appear here — we do not imply recordings exist without data.
      </p>

      <ul className="space-y-6">
        {LECTURE_PLAYLISTS.map((field) => (
          <li key={field.id}>
            <GlassCard padding="md" className="study-hub__topic-group">
              <h3 className="font-display text-lg font-semibold text-fg">{field.title}</h3>
              {field.lessons.length === 0 ? (
                <p className="mt-2 text-sm text-muted">No published lessons for this field yet.</p>
              ) : (
                <ul className="mt-4 divide-y divide-line">
                  {field.lessons.map((lesson) => (
                    <li key={lesson.id}>
                      <LessonRow lesson={lesson} price={price} onPlay={() => setVideo(lesson)} />
                    </li>
                  ))}
                </ul>
              )}
            </GlassCard>
          </li>
        ))}
      </ul>

      {video ? <LectureVideoModal lesson={video} onClose={() => setVideo(null)} /> : null}
    </div>
  );
}

function LessonRow({
  lesson,
  price,
  onPlay,
}: {
  lesson: LectureLesson;
  price: string | null;
  onPlay: () => void;
}) {
  return (
    <div className="study-hub__lecture-row study-hub__lecture-row--stack">
      <span className="flex flex-wrap items-center justify-between gap-3 py-3 w-full">
        <span>
          <span className="block font-medium text-fg">{lesson.title}</span>
          {lesson.durationMinutes != null ? (
            <span className="text-sm text-muted">{lesson.durationMinutes} min</span>
          ) : null}
        </span>
        <span className="flex flex-wrap items-center gap-2">
          <LessonPill state={lesson.state} />
          {lesson.state === "free" || lesson.state === "coming-soon" ? (
            <button type="button" className="btn btn-ghost min-h-9 text-xs" onClick={onPlay}>
              {lesson.state === "free" && lesson.youtubeUrl ? "Play" : "Details"}
            </button>
          ) : null}
        </span>
      </span>
      {lesson.state === "locked" ? (
        <GlassCard padding="sm" className="study-hub__unlock-card mb-3 text-sm">
          <p className="text-muted">Enrolled students get every lecture.</p>
          {price ? <p className="mt-1 font-medium text-fg">{price}</p> : null}
          <Link href="/#register" className="btn btn-primary mt-3 min-h-10 w-full sm:w-auto">
            Register
          </Link>
        </GlassCard>
      ) : null}
    </div>
  );
}

function LessonPill({ state }: { state: LectureLesson["state"] }) {
  const label = state === "free" ? "Free preview" : state === "locked" ? "Locked" : "Coming soon";
  return (
    <span className={`study-hub__lesson-pill${state === "free" ? " study-hub__lesson-pill--free" : ""}`}>{label}</span>
  );
}
