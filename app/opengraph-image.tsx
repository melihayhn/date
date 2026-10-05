import { ImageResponse } from "next/og";

export const alt = "First Date? — Just one question.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 50% 0%, rgba(178,58,76,0.18), transparent 60%), #fbf8f4",
          color: "#1d1b19",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 8, textTransform: "uppercase", color: "#7c756e" }}>
          just one question
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 150, letterSpacing: -4 }}>
          First&nbsp;<span style={{ color: "#b23a4c", fontStyle: "italic" }}>date?</span>
        </div>
      </div>
    ),
    size,
  );
}
