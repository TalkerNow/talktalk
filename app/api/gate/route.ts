import { NextResponse } from "next/server";
import {
  GATE_COOKIE,
  GATE_MAX_AGE,
  getSitePassword,
  isGateEnabled,
  isGateMisconfigured,
} from "@/lib/gate/config";
import { safeNextPath } from "@/lib/gate/paths";
import {
  cookieSecure,
  createGateToken,
  passwordsMatch,
} from "@/lib/gate/session";

export async function POST(request: Request) {
  if (!isGateEnabled()) {
    return NextResponse.json({ ok: true, next: "/" });
  }

  if (isGateMisconfigured()) {
    console.error("[gate] SITE_GATE_ENABLED=true but SITE_PASSWORD is empty");
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const data = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const submitted = typeof data.password === "string" ? data.password : "";
  const next = safeNextPath(data.next);
  const password = getSitePassword();

  if (!submitted || !passwordsMatch(submitted, password)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true, next });
  response.cookies.set({
    name: GATE_COOKIE,
    value: createGateToken(password),
    httpOnly: true,
    secure: cookieSecure(request),
    sameSite: "lax",
    path: "/",
    maxAge: GATE_MAX_AGE,
  });
  return response;
}
