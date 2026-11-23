/**
 * Contrast, faint-text, and overflow check for light and dark themes.
 * Usage: npm run check:themes
 * Optional: BASE_URL=http://127.0.0.1:3000 node scripts/check-themes.mjs
 */
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { PNG } from "pngjs";
import { chromium } from "playwright";

const ROUTES = [
  "/",
  "/about",
  "/philosophy",
  "/syllabus-map",
  "/faq",
  "/expertise",
  "/resources",
  "/contact",
  "/store",
  "/portal",
  "/portal?demo=student",
  "/portal?demo=parent",
  "/portal?demo=teacher",
];
const VIEWPORTS = [
  { name: "1440", width: 1440, height: 900 },
  { name: "375", width: 375, height: 812 },
];
const THEMES = ["light", "dark"];
const PORT = Number(process.env.PORT || 4173);

function portFree(port) {
  return new Promise((resolve) => {
    const server = createServer();
    server.once("error", () => resolve(false));
    server.once("listening", () => server.close(() => resolve(true)));
    server.listen(port, "127.0.0.1");
  });
}

async function waitForHttp(url, timeoutMs = 60000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok || res.status < 500) return;
    } catch {
      /* server still booting */
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(`Server did not respond at ${url}`);
}

function startServer() {
  const child = spawn("npx", ["next", "start", "-p", String(PORT)], {
    stdio: ["ignore", "pipe", "pipe"],
    shell: false,
    env: process.env,
  });
  child.stdout?.on("data", () => {});
  child.stderr?.on("data", () => {});
  return child;
}

function parseCssColor(value) {
  if (!value) return null;
  const m = value.match(/rgba?\(([^)]+)\)/i);
  if (!m) return null;
  const parts = m[1].split(/[,\s/]+/).filter(Boolean).map(Number);
  if (parts.length < 3 || parts.some((n) => Number.isNaN(n))) return null;
  return { r: parts[0], g: parts[1], b: parts[2], a: parts.length > 3 ? parts[3] : 1 };
}

