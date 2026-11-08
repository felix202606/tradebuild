import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#14382f",
          color: "#f3efe6",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6 }}>TRADEBUILD</div>
        <div style={{ fontSize: 64, lineHeight: 1.15, maxWidth: 860 }}>
          Trading, wallet, and commerce infrastructure
        </div>
      </div>
    ),
    size,
  );
}
