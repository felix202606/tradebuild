import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await readFile(join(process.cwd(), "public/logo.png"));
  return new ImageResponse(
    (
      <div
        style={{
          background: "#06080c",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={`data:image/png;base64,${logo.toString("base64")}`} width={920} alt="tradebuild" />
      </div>
    ),
    size,
  );
}