function relLuminance({ r, g, b }) {
  const f = (v) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function contrast(a, b) {
  const L1 = relLuminance(a);
  const L2 = relLuminance(b);
  const hi = Math.max(L1, L2);
  const lo = Math.min(L1, L2);
  return (hi + 0.05) / (lo + 0.05);
}

function composite(fg, bg) {
  const a = fg.a ?? 1;
  return {
    r: fg.r * a + bg.r * (1 - a),
    g: fg.g * a + bg.g * (1 - a),
    b: fg.b * a + bg.b * (1 - a),
    a: 1,
  };
}

function decodePng(buffer) {
  return PNG.sync.read(buffer);
}

function sampleBackground(png) {
  const { width, height, data } = png;
  const buckets = new Map();
  const take = (x, y) => {
    const i = (y * width + x) * 4;
    const key = `${data[i] >> 3},${data[i + 1] >> 3},${data[i + 2] >> 3}`;
    const prev = buckets.get(key) || { n: 0, r: 0, g: 0, b: 0 };
    prev.n += 1;
    prev.r += data[i];
    prev.g += data[i + 1];
    prev.b += data[i + 2];
    buckets.set(key, prev);
  };
  for (let x = 0; x < width; x += 2) {
    take(x, 0);
    take(x, height - 1);
  }
  for (let y = 0; y < height; y += 2) {
    take(0, y);
    take(width - 1, y);
  }
  let best = null;
  for (const bucket of buckets.values()) {
    if (!best || bucket.n > best.n) best = bucket;
  }
  if (!best) return { r: 255, g: 255, b: 255, a: 1 };
  return { r: best.r / best.n, g: best.g / best.n, b: best.b / best.n, a: 1 };
}

function textContrast(png, background) {
  const { width, height, data } = png;
  const ratios = [];
  const bgLum = relLuminance(background);
  for (let y = 1; y < height - 1; y += 2) {
    for (let x = 1; x < width - 1; x += 2) {
      const i = (y * width + x) * 4;
      const px = { r: data[i], g: data[i + 1], b: data[i + 2], a: 1 };
      if (Math.abs(relLuminance(px) - bgLum) < 0.18) continue;
      ratios.push(contrast(px, background));
    }
  }
  if (ratios.length < 8) return null;
  ratios.sort((a, b) => a - b);
  const upper = ratios.slice(Math.floor(ratios.length * 0.55));
  return upper[Math.floor(upper.length / 2)];
}

const COLLECT = `() => {
  const parse = (value) => {
    if (!value) return null;
    const m = value.match(/rgba?\\(([^)]+)\\)/i);
    if (!m) return null;
    const parts = m[1].split(/[,\\s/]+/).filter(Boolean).map(Number);
    if (parts.length < 3 || parts.some((n) => Number.isNaN(n))) return null;
    return { r: parts[0], g: parts[1], b: parts[2], a: parts.length > 3 ? parts[3] : 1 };
  };
  const selectorFor = (el) => {
    if (el.id) return "#" + CSS.escape(el.id);
    const parts = [];
    let n = el;
    while (n && n !== document.body && parts.length < 4) {
      let s = n.tagName.toLowerCase();
      if (typeof n.className === "string" && n.className.trim()) {
        const c = n.className.trim().split(/\\s+/).find((x) => x && !x.startsWith("js-"));
        if (c) s += "." + CSS.escape(c);
      }
      parts.unshift(s);
      n = n.parentElement;
    }
    return parts.join(" > ");
  };
  const textOf = (el) => {
    let out = "";
    for (const node of el.childNodes) {
      if (node.nodeType === Node.TEXT_NODE) out += node.textContent || "";
    }
    return out.replace(/\\s+/g, " ").trim();
  };
  const visibleBox = (el) => {
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") return null;
    const rect = el.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return null;
    return { rect, cs };
  };
  const complexBg = (el) => {
    const own = getComputedStyle(el);
    if (own.webkitBackgroundClip === "text" || own.backgroundClip === "text") return true;
    let node = el;
    while (node) {
      const cs = getComputedStyle(node);
      const image = cs.backgroundImage || "";
      if (image && image !== "none") return true;
      const bg = parse(cs.backgroundColor);
      if (bg && bg.a >= 0.98) return false;
      node = node.parentElement;
    }
    return false;
  };
  const effectiveBackground = (el, fg) => {
    const layers = [];
    let node = el;
    while (node) {
      const bg = parse(getComputedStyle(node).backgroundColor);
      if (bg && bg.a > 0.01) layers.push(bg);
      if (bg && bg.a >= 0.98) break;
      node = node.parentElement;
    }
    if (!layers.length) layers.push({ r: 255, g: 255, b: 255, a: 1 });
    let acc = { ...layers[layers.length - 1], a: 1 };
    for (let i = layers.length - 2; i >= 0; i--) {
      const src = layers[i];
      const a = src.a;
      acc = {
        r: src.r * a + acc.r * (1 - a),
        g: src.g * a + acc.g * (1 - a),
        b: src.b * a + acc.b * (1 - a),
        a: 1,
      };
    }
    const a = fg.a ?? 1;
    return {
      background: acc,
      foreground: {
        r: fg.r * a + acc.r * (1 - a),
        g: fg.g * a + acc.g * (1 - a),
        b: fg.b * a + acc.b * (1 - a),
        a: 1,
      },
    };
  };
  const lum = (c) => {
    const f = (v) => {
      const x = v / 255;
      return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
    };
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
  };
  const ratioOf = (a, b) => {
    const L1 = lum(a);
    const L2 = lum(b);
    const hi = Math.max(L1, L2);
    const lo = Math.min(L1, L2);
    return (hi + 0.05) / (lo + 0.05);
  };
  const failures = [];
  let index = 0;
  const nodes = document.querySelectorAll("body *");
  for (const el of nodes) {
    if (el.closest(".hero-campaign, .hero-scope, [aria-hidden='true'], [hidden]")) continue;
    const snippet = textOf(el);
    if (!snippet) continue;
    const box = visibleBox(el);
    if (!box) continue;
    const { cs, rect } = box;
    const opacity = Number(cs.opacity);
    const id = "c" + index++;
    el.setAttribute("data-theme-check", id);
    if (opacity === 0) continue;
    if (opacity < 0.1) {
      failures.push({
        id,
        selector: selectorFor(el),
        snippet: snippet.slice(0, 80),
        ratio: "opacity " + opacity.toFixed(2),
        kind: "opacity",
        x: rect.x, y: rect.y, w: rect.width, h: rect.height,
      });
      continue;
    }
    const fg = parse(cs.color);
    if (!fg) continue;
    const size = parseFloat(cs.fontSize);
    const weight = Number(cs.fontWeight) || 400;
    const large = size >= 24 || (size >= 18.5 && weight >= 700);
    const min = large ? 3 : 4.5;
    const needsPixels =
      complexBg(el) ||
      cs.webkitBackgroundClip === "text" ||
      cs.backgroundClip === "text";
    if (needsPixels) {
      failures.push({
        id,
        selector: selectorFor(el),
        snippet: snippet.slice(0, 80),
        ratio: null,
        kind: "pixels",
        min,
        x: Math.max(0, rect.x),
        y: Math.max(0, rect.y),
        w: Math.min(rect.width, 480),
        h: Math.min(rect.height, 160),
      });
      continue;
    }
    const { background, foreground } = effectiveBackground(el, fg);
    const ratio = ratioOf(foreground, background);
    if (ratio + 0.05 < min) {
      failures.push({
        id,
        selector: selectorFor(el),
        snippet: snippet.slice(0, 80),
        ratio: ratio.toFixed(2),
        kind: "contrast",
        min,
      });
    }
  }
  const overflow = document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
  return { failures, overflow, scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth };
}`;

async function scrollPage(page) {
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += 500) {
      window.scrollTo(0, y);
      await sleep(40);
    }
    window.scrollTo(0, 0);
    await sleep(80);
  });
}

