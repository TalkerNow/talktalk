"use client";

const thread = [
  { side: "right" as const, width: "42%", lines: [56] },
  { side: "left" as const, width: "58%", lines: [70, 44] },
  { side: "right" as const, width: "36%", lines: [48] },
  { side: "left" as const, width: "64%", lines: [62, 50] },
  { side: "right" as const, width: "48%", lines: [40] },
];

export function AnimatedChat() {
  return (
    <div className="relative flex h-full w-full items-center justify-center px-10 lg:px-16">
      <div className="flex w-full max-w-[420px] flex-col gap-3.5">
        {thread.map((bubble, index) => (
          <div
            key={`${bubble.side}-${index}`}
            className={`flex ${bubble.side === "right" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`hero-chat-bubble rounded-[18px] px-4 py-3 ${
                bubble.side === "left"
                  ? "rounded-bl-md bg-[#C43F17]/12"
                  : "rounded-br-md bg-[#111111]/8"
              }`}
              style={{
                width: bubble.width,
                animationDelay: `${index * 0.7}s`,
              }}
            >
              {bubble.lines.map((width, lineIndex) => (
                <span
                  key={lineIndex}
                  className={`block h-1.5 rounded-full ${
                    bubble.side === "left" ? "bg-[#C43F17]/35" : "bg-[#111111]/20"
                  } ${lineIndex > 0 ? "mt-1.5" : ""}`}
                  style={{ width: `${width}%` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
