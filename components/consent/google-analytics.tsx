"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import {
  CONSENT_EVENT,
  GA_MEASUREMENT_ID,
  disableAnalytics,
  enableAnalytics,
  readConsent,
} from "@/lib/consent";

export function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const apply = () => {
      const analytics = readConsent()?.analytics === true;
      if (analytics) {
        enableAnalytics();
        setEnabled(true);
        return;
      }
      disableAnalytics();
      setEnabled(false);
    };
    apply();
    window.addEventListener(CONSENT_EVENT, apply);
    return () => window.removeEventListener(CONSENT_EVENT, apply);
  }, []);

  if (!enabled) return null;

  return (
    <Script
      id="talker-ga4"
      src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      strategy="afterInteractive"
    />
  );
}
