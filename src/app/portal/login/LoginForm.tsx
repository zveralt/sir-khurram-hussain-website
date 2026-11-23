"use client";

import { type FormEvent, useState } from "react";
import Link from "next/link";
import { PortalDemoLinks } from "@/components/portal/PortalDemoLinks";
import { loginWithRealBackend } from "@/lib/portal/real-data-source";
import { aarkLmsPublicUrl } from "@/lib/site";

export function LoginForm({ backendConfigured }: { backendConfigured: boolean }) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!backendConfigured) return;
    setStatus("loading");
    setMessage(null);
    const data = new FormData(e.currentTarget);
    const result = await loginWithRealBackend(String(data.get("email")), String(data.get("password")));
    if (!result.ok) {
      setStatus("error");
      setMessage(result.error ?? "Could not sign in.");
      return;
    }
    setStatus("idle");
    setMessage("Signed in.");
  }

  return (
    <div className={`portal-login-disabled max-w-md space-y-8 ${backendConfigured ? "" : "opacity-100"}`}>
      <form onSubmit={onSubmit} className="space-y-6">
        <p className="text-sm text-muted leading-relaxed">
          {backendConfigured
            ? "Sign in with your approved student account."
            : "Student logins open when your registration is approved."}
        </p>
        <div>
          <label htmlFor="email" className="eyebrow">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            disabled={!backendConfigured}
            className="field mt-2"
          />
        </div>
        <div>
          <label htmlFor="password" className="eyebrow">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            disabled={!backendConfigured}
            className="field mt-2"
          />
        </div>
        {message ? <p className="text-sm text-red-700 dark:text-red-300">{message}</p> : null}
        <button type="submit" disabled={!backendConfigured || status === "loading"} className="btn btn-primary min-h-11">
          {status === "loading" ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <div className="border-t border-line pt-6 space-y-4">
        <p className="text-sm text-muted">Explore the portal layout with labelled demo data:</p>
        <PortalDemoLinks />
        <div className="flex flex-wrap gap-3">
          <Link href="/#register" className="btn btn-ghost min-h-10">
            Register
          </Link>
          <a href={aarkLmsPublicUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost min-h-10">
            Aark Academy LMS ↗
          </a>
        </div>
      </div>
    </div>
  );
}
