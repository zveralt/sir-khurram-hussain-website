"use client";

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    <form onSubmit={onSubmit} className="space-y-4 max-w-md">
      <div>
        <label htmlFor="email" className="block font-label-sm text-[11px] uppercase tracking-wider text-[#64748B] dark:text-outline mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full bg-white dark:bg-surface-container border-b-2 border-[#071B33]/20 dark:border-primary-container/70 px-3 py-2.5 font-body-sm"
        />
      </div>
      <div>
        <label htmlFor="displayName" className="block font-label-sm text-[11px] uppercase tracking-wider text-[#64748B] dark:text-outline mb-1">
          Display name
        </label>
        <input
          id="displayName"
          name="displayName"
          type="text"
          className="w-full bg-white dark:bg-surface-container border-b-2 border-[#071B33]/20 dark:border-primary-container/70 px-3 py-2.5 font-body-sm"
        />
      </div>
      {message ? <p className="font-body-sm text-red-600 dark:text-red-300">{message}</p> : null}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-3 bg-[#071B33] dark:bg-primary text-white dark:text-on-primary font-label-md uppercase tracking-wider border border-[#071B33] dark:border-[#245B91] disabled:opacity-60"
      >
        {status === "loading" ? "Signing in…" : "Dev sign-in"}
      </button>
      <p className="font-label-sm text-[10px] text-[#64748B] dark:text-outline uppercase tracking-wider">
        Production: use the Learn360 login.{" "}
        <Link href="https://aark-academy.learn360lms.com/" className="text-[#123B65] dark:text-primary underline" target="_blank" rel="noopener noreferrer">
          Open LMS
        </Link>
      </p>
    </form>
  );
}
