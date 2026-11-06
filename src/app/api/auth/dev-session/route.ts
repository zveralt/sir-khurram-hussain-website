import { NextResponse, type NextRequest } from "next/server";

import { SESSION_COOKIE, type DevSessionPayload } from "@/lib/auth/session";

/**
 * Development-only session cookie for portal UI. Does not replace LMS login.
 */
export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Use the Aark Academy LMS to sign in in production." },
      { status: 403 },
    );
  }

  let body: { email?: string; displayName?: string };
  try {
    body = (await req.json()) as { email?: string; displayName?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const displayName = typeof body.displayName === "string" ? body.displayName.trim() : "Student";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email required." }, { status: 400 });
  }

  const payload: DevSessionPayload = {
    version: 1,
    email,
    displayName,
    mode: "dev-fixture",
  };

  const res = NextResponse.json({ ok: true, message: "Dev session created (fixture only)." });
  res.cookies.set({
    name: SESSION_COOKIE,
    value: JSON.stringify(payload),
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
    // This handler never runs in production (see guard above)
    secure: false,
  });
  return res;
}
