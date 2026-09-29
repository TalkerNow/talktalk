"use client";

import { usePathname } from "next/navigation";
import { useLocale } from "@/components/i18n/locale-context";
import { isV2Path } from "@/lib/theme/v2-href";

/** `/v2` home FAQ only. Live copy stays in `lib/i18n`. */
const V2_GENERIC_ANSWER: Record<string, string> = {
  "En quoi Talker est-il différent d'un chatbot générique ?":
    "Il s'aligne sur vos prestations et votre ton, sans menu de secteurs. La conversation s'appuie sur des cadres psychologiques élaborés pour s'adapter à chaque visiteur, puis qualifier assez pour capter e-mail, téléphone et besoin réel.",
  "How is Talker different from a generic chatbot?":
    "It stays aligned with your services and tone, with no sector menu. The conversation relies on psychological frames built to adapt to each visitor, then qualify enough to capture email, phone, and the real need.",
};

export function FaqList({ variant = "page" }: { variant?: "page" | "section" }) {
  const { t } = useLocale();
  const v2 = isV2Path(usePathname());
  const isPage = variant === "page";
  const Heading = isPage ? "h1" : "h2";

  return (
    <section
      id="faq"
      className={
        isPage
          ? "relative overflow-visible pb-20 pt-32 lg:pb-28 lg:pt-40"
          : "relative overflow-visible py-12 lg:py-16"
      }
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <Heading
          className={
            isPage
              ? "mb-12 font-display text-5xl font-semibold tracking-tight lg:mb-16 lg:text-7xl xl:text-8xl"
              : "mb-8 font-display text-4xl font-semibold tracking-tight lg:mb-10 lg:text-6xl xl:text-7xl"
          }
        >
          {t.faq.title}
        </Heading>

        <div className="max-w-3xl border-t border-[#DCD9CE]">
          {t.faq.items.map((item) => {
            const answer = v2 && V2_GENERIC_ANSWER[item.q] ? V2_GENERIC_ANSWER[item.q] : item.a;
            return (
              <details
                key={item.q}
                className="group border-b border-[#DCD9CE] open:bg-transparent"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C43F17] lg:py-6">
                  <span className="font-display text-lg leading-snug tracking-tight text-[#111111] lg:text-2xl">
                    {item.q}
                  </span>
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center text-2xl font-light leading-none text-[#C43F17]"
                    aria-hidden
                  >
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline">−</span>
                  </span>
                </summary>
                <div className="max-w-2xl space-y-3 pb-6 text-base leading-relaxed text-[#52525B] lg:pb-8 lg:text-lg">
                  {(Array.isArray(answer) ? answer : [answer]).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {item.c && answer === item.a ? <p>{item.c}</p> : null}
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
