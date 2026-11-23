/**
 * Fictional portal fixtures — used only when `?demo=` is active.
 * Names and metrics are invented for layout review, not live student records.
 */
import { SYLLABUS_NODES } from "@/lib/syllabus";
import type {
  MonthlyReport,
  NextClass,
  PendingRegistration,
  PortalAnnouncement,
  PortalAttendance,
  PortalBatch,
  PortalChild,
  PortalLesson,
  PortalStudent,
  PortalTestScore,
  RosterStudent,
  TeacherNote,
} from "@/lib/portal/types";

export const DEMO_STUDENT: PortalStudent = {
  id: "demo-student-1",
  displayName: "Sample Student",
  email: "sample.student@example.com",
  batchLabel: "O Level Islamiyat — weekday batch (demo)",
  isDemo: true,
};

export const DEMO_CHILDREN: PortalChild[] = [
  { id: "demo-child-1", displayName: "Sample Student", batchLabel: DEMO_STUDENT.batchLabel },
];

export const DEMO_BATCHES: PortalBatch[] = [
  {
    id: "demo-batch-a",
    label: "Islamiyat · Weekday (demo)",
    schedule: "Tue & Thu · 5:30–7:00 pm",
    studentCount: 18,
  },
  {
    id: "demo-batch-b",
    label: "Islamiyat · Weekend (demo)",
    schedule: "Sat · 10:00–12:30",
    studentCount: 14,
  },
];

export const DEMO_ROSTER: RosterStudent[] = [
  { id: "demo-student-1", displayName: "Sample Student", progressPercent: 42 },
  { id: "demo-student-2", displayName: "Demo Learner B", progressPercent: 68 },
  { id: "demo-student-3", displayName: "Demo Learner C", progressPercent: 31 },
];

export const DEMO_PENDING_REGS: PendingRegistration[] = [
  {
    id: "demo-reg-1",
    applicantName: "Demo Applicant",
    course: "O Level Islamiyat (demo)",
    submittedAt: "2026-03-01T10:00:00.000Z",
  },
];

export function buildDemoLessons(watchedIds: Set<string>): PortalLesson[] {
  const lessons: PortalLesson[] = [];
  let order = 0;
  for (const node of SYLLABUS_NODES) {
    const baseId = `demo-lesson-${node.id}`;
    const states: Array<PortalLesson["access"]> =
      node.n === "01" ? ["watched", "free", "locked"] : ["locked", "free", "locked"];
    const titles = [`Introduction · ${node.title}`, `Core themes`, `Exam focus`];
    titles.forEach((title, i) => {
      const id = `${baseId}-${i + 1}`;
      let access = states[i] ?? "locked";
      if (watchedIds.has(id)) access = "watched";
      lessons.push({
        id,
        topicId: node.id,
        topicTitle: node.title,
        title,
        durationMinutes: i === 0 ? 12 : 18,
        access,
        /** Demo: leave null until client supplies licensed embed URLs in live data. */
        youtubeEmbedUrl: null,
        notesPdfUrl: null,
        order: order++,
      });
    });
  }
  return lessons;
}

export const DEMO_TESTS: PortalTestScore[] = [
  { id: "t1", label: "Weekly · Paper 1 style", score: 14, maxScore: 20, takenAt: "2026-02-24" },
  { id: "t2", label: "Weekly · Hadith set", score: 16, maxScore: 20, takenAt: "2026-03-03" },
  { id: "t3", label: "Monthly review", score: 38, maxScore: 50, takenAt: "2026-02-28" },
  { id: "t4", label: "Weekly · Themes", score: 17, maxScore: 20, takenAt: "2026-03-10" },
];

export const DEMO_ATTENDANCE: PortalAttendance = {
  percent: 88,
  recent: [
    { date: "2026-03-10", status: "present" },
    { date: "2026-03-08", status: "present" },
    { date: "2026-03-06", status: "late" },
    { date: "2026-03-03", status: "present" },
    { date: "2026-03-01", status: "absent" },
  ],
};

export const DEMO_TEACHER_NOTES: TeacherNote[] = [
  {
    id: "n1",
    body: "Demo note: continue Seerah timeline revision — bring marked booklet next class.",
    author: "Teacher (demo)",
    createdAt: "2026-03-09T14:00:00.000Z",
  },
  {
    id: "n2",
    body: "Demo note: improve Hadith quotation accuracy — practise short citations.",
    author: "Teacher (demo)",
    createdAt: "2026-03-05T12:00:00.000Z",
  },
];

export const DEMO_ANNOUNCEMENTS: PortalAnnouncement[] = [
  {
    id: "a1",
    title: "Demo timetable reminder",
    body: "This announcement is sample copy for layout only — not a live studio message.",
    createdAt: "2026-03-08T09:00:00.000Z",
  },
];

export const DEMO_NEXT_CLASS: NextClass = {
  label: "Islamiyat · Seerah continuation (demo)",
  when: "Thu, 5:30 pm",
  location: "Campus batch · demo label",
};

export const DEMO_MONTHLY_REPORT: MonthlyReport = {
  monthLabel: "February 2026 (demo)",
  summary: "Sample report card copy — attendance steady; written work improving on Paper 2 themes.",
  effort: "steady",
};
