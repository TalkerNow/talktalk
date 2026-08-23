"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const fieldClassName =
  "w-full border border-[#C43F17]/45 bg-[#F7F6F4] px-4 py-3.5 text-[15px] outline-none transition-colors focus:border-[#C43F17]";

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
      <p className="text-xl leading-relaxed text-foreground">
        C’est transmis. On vous écrit à cette adresse.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-6 overflow-visible">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm text-muted-foreground">
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
        <label htmlFor="company" className="mb-2 block text-sm text-muted-foreground">
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
        <label htmlFor="email" className="mb-2 block text-sm text-muted-foreground">
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
        <label htmlFor="phone" className="mb-2 block text-sm text-muted-foreground">
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
      <div>
        <label htmlFor="message" className="mb-2 block text-sm text-muted-foreground">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${fieldClassName} resize-y`}
        />
      </div>
      <Button
        type="submit"
        variant="iridescent"
        disabled={pending}
        className="rounded-full px-6 overflow-visible"
      >
        Envoyer
      </Button>
    </form>
  );
}
