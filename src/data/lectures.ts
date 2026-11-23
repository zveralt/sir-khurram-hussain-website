import { SYLLABUS_NODES } from "@/lib/syllabus";

/**
 * Recorded lesson metadata — client/LMS supplied.
 * TODO(client): Add lessons with `state`, duration, and YouTube URLs when live.
 */

export type LessonState = "free" | "locked" | "coming-soon";

export type LectureLesson = {
  id: string;
  title: string;
  durationMinutes?: number | null;
  state: LessonState;
  youtubeUrl?: string | null;
};

export type LecturePlaylist = {
  id: string;
  title: string;
  lessons: LectureLesson[];
};

export const LECTURE_PLAYLISTS: LecturePlaylist[] = SYLLABUS_NODES.map((node) => ({
  id: node.id,
  title: node.title,
  lessons: [] as LectureLesson[],
}));

export function hasPublishedLessons(): boolean {
  return LECTURE_PLAYLISTS.some((p) => p.lessons.some((l) => l.state === "free" && l.youtubeUrl));
}

/** Phase 0 — show the lectures tab only when at least one lesson row exists in data. */
export function hasLectureCatalog(): boolean {
  return LECTURE_PLAYLISTS.some((p) => p.lessons.length > 0);
}
