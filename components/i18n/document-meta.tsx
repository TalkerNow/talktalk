"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useLocale } from "./locale-context";
import { localeInfo } from "@/lib/i18n";

function metaForPath(pathname: string, t: ReturnType<typeof useLocale>["t"]) {
  if (pathname.startsWith("/produit")) {
    return { title: t.meta.produitTitle, description: t.meta.produitDescription };
  }
  if (pathname.startsWith("/faq")) {
    return { title: t.meta.faqTitle, description: t.meta.faqDescription };
  }
  if (pathname.startsWith("/contact")) {
    return { title: t.meta.contactTitle, description: t.meta.contactDescription };
  }
  if (pathname.startsWith("/installer")) {
    return { title: t.meta.installerTitle, description: t.meta.installerDescription };
  }
  return { title: t.meta.homeTitle, description: t.meta.homeDescription };
}

export function DocumentMeta() {
  const pathname = usePathname();
  const { locale, t } = useLocale();

  useEffect(() => {
    const next = metaForPath(pathname, t);
    document.title = next.title;
    document.documentElement.lang = localeInfo[locale].htmlLang;
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute("content", next.description);
    } else {
      const tag = document.createElement("meta");
      tag.name = "description";
      tag.content = next.description;
      document.head.appendChild(tag);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    ogTitle?.setAttribute("content", next.title);
    ogDescription?.setAttribute("content", next.description);
  }, [locale, pathname, t]);

  return null;
}
