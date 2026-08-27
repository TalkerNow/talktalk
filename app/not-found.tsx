"use client";

import Link from "next/link";
import { useLocale } from "@/components/i18n/locale-context";

export default function NotFound() {
  const { t } = useLocale();
  return (
    <main className="flex min-h-screen flex-col items-start justify-center px-6">
      <p className="font-serif text-7xl text-muted-2">404</p>
      <h1 className="mt-4 max-w-md font-serif text-4xl leading-tight">
        {t.notFound.title}
      </h1>
      <Link
        href="/"
        className="mt-8 rounded-full bg-ink px-5 py-3 text-sm text-paper"
      >
        {t.notFound.back}
      </Link>
    </main>
  );
}
