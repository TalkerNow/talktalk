"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const fieldClassName =
  "w-full border border-[#C43F17]/45 bg-[#F7F6F4] px-4 py-3.5 text-[15px] outline-none transition-colors focus:border-[#C43F17]";

const labelClassName =
  "mb-2 block font-mono text-xs tracking-[0.16em] text-muted-foreground";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      company: String(data.get("company") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };

    setPending(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) setSent(true);
    } finally {
      setPending(false);
    }
  }

  if (sent) {
    return (
      <p className="text-2xl font-display leading-tight tracking-tight text-foreground lg:text-3xl">
        C’est transmis. On vous écrit à cette adresse.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6 overflow-visible lg:grid-cols-2">
      <div>
        <label htmlFor="name" className={labelClassName}>
          Nom
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className={fieldClassName}
        />
      </div>
      <div>
        <label htmlFor="company" className={labelClassName}>
          Société
        </label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          className={fieldClassName}
        />
      </div>
      <div>
        <label htmlFor="email" className={labelClassName}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={fieldClassName}
        />
      </div>
      <div>
        <label htmlFor="phone" className={labelClassName}>
          Téléphone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className={fieldClassName}
        />
      </div>
      <div className="lg:col-span-2">
        <label htmlFor="message" className={labelClassName}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className={`${fieldClassName} resize-y`}
        />
      </div>
      <div className="overflow-visible lg:col-span-2">
        <Button
          type="submit"
          variant="iridescent"
          disabled={pending}
          className="rounded-full px-8 overflow-visible"
        >
          Envoyer
        </Button>
      </div>
    </form>
  );
}
