import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "JL Studio — Développeur Web Freelance";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a1628",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Subtle gradient accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(99,139,255,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, transparent, #638BFF, transparent)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              color: "white",
              letterSpacing: "-0.03em",
              lineHeight: 0.9,
            }}
          >
            JL STUDIO
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#638BFF",
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
            }}
          >
            Développeur Web Freelance
          </div>
          <div
            style={{
              fontSize: 22,
              color: "rgba(255,255,255,0.5)",
              marginTop: 8,
            }}
          >
            Sites vitrine, e-commerce & applications sur mesure
          </div>
        </div>

        {/* Bottom info */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "rgba(255,255,255,0.35)",
            fontSize: 18,
          }}
        >
          <span>jlstudio.dev</span>
          <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
          <span>Bordeaux, France</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
