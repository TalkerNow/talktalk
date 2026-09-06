import { NextResponse, type NextRequest } from "next/server";
import { GATE_COOKIE, ROBOTS_HEADER, isGateEnabled } from "@/lib/gate/config";
import { isPublicPath, safeNextPath } from "@/lib/gate/paths";
import { isValidGateCookie } from "@/lib/gate/session";

function withRobots(response: NextResponse) {
  response.headers.set("X-Robots-Tag", ROBOTS_HEADER);
  return response;
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (isPublicPath(pathname) || !isGateEnabled()) {
    return withRobots(NextResponse.next());
  }

  if (isValidGateCookie(request.cookies.get(GATE_COOKIE)?.value)) {
    return withRobots(NextResponse.next());
  }

  const login = request.nextUrl.clone();
  login.pathname = "/gate";
  login.search = "";
  login.searchParams.set("next", safeNextPath(`${pathname}${search}`));
  return withRobots(NextResponse.redirect(login));
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|_next/webpack-hmr|favicon.ico|favicon.svg|brand/).*)",
  ],
};
