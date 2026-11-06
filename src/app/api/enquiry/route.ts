import { NextResponse, type NextRequest } from "next/server";

import { rateLimit } from "@/lib/rate-limit";

const MAX_BODY = 12_000;

type EnquiryBody = {
  name?: string;
  email?: string;
  course?: string;
  message?: string;
  source?: string;
};

function isNonEmpty(s: unknown): s is string {
  return typeof s === "string" && s.trim().length > 0;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  const limited = rateLimit(`enquiry:${ip}`, 8, 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many requests. Try again shortly.", retryAfterSec: limited.retryAfterSec },
      { status: 429 },
    );
  }

  let json: EnquiryBody;
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }
    json = JSON.parse(raw) as EnquiryBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!isNonEmpty(json.name) || !isNonEmpty(json.email)) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(json.email.trim());
  if (!emailOk) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (webhook) {
    try {
      const secret = process.env.ENQUIRY_WEBHOOK_SECRET;
      const res = await fetch(webhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(secret ? { "X-Webhook-Secret": secret } : {}),
        },
        body: JSON.stringify({
          type: "enquiry",
          ...json,
          receivedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        return NextResponse.json(
          { error: "Upstream service rejected the inquiry. Please email contact@skh.com.pk directly." },
          { status: 502 },
        );
      }
    } catch {
      return NextResponse.json(
        { error: "Could not reach notification service. Please try again later." },
        { status: 502 },
      );
    }
  } else if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      {
        error:
          "Inquiry storage is not configured (ENQUIRY_WEBHOOK_URL). Please email contact@skh.com.pk.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json({
    ok: true,
    delivered: Boolean(webhook),
    message: webhook
      ? "Inquiry received."
      : "Development mode: inquiry accepted (no webhook configured).",
  });
}
