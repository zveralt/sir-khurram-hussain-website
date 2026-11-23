import { SYLLABUS_NODES } from "@/lib/syllabus";
import type { PortalDataSource } from "@/lib/portal/data-source";
import {
  DEMO_ANNOUNCEMENTS,
  DEMO_ATTENDANCE,
  DEMO_BATCHES,
  DEMO_CHILDREN,
  DEMO_MONTHLY_REPORT,
  DEMO_NEXT_CLASS,
  DEMO_PENDING_REGS,
  DEMO_ROSTER,
  DEMO_STUDENT,
  DEMO_TEACHER_NOTES,
  DEMO_TESTS,
  buildDemoLessons,
} from "@/lib/portal/demo-data";
import {
  loadPendingRegistrationIds,
  loadWatchedLessonIds,
  savePendingRegistrationIds,
  saveWatchedLessonIds,
} from "@/lib/portal/demo-local-state";
import type {
  AskQuestionPayload,
  PortalLesson,
  PortalTopicGroup,
} from "@/lib/portal/types";

export class DemoDataSource implements PortalDataSource {
  readonly mode = "demo" as const;

  private watched = loadWatchedLessonIds();
  private pendingIds: string[];

  constructor() {
    const stored = loadPendingRegistrationIds();
    this.pendingIds = stored ?? DEMO_PENDING_REGS.map((r) => r.id);
  }

  private lessons(): PortalLesson[] {
    return buildDemoLessons(this.watched);
  }

  async getStudent() {
    return DEMO_STUDENT;
  }

  async getProgress() {
    const lessons = this.lessons();
    const watched = lessons.filter((l) => l.access === "watched").length;
    const total = lessons.length;
    const percent = total ? Math.round((watched / total) * 100) : 0;
    return { lessonsWatched: watched, lessonsTotal: total, percent };
  }

  async getLessons() {
    return this.lessons();
  }

  async getLesson(lessonId: string) {
    return this.lessons().find((l) => l.id === lessonId) ?? null;
  }

  async getTopicGroups(): Promise<PortalTopicGroup[]> {
    const lessons = this.lessons();
    return SYLLABUS_NODES.map((node) => ({
      node,
      lessons: lessons.filter((l) => l.topicId === node.id),
    }));
  }

  async getTests() {
    return DEMO_TESTS;
  }

  async getAttendance() {
    return DEMO_ATTENDANCE;
  }

  async getTeacherNotes() {
    return DEMO_TEACHER_NOTES;
  }

  async getBatches() {
    return DEMO_BATCHES;
  }

  async getAnnouncements() {
    return DEMO_ANNOUNCEMENTS;
  }

  async getChildren() {
    return DEMO_CHILDREN;
  }

  async getNextClass(_childId: string) {
    return DEMO_NEXT_CLASS;
  }

  async getMonthlyReport(_childId: string) {
    return DEMO_MONTHLY_REPORT;
  }

  async getRoster() {
    return DEMO_ROSTER;
  }

  async getPendingRegistrations() {
    return DEMO_PENDING_REGS.filter((r) => this.pendingIds.includes(r.id));
  }

  async approveRegistration(id: string) {
    this.pendingIds = this.pendingIds.filter((x) => x !== id);
    savePendingRegistrationIds(this.pendingIds);
  }

  async rejectRegistration(id: string) {
    this.pendingIds = this.pendingIds.filter((x) => x !== id);
    savePendingRegistrationIds(this.pendingIds);
  }

  async markWatched(lessonId: string) {
    this.watched.add(lessonId);
    saveWatchedLessonIds(this.watched);
  }

  async askQuestion(payload: AskQuestionPayload) {
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: payload.studentName,
          email: payload.email,
          course: `Portal question · ${payload.lessonTitle}`,
          message: payload.message,
          source: `portal-lesson:${payload.lessonId}`,
        }),
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        return { ok: false, error: json.error ?? "Could not send question." };
      }
      return { ok: true };
    } catch {
      return { ok: false, error: "Network error." };
    }
  }
}
