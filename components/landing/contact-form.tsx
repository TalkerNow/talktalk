"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = {
      name: String(new FormData(form).get("name") ?? "").trim(),
      email: String(new FormData(form).get("email") ?? "").trim(),
      message: String(new FormData(form).get("message") ?? "").trim(),
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
    <form onSubmit={onSubmit} className="max-w-xl space-y-6">
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
          className="w-full border border-foreground/12 bg-background px-4 py-3 text-[15px] outline-none focus:border-foreground/40"
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
          className="w-full border border-foreground/12 bg-background px-4 py-3 text-[15px] outline-none focus:border-foreground/40"
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
          className="w-full resize-y border border-foreground/12 bg-background px-4 py-3 text-[15px] outline-none focus:border-foreground/40"
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
