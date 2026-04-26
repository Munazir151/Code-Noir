import { ImageResponse } from "next/og";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(180deg, #05070c 0%, #080c14 55%, #05070c 100%)",
          color: "#f5f8ff",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.24,
            backgroundImage:
              "linear-gradient(to right, rgba(246,210,31,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(79,109,159,0.16) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 25%, rgba(246,210,31,0.15), rgba(246,210,31,0) 52%)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            height: "100%",
            padding: "60px 80px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 18,
            textAlign: "center",
          }}
        >
          <div
            style={{
              letterSpacing: 4,
              fontSize: 20,
              color: "#8fa0bf",
              textTransform: "uppercase",
            }}
          >
            Digital Forensics Division
          </div>

          <div
            style={{
              fontSize: 124,
              fontWeight: 800,
              letterSpacing: 2,
              lineHeight: 1,
              color: "#f6d21f",
              textTransform: "uppercase",
              textShadow: "0 0 24px rgba(246,210,31,0.28)",
            }}
          >
            Code Noir
          </div>

          <div
            style={{
              marginTop: 10,
              padding: "10px 20px",
              border: "1px solid rgba(246,210,31,0.35)",
              borderRadius: 8,
              fontSize: 26,
              color: "#f4f7ff",
              background: "rgba(10,14,24,0.72)",
            }}
          >
            Investigate clues. Track suspects. Deliver the verdict.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
