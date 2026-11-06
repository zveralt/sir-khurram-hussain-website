"use client";

import { type FormEvent, useState } from "react";

export function FooterNewsletterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [feedback, setFeedback] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setFeedback(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("newsletter-email") ?? "");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string; message?: string };
      if (!res.ok) {
        setStatus("error");
        setFeedback(json.error ?? "Could not subscribe.");
        return;
      }
      setStatus("success");
      setFeedback(json.message ?? "Check your inbox for confirmation (when email is configured).");
      form.reset();
    } catch {
      setStatus("error");
      setFeedback("Network error.");
    }
  }

  return (
    <form className="flex flex-col gap-space-sm" onSubmit={onSubmit}>
      <div className="relative flex items-center border-b border-[#245B91]/50 focus-within:border-on-surface">
        <input
          className="w-full bg-transparent py-space-sm font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none"
          placeholder="you@domain.com"
          type="email"
          name="newsletter-email"
          autoComplete="email"
          aria-label="Email for newsletter"
          required
          disabled={status === "loading"}
        />
        <button
          className="px-space-sm text-on-surface hover:text-primary transition-colors disabled:opacity-50"
          type="submit"
          aria-label="Subscribe"
          disabled={status === "loading"}
        >
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
      <span className="font-label-sm text-label-sm text-outline">
        {status === "success" || status === "error" ? (
          <span className={status === "error" ? "text-red-600 dark:text-red-300" : "text-primary"}>
            {feedback}
          </span>
        ) : (
          "Published on a schedule when the list is connected. Strict privacy protocol."
        )}
      </span>
    </form>
  );
}
