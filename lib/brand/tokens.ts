export const BRAND_COLORS = {
  page: "#F4F3EE",
  surface: "#FFFFFF",
  sunken: "#EDEBE3",
  border: "#DCD9CE",
  ink: "#111111",
  muted: "#52525B",
  subtle: "#6B6B73",
  rust: "#C43F17",
  rustHover: "#A8350F",
  rustActive: "#8C2B0C",
  accentBg: "#FAEDE7",
  accentBorder: "#E3B49F",
  onAccent: "#FFFFFF",
  success: "#1F7A4D",
  successBg: "#E8F4EC",
  warning: "#8A6100",
  warningBg: "#FBF2DC",
  danger: "#B4113A",
  dangerBg: "#FCEAEE",
  info: "#1B5FA8",
  infoBg: "#E9F1F9",
  black: "#000000",
} as const;

export const BRAND_HEX_SET: ReadonlySet<string> = new Set(
  Object.values(BRAND_COLORS).map((hex) => hex.toUpperCase()),
);
