export function HeroArt() {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[460px]"
      aria-hidden
    >
      <div className="absolute inset-8 rounded-full bg-[radial-gradient(circle_at_60%_40%,rgba(196,63,23,0.28),transparent_62%)] blur-2xl" />
      <svg viewBox="0 0 480 480" className="relative h-full w-full">
        <defs>
          <linearGradient id="talkerRust" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E26A3A" />
            <stop offset="45%" stopColor="#C43F17" />
            <stop offset="100%" stopColor="#8F2C0F" />
          </linearGradient>
        </defs>
        <path
          d="M86 248c38-92 168-148 248-86 62 48 58 148-18 188"
          fill="none"
          stroke="url(#talkerRust)"
          strokeWidth="42"
          strokeLinecap="round"
        />
        <path
          d="M148 318c72 54 186 18 214-72"
          fill="none"
          stroke="url(#talkerRust)"
          strokeWidth="28"
          strokeLinecap="round"
          opacity="0.85"
        />
        <circle cx="338" cy="168" r="34" fill="#C43F17" />
        <circle cx="132" cy="292" r="18" fill="#E8C4B4" />
      </svg>
    </div>
  );
}
