"use client";

import { useEffect, useRef } from "react";
import { GlassCard } from "@/components/widgets";
import type { LectureLesson } from "@/data/lectures";

type Props = {
  lesson: LectureLesson;
  onClose: () => void;
};

function toEmbedUrl(url: string) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    if (u.hostname.includes("youtube.com")) return `https://www.youtube.com/embed/${u.searchParams.get("v") ?? ""}`;
  } catch {
    /* ignore */
  }
  return url;
}

export function LectureVideoModal({ lesson, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const embed = lesson.youtubeUrl ? toEmbedUrl(lesson.youtubeUrl) : null;
  const showPlayer = lesson.state === "free" && embed;

  return (
    <div
      className="study-hub__modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lecture-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <GlassCard className="study-hub__modal" padding="sm">
        <h3 id="lecture-modal-title" className="font-display text-lg font-semibold text-fg">
          {lesson.title}
        </h3>
        <div className="surface-dark mt-4 aspect-video w-full overflow-hidden rounded-lg border border-line bg-[var(--bg)]">
          {showPlayer ? (
            <iframe
              title={lesson.title}
              src={embed}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full items-center justify-center p-6 text-center text-sm text-muted">
              Lecture coming soon
            </div>
          )}
        </div>
        <button ref={closeRef} type="button" className="btn btn-ghost mt-3 min-h-10" onClick={onClose}>
          Close
        </button>
      </GlassCard>
    </div>
  );
}
