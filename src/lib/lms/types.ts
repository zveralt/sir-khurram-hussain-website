/**
 * Types for Aark Academy / Learn360 LMS integration.
 * Replace `unknown` with OpenAPI-generated types when documentation is imported.
 */

export type LmsHealthStatus = {
  configured: boolean;
  reachable: boolean | null;
  message: string;
};

export type LmsStudentProfile = {
  id: string;
  email: string;
  displayName: string;
};

export type LmsEnrollment = {
  courseId: string;
  courseTitle: string;
  status: "active" | "pending" | "completed";
};

export type LmsCatalogCourse = {
  id: string;
  slug: string;
  title: string;
  summary: string;
};
