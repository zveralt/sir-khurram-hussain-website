"use client";

import { type FormEvent, useState } from "react";
import { hasWhatsApp, whatsAppChatUrl } from "@/lib/site-config";
import type { PortalDataSource } from "@/lib/portal/data-source";

export function AskSirForm({
  dataSource,
  lessonId,
  lessonTitle,
  defaultName,
  defaultEmail,
}: {
  dataSource: PortalDataSource;
  lessonId: string;
  lessonTitle: string;
  defaultName: string;
  defaultEmail: string;
}) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);
    const data = new FormData(e.currentTarget);
    const result = await dataSource.askQuestion({
      studentName: String(data.get("name")),
      email: String(data.get("email")),
      lessonId,
      lessonTitle,
      message: String(data.get("message")),
    });
    if (result.ok) {
      setStatus("done");
      setOpen(false);
    } else {
      setStatus("error");
      setError(result.error ?? "Could not send.");
    }
  }

  const waUrl = hasWhatsApp() ? whatsAppChatUrl() : null;

  return (
    <div>
      <button type="button" className="btn btn-primary min-h-10" onClick={() => setOpen((v) => !v)}>
        Ask Sir about this
      </button>
      {open ? (
        <form onSubmit={onSubmit} className="portal-ask-form mt-4 space-y-3">
          <div>
            <label htmlFor="ask-name" className="text-xs font-mono uppercase tracking-widest text-muted">
              Name
            </label>
            <input id="ask-name" name="name" defaultValue={defaultName} required className="field mt-1" />
          </div>
          <div>
            <label htmlFor="ask-email" className="text-xs font-mono uppercase tracking-widest text-muted">
              Email
            </label>
            <input id="ask-email" name="email" type="email" defaultValue={defaultEmail} required className="field mt-1" />
          </div>
          <div>
            <label htmlFor="ask-msg" className="text-xs font-mono uppercase tracking-widest text-muted">
              Question
            </label>
            <textarea id="ask-msg" name="message" required rows={3} className="field mt-1" />
          </div>
          {error ? <p className="text-sm text-red-600 dark:text-red-300">{error}</p> : null}
          <button type="submit" disabled={status === "loading"} className="btn btn-ghost min-h-10">
            {status === "loading" ? "Sending…" : "Send via enquiry form"}
          </button>
        </form>
      ) : null}
      {status === "done" ? <p className="mt-2 text-sm text-[var(--widget-emerald)]">Question sent — thank you.</p> : null}
      {waUrl ? (
        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-2 min-h-10">
          Or WhatsApp ↗
        </a>
      ) : null}
    </div>
  );
}
