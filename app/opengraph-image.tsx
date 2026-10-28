import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/content/site";

export const alt = `${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const root = process.cwd();
const font = (file: string) => readFile(join(root, "assets/fonts", file));
const image = async (file: string) =>
  `data:image/png;base64,${(await readFile(join(root, "public/images", file))).toString("base64")}`;

const [pixel, oswald, inter, background, avatar] = await Promise.all([
  font("PressStart2P-Regular.woff"),
  font("Oswald-SemiBold.woff"),
  font("Inter-Medium.woff"),
  image("background.png"),
  image("avatar.png"),
]);

// Same look as the hero: background photo under a navy overlay, pixel
// greeting, Oswald name and the avatar at the bottom right.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", fontFamily: "Inter" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={background} alt="" width={1200} height={630} style={{ position: "absolute", objectFit: "cover" }} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            background: "rgba(10, 25, 41, 0.7)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatar}
          alt=""
          width={810}
          height={540}
          style={{ position: "absolute", right: -150, bottom: -60 }}
        />
        <div style={{ display: "flex", flexDirection: "column", padding: "90px 80px", position: "relative" }}>
          <div style={{ fontFamily: "PressStart", fontSize: 40, color: "#fe8d14", display: "flex", gap: 24 }}>
            {profile.greeting.join(" ")}
          </div>
          <div
            style={{
              fontFamily: "Oswald",
              fontSize: 86,
              lineHeight: 1.1,
              color: "#f3f4f6",
              marginTop: 40,
              maxWidth: 620,
            }}
          >
            {`I'M ${profile.name.toLocaleUpperCase("tr")}`}
          </div>
          <div style={{ fontSize: 38, color: "#60a5fa", marginTop: 28 }}>{profile.role}</div>
          <div style={{ fontSize: 26, color: "#f3f4f6", marginTop: 14 }}>{profile.tagline}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "PressStart", data: pixel, weight: 400, style: "normal" },
        { name: "Oswald", data: oswald, weight: 600, style: "normal" },
        { name: "Inter", data: inter, weight: 500, style: "normal" },
      ],
    },
  );
}
