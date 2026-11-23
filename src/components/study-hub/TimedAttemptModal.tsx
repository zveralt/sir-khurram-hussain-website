"use client";

import { useEffect, useRef, useState } from "react";
import { GlassCard } from "@/components/widgets";
import { recordAttempt } from "@/lib/paper-progress";
import type { PastPaper } from "@/data/papers";

type Props = {
  paper: PastPaper;
  onClose: () => void;
  onSaved: () => void;
};

export function TimedAttemptModal({ paper, onClose, onSaved }: Props) {
  const [mode, setMode] = useState<"countdown" | "stopwatch">("stopwatch");
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [score, setScore] = useState("");
  const [timeInput, setTimeInput] = useState("");
  const tickRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const targetSeconds = (paper.durationMinutes ?? 0) * 60;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (!running) return;
    const loop = () => {
      const now = Date.now();
      const secs = Math.floor((now - startRef.current) / 1000);
      if (mode === "countdown" && targetSeconds > 0) {
        const left = Math.max(0, targetSeconds - secs);
        setElapsed(left);
        if (left === 0) setRunning(false);
      } else {
        setElapsed(secs);
      }
      tickRef.current = requestAnimationFrame(loop);
    };
    tickRef.current = requestAnimationFrame(loop);
    return () => {
      if (tickRef.current) cancelAnimationFrame(tickRef.current);
    };
  }, [running, mode, targetSeconds]);

  function toggleRun() {
    if (running) {
      setRunning(false);
      return;
    }
    startRef.current = Date.now();
    if (mode === "countdown" && targetSeconds > 0) setElapsed(targetSeconds);
    else setElapsed(0);
    setRunning(true);
  }

  function handleDone() {
    const manual = Number(timeInput);
    const timeSeconds = Number.isFinite(manual) && manual > 0 ? manual : mode === "countdown" && targetSeconds ? targetSeconds - elapsed : elapsed;
    const scoreNum = score.trim() ? Number(score) : undefined;
    recordAttempt({
      paperId: paper.id,
      timeSeconds: Math.max(0, timeSeconds),
      score: Number.isFinite(scoreNum) ? scoreNum : undefined,
    });
    onSaved();
    onClose();
  }

  return (
    <div className="study-hub__modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="timed-modal-title">
      <GlassCard className="study-hub__modal" padding="md">
        <h3 id="timed-modal-title" className="font-display text-lg font-semibold text-fg">
          Timed attempt — {paper.paperCode}
        </h3>
        <p className="mt-1 text-sm text-muted">Saved on this device. Syncs once you log in.</p>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            className={`btn btn-ghost text-xs min-h-9${mode === "countdown" ? " !border-[var(--widget-emerald)]" : ""}`}
            onClick={() => setMode("countdown")}
          >
            Countdown
          </button>
          <button
            type="button"
            className={`btn btn-ghost text-xs min-h-9${mode === "stopwatch" ? " !border-[var(--widget-emerald)]" : ""}`}
            onClick={() => setMode("stopwatch")}
          >
            Stopwatch
          </button>
        </div>

        <p className="mt-4 font-mono text-3xl tabular-nums text-fg">
          {formatTime(elapsed)}
        </p>

        <button type="button" className="btn btn-primary mt-3 min-h-10" onClick={toggleRun}>
          {running ? "Pause" : "Start"}
        </button>

        <div className="mt-6 grid gap-3">
          <label className="block text-sm">
            <span className="text-muted">Time (seconds)</span>
            <input
              type="number"
              min={0}
              value={timeInput}
              onChange={(e) => setTimeInput(e.target.value)}
              placeholder={String(elapsed)}
              className="mt-1 w-full rounded-lg border border-line bg-transparent px-3 py-2"
            />
          </label>
          <label className="block text-sm">
            <span className="text-muted">Score / marks (optional)</span>
            <input
              type="number"
              min={0}
              value={score}
              onChange={(e) => setScore(e.target.value)}
              className="mt-1 w-full rounded-lg border border-line bg-transparent px-3 py-2"
            />
          </label>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <button type="button" className="btn btn-primary min-h-10" onClick={handleDone}>
            I&apos;m done
          </button>
          <button type="button" className="btn btn-ghost min-h-10" onClick={onClose}>
            Cancel
          </button>
        </div>
      </GlassCard>
    </div>
  );
}

function formatTime(total: number) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
