import { NextResponse } from "next/server";

import { getLmsHealth } from "@/lib/lms/client";

export async function GET() {
  const health = await getLmsHealth();
  return NextResponse.json(health);
}
