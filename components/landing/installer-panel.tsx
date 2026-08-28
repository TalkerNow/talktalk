"use client";

import { Button } from "@/components/ui/button";
import { useLocale } from "@/components/i18n/locale-context";
import { InstallerVignette } from "@/components/landing/installer-vignette";
import { PLUGIN_ZIP_FILENAME, PLUGIN_ZIP_HREF } from "@/lib/plugin-zip";

export function InstallerPanel() {
  const { t } = useLocale();

  return (
    <div>
      <div className="mx-auto max-w-2xl">
        <span className="mb-6 block font-mono text-xs tracking-[0.2em] text-foreground uppercase">
          {t.installer.stepsEyebrow}
        </span>
        <h1 className="font-display text-5xl leading-[0.95] font-semibold tracking-tight text-foreground md:text-6xl">
          {t.installer.title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          {t.installer.subtitle}
        </p>

        <div className="mt-10 flex flex-col items-start gap-3">
          <Button
            asChild
            size="lg"
            variant="iridescent"
            className="h-14 overflow-hidden rounded-full px-8 text-base"
          >
            <a href={PLUGIN_ZIP_HREF} download={PLUGIN_ZIP_FILENAME}>
              {t.installer.download}
            </a>
          </Button>
          <p className="font-mono text-xs text-muted-foreground">
            {t.installer.placeholderNote}
          </p>
        </div>
      </div>

      <InstallerVignette />

      <div className="mx-auto mt-14 max-w-2xl lg:mt-16">
        <ol className="space-y-6">
          {t.installer.steps.map((step, index) => (
            <li key={step} className="flex items-start gap-4">
              <span className="w-6 shrink-0 pt-0.5 font-mono text-sm text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-lg leading-snug text-foreground">{step}</p>
            </li>
          ))}
        </ol>

        <p className="mt-12 text-sm leading-relaxed text-muted-foreground">
          {t.installer.reassurance}
        </p>
      </div>
    </div>
  );
}
