"use client";

import { TalkerWordmark } from "@/components/brand/mark";
import { AnimatedWave } from "./animated-wave";
import { useLocale } from "@/components/i18n/locale-context";
import { CONSENT_OPEN_EVENT } from "@/lib/consent";

export function FooterSection() {
  const { t } = useLocale();
  return (
    <footer className="relative border-t border-foreground/10">
      <div className="absolute inset-0 h-64 opacity-20 pointer-events-none overflow-hidden">
        <AnimatedWave />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8">
            <div className="col-span-2">
              <a href="/" className="inline-flex items-center gap-2 mb-6">
                <TalkerWordmark className="text-[30px]" />
                <span className="text-xs text-muted-foreground font-mono">TM</span>
              </a>

              <p className="text-muted-foreground leading-relaxed max-w-xs">
                {t.footer.blurb}
              </p>
            </div>

            {t.footer.columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-medium mb-6">{column.title}</h3>
                <ul className="space-y-4">
                  {column.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="py-6 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {t.footer.copyright}
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <button
              type="button"
              className="hover:text-foreground transition-colors"
              onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}
            >
              {t.consent.manage}
            </button>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              {t.footer.systems}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
