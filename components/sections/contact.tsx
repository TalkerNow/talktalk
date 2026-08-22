"use client";

import { useActionState } from "react";
import { submitWaitlist, type WaitlistState } from "@/lib/actions/waitlist";
import type { LandingContent } from "@/lib/content/types";

const initial: WaitlistState = { ok: false };

export function ContactSection({ content }: { content: LandingContent }) {
  const [state, action, pending] = useActionState(submitWaitlist, initial);

  return (
    <section id="contact" className="scroll-mt-28 px-5 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="max-w-xl font-serif text-[clamp(2.2rem,5vw,4.2rem)] leading-[1.05]">
            {content.contactTitle}
          </h2>
          <p className="mt-6 max-w-md text-[17px] leading-8 text-muted">
            {content.contactBody}
          </p>
        </div>
        <div className="rounded-3xl border border-line bg-paper p-6 md:p-8">
          {state.ok ? (
            <p className="font-serif text-3xl leading-tight">
              C’est noté. Nous vous écrivons à cette adresse.
            </p>
          ) : (
            <form action={action} className="space-y-5">
              <div>
                <label htmlFor="email" className="text-[13px] text-muted">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="mt-2 w-full rounded-full border border-line bg-background px-4 py-3 text-[15px] outline-none focus:border-ink"
                />
              </div>
              <div>
                <label htmlFor="siteUrl" className="text-[13px] text-muted">
                  Adresse du site
                </label>
                <input
                  id="siteUrl"
                  name="siteUrl"
                  type="text"
                  required
                  inputMode="url"
                  placeholder="atelier.fr"
                  className="mt-2 w-full rounded-full border border-line bg-background px-4 py-3 text-[15px] outline-none focus:border-ink"
                />
              </div>
              {state.error ? (
                <p className="text-sm text-rust">{state.error}</p>
              ) : null}
              <button
                type="submit"
                disabled={pending}
                className="rounded-full bg-ink px-5 py-3 text-[14px] text-paper disabled:opacity-60"
              >
                {pending ? "Envoi…" : "Rejoindre la liste"}
              </button>
              <p className="text-[12px] leading-5 text-muted-2">
                {content.contactNote}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
