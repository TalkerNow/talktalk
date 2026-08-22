"use server";

export type WaitlistState = {
  ok: boolean;
  error?: string;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isSiteUrl(value: string) {
  try {
    const url = new URL(value.includes("://") ? value : `https://${value}`);
    return Boolean(url.hostname.includes("."));
  } catch {
    return false;
  }
}

export async function submitWaitlist(
  _prev: WaitlistState,
  formData: FormData,
): Promise<WaitlistState> {
  const email = String(formData.get("email") ?? "").trim();
  const siteUrl = String(formData.get("siteUrl") ?? "").trim();

  if (!isEmail(email)) {
    return { ok: false, error: "Indiquez un email valide." };
  }
  if (!isSiteUrl(siteUrl)) {
    return { ok: false, error: "Indiquez l’adresse de votre site." };
  }

  console.info("[talker.waitlist]", { email, siteUrl });
  return { ok: true };
}
