const WATCHED_KEY = "skh-portal-demo-watched-v1";
const PENDING_KEY = "skh-portal-demo-pending-v1";

export function loadWatchedLessonIds(): Set<string> {
  try {
    const raw = localStorage.getItem(WATCHED_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw) as string[];
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

export function saveWatchedLessonIds(ids: Set<string>) {
  try {
    localStorage.setItem(WATCHED_KEY, JSON.stringify([...ids]));
  } catch {
    /* ignore */
  }
}

export function loadPendingRegistrationIds(): string[] | null {
  try {
    const raw = localStorage.getItem(PENDING_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as string[];
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function savePendingRegistrationIds(ids: string[]) {
  try {
    localStorage.setItem(PENDING_KEY, JSON.stringify(ids));
  } catch {
    /* ignore */
  }
}
