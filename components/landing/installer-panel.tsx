"use client";

import { Button } from "@/components/ui/button";
import { useLocale } from "@/components/i18n/locale-context";

const ZIP_HREF = "/talker-now.zip";

export function InstallerPanel() {
  const { t } = useLocale();

  return (
    <div className="mx-auto max-w-2xl">
      <span className="font-mono text-xs tracking-[0.2em] text-foreground uppercase block mb-6">
        {t.installer.stepsEyebrow}
      </span>
      <h1 className="font-display font-semibold text-5xl md:text-6xl tracking-tight text-foreground leading-[0.95]">
        {t.installer.title}
      </h1>
      <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
        {t.installer.subtitle}
      </p>

      <div className="mt-10 flex flex-col items-start gap-3">
        <Button
          asChild
          size="lg"
          variant="iridescent"
          className="h-14 rounded-full px-8 text-base overflow-hidden"
        >
          <a href={ZIP_HREF} download="talker-now.zip">
            {t.installer.download}
          </a>
        </Button>
        <p className="font-mono text-xs text-muted-foreground">
          {t.installer.placeholderNote}
        </p>
      </div>

      <ol className="mt-14 space-y-6">
        {t.installer.steps.map((step, index) => (
          <li key={step} className="flex items-start gap-4">
            <span className="font-mono text-sm text-muted-foreground w-6 shrink-0 pt-0.5">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="text-lg text-foreground leading-snug">{step}</p>
          </li>
        ))}
      </ol>

      <p className="mt-12 text-sm text-muted-foreground leading-relaxed">
        {t.installer.reassurance}
      </p>
    </div>
  );
}
