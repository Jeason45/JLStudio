import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Apple touch icon JL Studio (Option 2 — Carré arrondi).
 * Cohérent avec le favicon 32×32 et le mark A01.
 * Style "app icon iOS" — radius ≈ 18% du côté.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B1E3F",
          borderRadius: 32, // 18% de 180 ≈ 32
        }}
      >
        <div
          style={{
            fontSize: 95,
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: "-6px",
            lineHeight: 1,
          }}
        >
          JL
        </div>
      </div>
    ),
    { ...size }
  );
}
