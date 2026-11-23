const STORAGE_KEY = "skh-paper-progress-v1";

export type PaperAttempt = {
  paperId: string;
  timeSeconds: number;
  score?: number;
  completedAt: string;
};

export type PaperProgressStore = {
  attempts: PaperAttempt[];
  completedIds: string[];
};

const emptyStore = (): PaperProgressStore => ({ attempts: [], completedIds: [] });

export function loadPaperProgress(): PaperProgressStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyStore();
    const parsed = JSON.parse(raw) as PaperProgressStore;
    if (!parsed?.attempts) return emptyStore();
    return {
      attempts: parsed.attempts,
      completedIds: Array.isArray(parsed.completedIds) ? parsed.completedIds : [],
    };
  } catch {
    return emptyStore();
  }
}

export function savePaperProgress(store: PaperProgressStore) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    /* storage full or disabled */
  }
}

export function resetPaperProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export function recordAttempt(attempt: Omit<PaperAttempt, "completedAt">) {
  const store = loadPaperProgress();
  store.attempts.push({ ...attempt, completedAt: new Date().toISOString() });
  if (!store.completedIds.includes(attempt.paperId)) {
    store.completedIds.push(attempt.paperId);
  }
  savePaperProgress(store);
  return store;
}

export function progressSummary(totalPapers: number) {
  const store = loadPaperProgress();
  const done = store.completedIds.length;
  const times = store.attempts.map((a) => a.timeSeconds).filter((t) => t > 0);
  const scores = store.attempts.map((a) => a.score).filter((s): s is number => typeof s === "number");
  const avgTime = times.length ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : null;
  const avgScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;
  const streak = computeStreak(store.attempts);
  return { done, total: totalPapers, avgTime, avgScore, streak, store };
}

function computeStreak(attempts: PaperAttempt[]) {
  if (!attempts.length) return 0;
  const days = new Set(attempts.map((a) => a.completedAt.slice(0, 10)));
  let streak = 0;
  const cursor = new Date();
  for (;;) {
    const key = cursor.toISOString().slice(0, 10);
    if (days.has(key)) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    } else break;
  }
  return streak;
}
