"use client";

import { type FormEvent, useState } from "react";
import { DeliveryFallback } from "@/components/forms/DeliveryFallback";

export function FooterNewsletterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showFallback, setShowFallback] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setFeedback(null);
    setShowFallback(false);
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
        if (res.status === 503) {
          setShowFallback(true);
        } else {
          setFeedback(json.error ?? "Could not subscribe.");
        }
        return;
      }
      setStatus("success");
      setFeedback(json.message ?? "Subscribed.");
      form.reset();
    } catch {
      setStatus("error");
      setFeedback("Network error.");
    }
  }

  return (
    <form className="mt-4 flex flex-col gap-2" onSubmit={onSubmit}>
      <label className="footer-premium__col-title" htmlFor="newsletter-email">
        Newsletter
      </label>
      <div className="flex gap-2">
        <input
          id="newsletter-email"
          className="min-h-11 flex-1 rounded-lg border border-line bg-card px-3 text-sm text-fg"
          placeholder="you@domain.com"
          type="email"
          name="newsletter-email"
          autoComplete="email"
          required
          disabled={status === "loading"}
        />
        <button className="btn btn-primary min-h-11 px-4" type="submit" disabled={status === "loading"}>
          Join
        </button>
      </div>
      {showFallback ? <DeliveryFallback /> : null}
      {feedback ? (
        <p className={`text-sm ${status === "error" ? "text-fg" : "text-accent"}`}>{feedback}</p>
      ) : (
        <p className="text-sm text-muted">Notes when the list is connected. No address is stored on this site.</p>
      )}
    </form>
  );
}
