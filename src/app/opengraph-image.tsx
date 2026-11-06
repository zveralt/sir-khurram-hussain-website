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
          padding: 56,
          background: "linear-gradient(135deg, #071B33 0%, #0d2038 42%, #123B65 100%)",
          color: "#F7F6F2",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <span
            style={{
              fontSize: 22,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#a6c9fb",
            }}
          >
            Academic Studio
          </span>
          <span style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.04em" }}>
            {siteName.toUpperCase()}
          </span>
          <span style={{ fontSize: 26, color: "#c3c6d0", maxWidth: 720, lineHeight: 1.4 }}>
            Cambridge Islamiyat &amp; Islamic Studies — digital courses and resources, with student
            access through Aark Academy&apos;s LMS when connected.
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(166, 201, 251, 0.35)",
            paddingTop: 28,
            fontSize: 20,
            color: "#83a6d6",
          }}
        >
          <span style={{ letterSpacing: "0.2em", textTransform: "uppercase", fontSize: 18 }}>
            Istiqeme Technologies
          </span>
          <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 18 }}>KH · STUDIO</span>
        </div>
      </div>
    ),
    size,
  );
}
