"use client";

import { useLayoutEffect } from "react";

/** Keeps Territoire 1 on the document. The class is also set on `<html>` for the first paint. */
export function T1Scope() {
  useLayoutEffect(() => {
    document.documentElement.classList.add("t1");
  }, []);

  return null;
}
