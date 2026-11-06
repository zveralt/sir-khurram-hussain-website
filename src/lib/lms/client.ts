import "server-only";

import type {
  LmsCatalogCourse,
  LmsEnrollment,
  LmsHealthStatus,
  LmsStudentProfile,
} from "@/lib/lms/types";

function baseUrl() {
  return process.env.LMS_API_BASE_URL?.replace(/\/$/, "") ?? "";
}

function bearer() {
  return process.env.LMS_API_KEY ?? "";
}

/**
 * Health check without exposing secrets. Does not guess endpoints.
 */
export async function getLmsHealth(): Promise<LmsHealthStatus> {
  const root = baseUrl();
  if (!root || !bearer()) {
    return {
      configured: false,
      reachable: null,
      message:
        "LMS_API_BASE_URL and LMS_API_KEY are not set. Add them in Vercel/hosting env when the API contract is ready.",
    };
  }
  return {
    configured: true,
    reachable: null,
    message:
      "Credentials present. Implement ping using the documented LMS health or auth endpoint once confirmed.",
  };
}

/**
 * Placeholder: wire to real endpoints from Notion/API doc.
 * Must not invent URLs — callers should handle "not implemented".
 */
export async function fetchStudentProfile(): Promise<LmsStudentProfile | null> {
  return null;
}

export async function fetchEnrollments(): Promise<LmsEnrollment[]> {
  return [];
}

export async function fetchCatalog(): Promise<LmsCatalogCourse[]> {
  return [];
}
