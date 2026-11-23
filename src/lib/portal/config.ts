/**
 * Real portal authentication and data load only when a backend base URL is configured.
 * Set `PORTAL_API_URL` (server) or `NEXT_PUBLIC_PORTAL_API_URL` (client-aware builds) in the host env.
 */
export function isPortalBackendConfigured(): boolean {
  const url =
    (typeof process.env.NEXT_PUBLIC_PORTAL_API_URL === "string" &&
      process.env.NEXT_PUBLIC_PORTAL_API_URL.trim()) ||
    (typeof process.env.PORTAL_API_URL === "string" && process.env.PORTAL_API_URL.trim());
  return Boolean(url);
}

export type PortalDemoRole = "student" | "parent" | "teacher";

export const PORTAL_DEMO_ROLES: PortalDemoRole[] = ["student", "parent", "teacher"];

export function parseDemoRole(raw: string | null | undefined): PortalDemoRole | null {
  if (raw === "student" || raw === "parent" || raw === "teacher") return raw;
  return null;
}

export const PORTAL_DEMO_STORAGE_KEY = "skh-portal-demo-role-v1";
