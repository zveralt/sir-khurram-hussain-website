import type { SyllabusNode } from "@/lib/syllabus";

export type PortalDemoRole = "student" | "parent" | "teacher";

export type LessonAccess = "free" | "locked" | "watched" | "unlocked";

export type PortalStudent = {
  id: string;
  displayName: string;
  email: string;
  batchLabel: string;
  isDemo: boolean;
};

export type PortalChild = {
  id: string;
  displayName: string;
  batchLabel: string;
};

export type PortalProgress = {
  lessonsWatched: number;
  lessonsTotal: number;
  percent: number;
};

export type PortalLesson = {
  id: string;
  topicId: string;
  topicTitle: string;
  title: string;
  durationMinutes: number | null;
  access: LessonAccess;
  youtubeEmbedUrl: string | null;
  notesPdfUrl: string | null;
  order: number;
};

export type PortalTestScore = {
  id: string;
  label: string;
  score: number;
  maxScore: number;
  takenAt: string;
};

export type PortalAttendanceDay = {
  date: string;
  status: "present" | "absent" | "late";
};

export type PortalAttendance = {
  percent: number;
  recent: PortalAttendanceDay[];
};

export type TeacherNote = {
  id: string;
  body: string;
  author: string;
  createdAt: string;
};

export type PortalBatch = {
  id: string;
  label: string;
  schedule: string;
  studentCount: number;
};

export type RosterStudent = {
  id: string;
  displayName: string;
  progressPercent: number;
};

export type PendingRegistration = {
  id: string;
  applicantName: string;
  course: string;
  submittedAt: string;
};

export type PortalAnnouncement = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
};

export type NextClass = {
  label: string;
  when: string;
  location: string;
};

export type MonthlyReport = {
  monthLabel: string;
  summary: string;
  effort: "steady" | "needs-attention" | "strong";
};

export type AskQuestionPayload = {
  studentName: string;
  email: string;
  lessonId: string;
  lessonTitle: string;
  message: string;
};

export type PortalTopicGroup = {
  node: SyllabusNode;
  lessons: PortalLesson[];
};

export type DemoUploadSlot = {
  id: string;
  label: string;
  kind: "notes" | "lecture-link";
};
