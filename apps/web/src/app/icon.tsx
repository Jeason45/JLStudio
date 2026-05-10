import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Favicon JL Studio (Option 2 — Carré arrondi).
 * Cohérent avec le mark A01 du brand : navy + "JL" Inter extra-bold blanc.
 * Style "app icon iOS" — radius ≈ 18% du côté.
 */
export default function Icon() {
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
          borderRadius: 6, // 18% de 32 ≈ 6
        }}
      >
        <div
          style={{
            fontSize: 17,
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: "-1px",
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
