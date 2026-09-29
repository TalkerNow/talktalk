import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F6F3EE",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 28,
            color: "#161310",
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              background: "#C43F17",
            }}
          />
          talker.now
        </div>
        <div
          style={{
            display: "flex",
            width: 1040,
            fontSize: 48,
            lineHeight: 1.12,
            color: "#161310",
          }}
        >
          Talker — chatbot IA / agent conversationnel pour WordPress
        </div>
        <div style={{ fontSize: 24, color: "#6F6862", maxWidth: 720 }}>
          Les IA aspirent le trafic de votre site. Talker le récupère.
        </div>
      </div>
    ),
    size,
  );
}
