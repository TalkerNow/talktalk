"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { TalkerLauncherBubble } from "@/components/landing/talker-launcher-bubble";
import { hideLauncher } from "@/lib/talker/paths";
import { TalkerProvider } from "./provider";

export function TalkerShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <TalkerProvider>
      {children}
      {hideLauncher(pathname) ? null : <TalkerLauncherBubble />}
    </TalkerProvider>
  );
}
