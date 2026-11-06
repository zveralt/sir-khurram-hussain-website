"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/portal/login");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={() => void logout()}
      disabled={loading}
      className="font-label-md uppercase tracking-wider border border-[#071B33]/25 dark:border-outline-variant/50 px-4 py-2 disabled:opacity-60"
    >
      {loading ? "Signing out…" : "Sign out (clear fixture cookie)"}
    </button>
  );
}
