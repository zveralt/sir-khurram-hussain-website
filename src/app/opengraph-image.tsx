import { ImageResponse } from "next/og";
import { siteName, siteTagline } from "@/lib/site";

export const alt = `${siteName} — ${siteTagline}`;
export const size = { width: 1200, height: 630 };

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#020817",
          color: "#FFFFFF",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 16,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#C6D8F5",
          }}
        >
          <span>Academic Studio</span>
          <span>2058</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <span style={{ fontSize: 68, lineHeight: 0.95, letterSpacing: "-0.04em", fontWeight: 700 }}>
            Sir Khurram Hussain
          </span>
          <span style={{ fontSize: 32, color: "#1265FF", fontWeight: 600 }}>
            Clarity first. Confidence through understanding.
          </span>
          <span style={{ fontSize: 22, color: "#A6B2CC", maxWidth: 740, lineHeight: 1.45 }}>
            Cambridge O Level Islamiyat — digital courses and resources, with learner access through
            Aark Academy.
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(185,213,255,0.18)",
            paddingTop: 24,
            fontSize: 15,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#A6B2CC",
          }}
        >
          <span>Istiqeme Technologies</span>
          <span>Karachi</span>
        </div>
      </div>
    ),
    size,
  );
}
