"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { TalkerLauncherBubble } from "@/components/landing/talker-launcher-bubble";
import { TalkerProvider } from "./provider";

function hideLauncher(pathname: string | null) {
  return pathname === "/gate" || Boolean(pathname?.startsWith("/gate/"));
}

export function TalkerShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <TalkerProvider>
      {children}
      {hideLauncher(pathname) ? null : <TalkerLauncherBubble />}
    </TalkerProvider>
  );
}
