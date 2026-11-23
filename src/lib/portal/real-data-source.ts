import type { PortalDataSource } from "@/lib/portal/data-source";
import type { AskQuestionPayload } from "@/lib/portal/types";

const NOT_READY = "Live portal data source is not wired yet. Configure PORTAL_API_URL and implement fetch calls here.";

/**
 * Future integration point for Aark Academy Learn360, a custom LMS API, or Supabase-backed tables.
 *
 * Implementation checklist (for the integrating developer):
 * 1. Add `PORTAL_API_URL` to the deployment environment.
 * 2. Map LMS session cookies or bearer tokens in route handlers — never expose service keys to the client.
 * 3. Implement each method below with typed fetch calls + error handling.
 * 4. Return `mode: "live"` and real student records — never blend with demo fixtures.
 */
export class RealDataSource implements PortalDataSource {
  readonly mode = "live" as const;

  private fail(): never {
    throw new Error(NOT_READY);
  }

  getStudent(): ReturnType<PortalDataSource["getStudent"]> {
    return this.fail();
  }

  getProgress(): ReturnType<PortalDataSource["getProgress"]> {
    return this.fail();
  }

  getLessons(): ReturnType<PortalDataSource["getLessons"]> {
    return this.fail();
  }

  getLesson(lessonId: string): ReturnType<PortalDataSource["getLesson"]> {
    void lessonId;
    return this.fail();
  }

  getTopicGroups(): ReturnType<PortalDataSource["getTopicGroups"]> {
    return this.fail();
  }

  getTests(): ReturnType<PortalDataSource["getTests"]> {
    return this.fail();
  }

  getAttendance(): ReturnType<PortalDataSource["getAttendance"]> {
    return this.fail();
  }

  getTeacherNotes(): ReturnType<PortalDataSource["getTeacherNotes"]> {
    return this.fail();
  }

  getBatches(): ReturnType<PortalDataSource["getBatches"]> {
    return this.fail();
  }

  getAnnouncements(): ReturnType<PortalDataSource["getAnnouncements"]> {
    return this.fail();
  }

  getChildren(): ReturnType<PortalDataSource["getChildren"]> {
    return this.fail();
  }

  getNextClass(childId: string): ReturnType<PortalDataSource["getNextClass"]> {
    void childId;
    return this.fail();
  }

  getMonthlyReport(childId: string): ReturnType<PortalDataSource["getMonthlyReport"]> {
    void childId;
    return this.fail();
  }

  getRoster(batchId: string): ReturnType<PortalDataSource["getRoster"]> {
    void batchId;
    return this.fail();
  }

  getPendingRegistrations(): ReturnType<PortalDataSource["getPendingRegistrations"]> {
    return this.fail();
  }

  approveRegistration(id: string): ReturnType<PortalDataSource["approveRegistration"]> {
    void id;
    return this.fail();
  }

  rejectRegistration(id: string): ReturnType<PortalDataSource["rejectRegistration"]> {
    void id;
    return this.fail();
  }

  markWatched(lessonId: string): ReturnType<PortalDataSource["markWatched"]> {
    void lessonId;
    return this.fail();
  }

  askQuestion(payload: AskQuestionPayload): ReturnType<PortalDataSource["askQuestion"]> {
    void payload;
    return this.fail();
  }
}

export async function loginWithRealBackend(_email: string, _password: string): Promise<{ ok: boolean; error?: string }> {
  return { ok: false, error: NOT_READY };
}
