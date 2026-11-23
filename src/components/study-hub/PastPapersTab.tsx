"use client";

import { Download, FileText, Timer } from "lucide-react";
import { type ReactNode, useMemo, useState } from "react";
import { KeyboardSearch, ProgressRing, SegmentedControl } from "@/components/widgets";
import { StackedPaperIllustration } from "@/components/study-hub/StackedPaperIllustration";
import { TimedAttemptModal } from "@/components/study-hub/TimedAttemptModal";
import {
  CAMBRIDGE_PAST_PAPERS_OFFICIAL,
  PAST_PAPERS,
  PAPER_LEVELS,
  type ExamSession,
  type PastPaper,
} from "@/data/papers";
import { progressSummary, resetPaperProgress } from "@/lib/paper-progress";
import { SYLLABUS_NODES } from "@/lib/syllabus";
import { siteConfig } from "@/lib/site-config";

type BrowserMode = "year" | "topic";

type SidebarProps = {
  levelId: string;
  onLevel: (id: string) => void;
  sessions: Record<ExamSession, boolean>;
  onSession: (s: ExamSession, v: boolean) => void;
  onReset: () => void;
  summary: ReturnType<typeof progressSummary>;
};

export function PastPapersTab() {
  const levels = siteConfig.studyHub.paperLevels ?? PAPER_LEVELS;
  const [levelId, setLevelId] = useState(levels[0]?.id ?? "2058");
  const [sessions, setSessions] = useState<Record<ExamSession, boolean>>({ "may-june": true, "oct-nov": true });
  const [search, setSearch] = useState("");
  const [year, setYear] = useState<number | null>(null);
  const [mode, setMode] = useState<BrowserMode>("year");
  const [progressTick, setProgressTick] = useState(0);
  const [timedPaper, setTimedPaper] = useState<PastPaper | null>(null);

  const filtered = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return PAST_PAPERS.filter((p) => {
      if (p.levelId !== levelId) return false;
      if (!sessions[p.session]) return false;
      if (year != null && p.year !== year) return false;
      if (!needle) return true;
      return `${p.paperCode} ${p.title ?? ""}`.toLowerCase().includes(needle);
    }).sort((a, b) => b.year - a.year || b.session.localeCompare(a.session));
  }, [levelId, sessions, search, year]);

  const years = useMemo(() => {
    const set = new Set(PAST_PAPERS.filter((p) => p.levelId === levelId).map((p) => p.year));
    return [...set].sort((a, b) => b - a);
  }, [levelId]);

  const byTopic = useMemo(() => {
    const groups = new Map<string, PastPaper[]>();
    for (const p of filtered) {
      const key = p.topicId?.trim() || "unsorted";
      const list = groups.get(key) ?? [];
      list.push(p);
      groups.set(key, list);
    }
    return [...groups.entries()].map(([topicId, papers]) => ({
      topicId,
      title:
        topicId === "unsorted"
          ? "Other papers"
          : (SYLLABUS_NODES.find((n) => n.id === topicId)?.title ?? topicId),
      papers,
    }));
  }, [filtered]);

  const featured = filtered[0] ?? null;
  const summary = useMemo(() => {
    void progressTick;
    return progressSummary(PAST_PAPERS.length);
  }, [progressTick]);

  if (!PAST_PAPERS.length) return null;

  return (
    <>
      <div className="study-hub__sidebar lg:block">
        <PastPapersSidebar
          levelId={levelId}
          onLevel={setLevelId}
          sessions={sessions}
          onSession={(s, v) => setSessions((prev) => ({ ...prev, [s]: v }))}
          onReset={() => {
            resetPaperProgress();
            setProgressTick((n) => n + 1);
          }}
          summary={summary}
          levels={levels}
        />
      </div>
      <div className="study-hub__content">
        <KeyboardSearch value={search} onChange={setSearch} placeholder="Search paper code…" />
        <p className="mt-2 text-sm text-muted">
          {filtered.length} result{filtered.length === 1 ? "" : "s"}
        </p>

        <div className="mt-4">
          <SegmentedControl
            value={mode}
            onChange={(v) => setMode(v as BrowserMode)}
            options={[
              { value: "year", label: "By year" },
              { value: "topic", label: "By topic" },
            ]}
            ariaLabel="Browse past papers"
          />
        </div>

        {mode === "year" && years.length ? (
          <div className="study-hub__year-scrubber" role="tablist" aria-label="Session years">
            <button
              type="button"
              className={`study-hub__year-dot${year === null ? " study-hub__year-dot--active" : ""}`}
              onClick={() => setYear(null)}
            >
              <span />
              All
            </button>
            {years.map((y) => (
              <button
                key={y}
                type="button"
                className={`study-hub__year-dot${year === y ? " study-hub__year-dot--active" : ""}`}
                onClick={() => setYear(y)}
              >
                <span />
                {y}
              </button>
            ))}
          </div>
        ) : null}

        {mode === "year" && featured ? (
          <article className="study-hub__featured">
            <StackedPaperIllustration className="h-20 w-16 text-[var(--widget-stroke)]" />
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted">Latest</p>
              <h4 className="font-display text-xl font-semibold text-fg">{featured.paperCode}</h4>
              <p className="text-sm text-muted">
                {featured.year} · {sessionLabel(featured.session)}
                {featured.durationMinutes ? ` · ${featured.durationMinutes} min` : ""}
                {featured.marks != null ? ` · ${featured.marks} marks` : ""}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <PaperLink paper={featured} kind="qp" label="Open paper" />
                <PaperLink paper={featured} kind="ms" label="Mark scheme" />
                <button type="button" className="btn btn-ghost min-h-10 text-sm" onClick={() => setTimedPaper(featured)}>
                  Timed attempt
                </button>
              </div>
            </div>
          </article>
        ) : null}

        {mode === "year" ? (
          <PaperList papers={filtered} onTimed={setTimedPaper} />
        ) : (
          <div className="mt-4 space-y-8">
            {byTopic.map((group) => (
              <section key={group.topicId} aria-labelledby={`topic-${group.topicId}`}>
                <h4 id={`topic-${group.topicId}`} className="font-display text-lg font-semibold text-fg">
                  {group.title}
                </h4>
                <PaperList papers={group.papers} onTimed={setTimedPaper} className="mt-3" />
              </section>
            ))}
          </div>
        )}
      </div>

      {timedPaper ? (
        <TimedAttemptModal
          paper={timedPaper}
          onClose={() => setTimedPaper(null)}
          onSaved={() => setProgressTick((n) => n + 1)}
        />
      ) : null}
    </>
  );
}

