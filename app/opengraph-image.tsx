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
            flexDirection: "column",
            fontSize: 72,
            lineHeight: 0.95,
            color: "#161310",
            maxWidth: 880,
          }}
        >
          {"L'agent qui vend à votre place."}
        </div>
        <div style={{ fontSize: 24, color: "#6F6862", maxWidth: 720 }}>
          Les IA aspirent le trafic de votre site. Talker le récupère.
        </div>
      </div>
    ),
    size,
  );
}
