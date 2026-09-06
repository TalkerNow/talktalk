"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TalkerWordmark } from "@/components/brand/mark";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { useLocale } from "@/components/i18n/locale-context";

const fieldClassName =
  "w-full border border-[#DCD9CE] bg-[#FFFFFF] px-4 py-3.5 text-[15px] text-[#111111] outline-none transition-colors focus:border-[#C43F17]";

export function GateScreen({ next }: { next: string }) {
  const { t } = useLocale();
  const router = useRouter();
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const password = String(new FormData(form).get("password") ?? "");
    setPending(true);
    setError(false);
    try {
      const response = await fetch("/api/gate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, next }),
      });
      if (!response.ok) {
        setError(true);
        return;
      }
      const data = (await response.json()) as { next?: string };
      router.replace(typeof data.next === "string" ? data.next : next);
      router.refresh();
    } catch {
      setError(true);
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-[#F4F3EE] px-6 py-16">
      <div className="absolute right-6 top-6">
        <LanguageSwitcher variant="menu" />
      </div>
      <div className="w-full max-w-md border border-[#DCD9CE] bg-[#FFFFFF] px-8 py-10">
        <TalkerWordmark compact className="text-[24px]" />
        <h1 className="mt-8 text-2xl font-semibold tracking-tight text-[#111111]">
          {t.gate.title}
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-[#52525B]">
          {t.gate.body}
        </p>
        <form onSubmit={onSubmit} className="mt-8 grid gap-5">
          <div>
            <label
              htmlFor="password"
              className="mb-2 block font-mono text-xs tracking-[0.16em] text-[#6B6B73]"
            >
              {t.gate.password}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className={fieldClassName}
            />
          </div>
          {error ? (
            <p className="text-sm text-[#B4113A]" role="alert">
              {t.gate.error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={pending}
            className="bg-[#111111] px-5 py-3 text-sm text-[#FFFFFF] transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {t.gate.submit}
          </button>
        </form>
      </div>
    </main>
  );
}
