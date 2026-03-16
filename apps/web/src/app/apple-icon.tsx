import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

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
          background: "#000000",
          borderRadius: "50%",
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontWeight: 700,
            color: "#F5F0E8",
            letterSpacing: "-5px",
            marginTop: -4,
          }}
        >
          JL
        </div>
      </div>
    ),
    { ...size }
  );
}
