"use client";

import { usePathname } from "next/navigation";

const LIVE_PAGES = new Set(["/produit", "/installer", "/contact", "/faq"]);

export function V2Banner() {
  const pathname = usePathname() || "/v2";
  const livePath = pathname === "/v2" ? "/" : pathname.replace(/^\/v2/, "") || "/";
  const href = livePath === "/" || LIVE_PAGES.has(livePath) ? livePath : "/";
  const label = href === "/" ? "Voir la home" : "Voir la page live";

  return (
    <p className="t1-draft-banner">
      <span>V2 — charte T1 (brouillon)</span>
      <a href={href}>{label}</a>
    </p>
  );
}
