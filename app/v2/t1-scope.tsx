"use client";

import { useLayoutEffect } from "react";

/** Marks the document so Territoire 1 rules apply, including the launcher outside this route segment. */
export function T1Scope() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.add("t1");
    return () => root.classList.remove("t1");
  }, []);

  return null;
}
