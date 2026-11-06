"use client";

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { aarkLmsPublicUrl } from "@/lib/site";

export function LoginForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/auth/dev-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(data.get("email")),
          displayName: String(data.get("displayName") ?? "Student"),
        }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        setStatus("error");
        setMessage(json.error ?? "Could not sign in.");
        return;
      }
      router.push("/portal/dashboard");
      router.refresh();
    } catch {
      setStatus("error");
      setMessage("Network error.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8 max-w-md">
      <div>
        <label htmlFor="email" className="eyebrow">
          Email
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" className="field mt-2" />
      </div>
      <div>
        <label htmlFor="displayName" className="eyebrow">
          Display name
        </label>
        <input id="displayName" name="displayName" type="text" className="field mt-2" />
      </div>
      {message ? <p className="text-sm text-red-700 dark:text-red-300">{message}</p> : null}
      <button type="submit" disabled={status === "loading"} className="btn btn-ghost">
        {status === "loading" ? "Signing in…" : "Dev sign-in"}
      </button>
      <p className="text-xs text-muted">
        Production:{" "}
        <a href={aarkLmsPublicUrl} className="link-u text-fg" target="_blank" rel="noopener noreferrer">
          Open LMS
        </a>
      </p>
    </form>
  );
}
