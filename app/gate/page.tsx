import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { GATE_COOKIE, isGateEnabled } from "@/lib/gate/config";
import { safeNextPath } from "@/lib/gate/paths";
import { isValidGateCookie } from "@/lib/gate/session";
import { GateScreen } from "./gate-screen";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function GatePage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string | string[] }>;
}) {
  const params = await searchParams;
  const next = safeNextPath(params.next);
  const token = (await cookies()).get(GATE_COOKIE)?.value;

  if (!isGateEnabled() || isValidGateCookie(token)) {
    redirect(next);
  }

  return <GateScreen next={next} />;
}