async function main() {
  let server;
  const base = process.env.BASE_URL || `http://127.0.0.1:${PORT}`;
  if (!process.env.BASE_URL) {
    if (!(await portFree(PORT))) {
      console.error(`Port ${PORT} is in use. Set BASE_URL or stop the other server.`);
      process.exit(1);
    }
    server = startServer();
    await waitForHttp(base);
  }

  const browser = await chromium.launch({ headless: true });
  const rows = [];
  try {
    for (const theme of THEMES) {
      for (const viewport of VIEWPORTS) {
        const context = await browser.newContext({
          viewport: { width: viewport.width, height: viewport.height },
          colorScheme: theme,
        });
        await context.addInitScript((name) => {
          try {
            localStorage.setItem("theme", name);
          } catch {
            /* ignore */
          }
          document.documentElement.classList.toggle("dark", name === "dark");
          document.documentElement.style.colorScheme = name;
        }, theme);
        const page = await context.newPage();
        for (const route of ROUTES) {
          await page.goto(base + route, { waitUntil: "networkidle", timeout: 60000 });
          await page.evaluate((name) => {
            document.documentElement.classList.toggle("dark", name === "dark");
            document.documentElement.style.colorScheme = name;
          }, theme);
          await scrollPage(page);
          const report = await page.evaluate(eval(COLLECT));
          if (report.overflow) {
            rows.push({
              route,
              theme,
              viewport: viewport.name,
              selector: "document",
              snippet: `scrollWidth ${report.scrollWidth} > client ${report.clientWidth}`,
              ratio: "overflow",
            });
          }
          for (const item of report.failures) {
            if (item.kind === "pixels") {
              const box = await page.evaluate((id) => {
                const el = document.querySelector(`[data-theme-check="${id}"]`);
                if (!el) return null;
                el.scrollIntoView({ block: "center", inline: "nearest" });
                const r = el.getBoundingClientRect();
                return { x: r.x, y: r.y, w: r.width, h: r.height };
              }, item.id);
              if (!box || box.w < 2 || box.h < 2) continue;
              const vp = page.viewportSize();
              const x = Math.max(0, Math.min(box.x, vp.width - 2));
              const y = Math.max(0, Math.min(box.y, vp.height - 2));
              const clip = {
                x,
                y,
                width: Math.max(2, Math.min(box.w, vp.width - x)),
                height: Math.max(2, Math.min(box.h, 180, vp.height - y)),
              };
              if (clip.width < 2 || clip.height < 2 || clip.x + clip.width > vp.width + 1 || clip.y + clip.height > vp.height + 1) {
                continue;
              }
              let buffer;
              try {
                buffer = await page.screenshot({ clip, type: "png" });
              } catch {
                continue;
              }
              const png = decodePng(buffer);
              const background = sampleBackground(png);
              const worst = textContrast(png, background);
              if (worst != null && worst + 0.05 < item.min) {
                rows.push({
                  route,
                  theme,
                  viewport: viewport.name,
                  selector: item.selector,
                  snippet: item.snippet,
                  ratio: worst.toFixed(2),
                });
              }
              continue;
            }
            rows.push({
              route,
              theme,
              viewport: viewport.name,
              selector: item.selector,
              snippet: item.snippet,
              ratio: item.ratio,
            });
          }
        }
        await context.close();
      }
    }
  } finally {
    await browser.close();
    if (server) server.kill();
  }

  const header = "| route | theme | viewport | selector | text | ratio |";
  const rule = "| --- | --- | --- | --- | --- | --- |";
  console.log(header);
  console.log(rule);
  if (!rows.length) {
    console.log("| — | — | — | — | no failures | — |");
    process.exit(0);
  }
  for (const row of rows) {
    const cells = [row.route, row.theme, row.viewport, row.selector, row.snippet, row.ratio].map((cell) =>
      String(cell).replace(/\|/g, "\\|").replace(/\n/g, " "),
    );
    console.log(`| ${cells.join(" | ")} |`);
  }
  console.error(`\\n${rows.length} failure(s)`);
  process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
