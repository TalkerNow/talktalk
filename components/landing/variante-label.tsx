"use client";

import { useLocale } from "@/components/i18n/locale-context";

export function VarianteLabel() {
  const { t } = useLocale();
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/40">
      {t.compare.variante}
    </p>
  );
}
