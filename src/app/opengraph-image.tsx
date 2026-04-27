import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Meta Workers for Change";

export default async function Image() {
  const font = await readFile(join(process.cwd(), "public/fonts/BarlowCondensed-Bold.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          background: "#e63329",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 120,
            fontFamily: "BarlowCondensed",
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.0,
            letterSpacing: "-3px",
          }}
        >
          Meta Workers for Change
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "BarlowCondensed",
          data: font,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );
}