function PaperList({
  papers,
  onTimed,
  className,
}: {
  papers: PastPaper[];
  onTimed: (p: PastPaper) => void;
  className?: string;
}) {
  return (
    <ul className={className ?? "mt-4"}>
      {papers.map((paper) => (
        <li key={paper.id} className="study-hub__paper-row">
          <div>
            <p className="font-medium text-fg">{paper.paperCode}</p>
            <p className="text-sm text-muted">
              {paper.year} · {sessionLabel(paper.session)}
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 justify-end">
            <PaperIconLink paper={paper} kind="qp" icon={<FileText className="h-4 w-4" />} label="Question paper" />
            <PaperIconLink paper={paper} kind="ms" icon={<FileText className="h-4 w-4" />} label="Mark scheme" />
            <button
              type="button"
              className="study-hub__icon-btn"
              aria-label="Timed attempt"
              onClick={() => onTimed(paper)}
            >
              <Timer className="h-4 w-4" />
            </button>
            <PaperIconLink paper={paper} kind="qp" icon={<Download className="h-4 w-4" />} label="Download" />
          </div>
        </li>
      ))}
    </ul>
  );
}

function PastPapersSidebar({
  levelId,
  onLevel,
  sessions,
  onSession,
  onReset,
  summary,
  levels,
}: SidebarProps & { levels: { id: string; label: string }[] }) {
  const pct = summary.total > 0 ? Math.round((summary.done / summary.total) * 100) : 0;

  return (
    <>
      <div className="study-hub__sidebar-chips lg:flex-col lg:gap-2">
        <label className="text-xs font-mono uppercase tracking-widest text-muted" htmlFor="paper-level">
          Level / paper
        </label>
        <select
          id="paper-level"
          value={levelId}
          onChange={(e) => onLevel(e.target.value)}
          className="w-full rounded-lg border border-line bg-transparent px-2 py-2 text-sm"
        >
          {levels.map((l) => (
            <option key={l.id} value={l.id}>
              {l.label}
            </option>
          ))}
        </select>
      </div>
      <div className="study-hub__session-row">
        <span className="text-xs font-mono uppercase tracking-widest text-muted">Sessions</span>
        <label className="study-hub__checkbox">
          <input
            type="checkbox"
            checked={sessions["may-june"]}
            onChange={(e) => onSession("may-june", e.target.checked)}
          />
          May / June
        </label>
        <label className="study-hub__checkbox">
          <input
            type="checkbox"
            checked={sessions["oct-nov"]}
            onChange={(e) => onSession("oct-nov", e.target.checked)}
          />
          Oct / Nov
        </label>
      </div>
      <details className="study-hub__progress-collapsible">
        <summary>My progress</summary>
        <div className="study-hub__progress-body mt-3 space-y-3">
          <ProgressRing value={pct} label={`${summary.done} of ${summary.total} papers`} size={76} />
          <dl className="text-sm space-y-1 text-muted">
            <div className="flex justify-between gap-4">
              <dt>Marked done</dt>
              <dd className="text-fg font-mono">
                {summary.done}/{summary.total}
              </dd>
            </div>
            {summary.avgTime != null ? (
              <div className="flex justify-between gap-4">
                <dt>Avg time</dt>
                <dd className="text-fg font-mono">{summary.avgTime}s</dd>
              </div>
            ) : null}
            {summary.avgScore != null ? (
              <div className="flex justify-between gap-4">
                <dt>Avg score</dt>
                <dd className="text-fg font-mono">{summary.avgScore}</dd>
              </div>
            ) : null}
            {summary.streak > 0 ? (
              <div className="flex justify-between gap-4">
                <dt>Streak</dt>
                <dd className="text-fg font-mono">{summary.streak}d</dd>
              </div>
            ) : null}
          </dl>
          <button type="button" className="btn btn-ghost w-full min-h-9 text-xs" onClick={onReset}>
            Reset progress
          </button>
          <p className="text-[0.65rem] text-muted leading-relaxed">
            Saved on this device. Syncs once you log in.
          </p>
        </div>
      </details>
    </>
  );
}

function sessionLabel(session: ExamSession) {
  return session === "may-june" ? "May / June" : "Oct / Nov";
}

function paperUrl(paper: PastPaper, kind: "qp" | "ms") {
  const direct = kind === "qp" ? paper.questionPaperUrl : paper.markSchemeUrl;
  return direct ?? paper.officialListingUrl ?? CAMBRIDGE_PAST_PAPERS_OFFICIAL;
}

function PaperLink({
  paper,
  kind,
  label,
}: {
  paper: PastPaper;
  kind: "qp" | "ms";
  label: string;
}) {
  const external = !(kind === "qp" ? paper.questionPaperUrl : paper.markSchemeUrl);
  return (
    <a
      href={paperUrl(paper, kind)}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-ghost min-h-10 text-sm"
    >
      {label}
      {external ? " ↗" : ""}
    </a>
  );
}

function PaperIconLink({
  paper,
  kind,
  icon,
  label,
}: {
  paper: PastPaper;
  kind: "qp" | "ms";
  icon: ReactNode;
  label: string;
}) {
  return (
    <a href={paperUrl(paper, kind)} target="_blank" rel="noopener noreferrer" className="study-hub__icon-btn" aria-label={label}>
      {icon}
    </a>
  );
}
