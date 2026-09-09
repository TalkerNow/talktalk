export function hideLauncher(pathname: string | null | undefined) {
  return pathname === "/gate" || Boolean(pathname?.startsWith("/gate/"));
}
