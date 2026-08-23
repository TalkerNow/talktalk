import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const data = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const name = String(data.name ?? "").trim();
  const company = String(data.company ?? "").trim();
  const email = String(data.email ?? "").trim();
  const phone = String(data.phone ?? "").trim();
  const message = String(data.message ?? "").trim();

  if (!name || !email.includes("@") || !message) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  console.log("[contact]", { name, company, email, phone, message });
  return NextResponse.json({ ok: true });
}
