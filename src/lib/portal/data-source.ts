import type {
  AskQuestionPayload,
  PendingRegistration,
  PortalAnnouncement,
  PortalAttendance,
  PortalBatch,
  PortalChild,
  PortalLesson,
  PortalProgress,
  PortalStudent,
  PortalTestScore,
  PortalTopicGroup,
  RosterStudent,
  TeacherNote,
  NextClass,
  MonthlyReport,
} from "@/lib/portal/types";

/**
 * Backend boundary for the on-site portal UI.
 * UI components must depend on this interface only — not on LMS vendors or Supabase clients.
 */
export interface PortalDataSource {
  readonly mode: "demo" | "live";

  getStudent(): Promise<PortalStudent>;
  getProgress(): Promise<PortalProgress>;
  getLessons(): Promise<PortalLesson[]>;
  getLesson(lessonId: string): Promise<PortalLesson | null>;
  getTopicGroups(): Promise<PortalTopicGroup[]>;
  getTests(): Promise<PortalTestScore[]>;
  getAttendance(): Promise<PortalAttendance>;
  getTeacherNotes(): Promise<TeacherNote[]>;
  getBatches(): Promise<PortalBatch[]>;
  getAnnouncements(): Promise<PortalAnnouncement[]>;

  /** Parent role */
  getChildren(): Promise<PortalChild[]>;
  getNextClass(childId: string): Promise<NextClass | null>;
  getMonthlyReport(childId: string): Promise<MonthlyReport | null>;

  /** Teacher role */
  getRoster(batchId: string): Promise<RosterStudent[]>;
  getPendingRegistrations(): Promise<PendingRegistration[]>;
  approveRegistration(id: string): Promise<void>;
  rejectRegistration(id: string): Promise<void>;

  markWatched(lessonId: string): Promise<void>;
  askQuestion(payload: AskQuestionPayload): Promise<{ ok: boolean; error?: string }>;
}
