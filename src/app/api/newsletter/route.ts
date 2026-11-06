import { NextResponse, type NextRequest } from "next/server";

import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const limited = rateLimit(`newsletter:${ip}`, 5, 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many requests.", retryAfterSec: limited.retryAfterSec },
      { status: 429 },
    );
  }

  let email: string;
  try {
    const body = (await req.json()) as { email?: string };
    email = typeof body.email === "string" ? body.email.trim() : "";
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json({ error: "Valid email required." }, { status: 400 });
  }

  const webhook = process.env.NEWSLETTER_WEBHOOK_URL;
  if (webhook) {
    try {
      const secret = process.env.NEWSLETTER_WEBHOOK_SECRET;
      const res = await fetch(webhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(secret ? { "X-Webhook-Secret": secret } : {}),
        },
        body: JSON.stringify({
          type: "newsletter",
          email,
          receivedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        return NextResponse.json(
          { error: "Subscription service unavailable. Try again later." },
          { status: 502 },
        );
      }
    } catch {
      return NextResponse.json({ error: "Subscription service unreachable." }, { status: 502 });
    }
  } else if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      {
        error:
          "Newsletter is not configured (NEWSLETTER_WEBHOOK_URL). Use SKH contact channels meanwhile.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json({
    ok: true,
    delivered: Boolean(webhook),
    message: webhook
      ? "Subscribed."
      : "Development mode: email recorded locally only (no webhook).",
  });
}
