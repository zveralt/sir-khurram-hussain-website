import { cookies } from "next/headers";

export const SESSION_COOKIE = "skh_dev_session";

export type DevSessionPayload = {
  version: 1;
  email: string;
  displayName: string;
  mode: "dev-fixture";
};

export async function getDevSession(): Promise<DevSessionPayload | null> {
  const store = await cookies();
  const raw = store.get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as DevSessionPayload;
    if (parsed?.version === 1 && parsed?.mode === "dev-fixture" && parsed.email) {
      return parsed;
    }
  } catch {
    return null;
  }
  return null;
}
