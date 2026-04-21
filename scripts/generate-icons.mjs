#!/usr/bin/env node
/**
 * Gera favicon + ícones + Open Graph a partir do logo-mark SVG.
 *
 * Outputs (App Router pick-up):
 *   app/icon.svg          — favicon SVG nativo (servido em /icon.svg)
 *   app/apple-icon.png    — 180x180 com padding, para iOS
 *   app/icon.png          — 512x512 mastro (PWA-friendly)
 *   app/opengraph-image.png — 1200x630 para OG/Twitter, logo centrado
 *
 * Usa sharp (já disponível via deps do Next/dependências transitivas).
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const markSrc = path.join(root, "public", "brand", "logo-mark.svg");
const fullSrc = path.join(root, "public", "brand", "logo-full-dark.svg");
const appDir = path.join(root, "app");

const BRAND_BG = "#009b77"; // emerald-600 (idêntico ao token --brand-emerald-600)
const DARK_BG = "#0a1110"; // ~ink-950

async function svgToPng(src, size, bg, padding = 0.18) {
  const raw = await fs.readFile(src);
  const inner = Math.round(size * (1 - padding));
  const buf = await sharp(raw, { density: 600 })
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: bg,
    },
  })
    .composite([{ input: buf, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

async function og({ width, height, background, markSize = 240 }) {
  const raw = await fs.readFile(markSrc);
  const mark = await sharp(raw, { density: 600 })
    .resize(markSize, markSize, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const textSvg = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0a1110"/>
          <stop offset="100%" stop-color="#13221e"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <text x="80" y="${height - 230}" font-family="DM Sans, system-ui" font-size="30" fill="#6bbfa3" letter-spacing="4">GRUPO NOSSA FARMÁCIA</text>
      <text x="80" y="${height - 150}" font-family="DM Sans, system-ui" font-size="72" font-weight="700" fill="#ffffff" letter-spacing="-2">400 farmácias.</text>
      <text x="80" y="${height - 70}" font-family="Instrument Serif, serif" font-style="italic" font-size="72" fill="#6bbfa3">Uma só voz.</text>
    </svg>
  `);

  return sharp(textSvg)
    .composite([{ input: mark, left: width - markSize - 80, top: 80 }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

async function run() {
  const outputs = [];

  // icon.svg nativo — copiamos o mark directamente
  const markSvg = await fs.readFile(markSrc);
  await fs.writeFile(path.join(appDir, "icon.svg"), markSvg);
  outputs.push(["icon.svg", markSvg.length]);

  // apple-icon 180x180 (com fundo emerald)
  const apple = await svgToPng(markSrc, 180, BRAND_BG, 0.22);
  await fs.writeFile(path.join(appDir, "apple-icon.png"), apple);
  outputs.push(["apple-icon.png", apple.length]);

  // icon.png 512 (mastro PWA)
  const icon512 = await svgToPng(markSrc, 512, BRAND_BG, 0.22);
  await fs.writeFile(path.join(appDir, "icon.png"), icon512);
  outputs.push(["icon.png", icon512.length]);

  // og-image 1200x630 editorial
  const ogImg = await og({ width: 1200, height: 630, markSize: 260 });
  await fs.writeFile(path.join(appDir, "opengraph-image.png"), ogImg);
  outputs.push(["opengraph-image.png", ogImg.length]);

  // twitter-image re-using OG
  await fs.writeFile(path.join(appDir, "twitter-image.png"), ogImg);
  outputs.push(["twitter-image.png", ogImg.length]);

  console.log("\n┌─ Icons generated ─────────────────────────────────────");
  for (const [f, b] of outputs) {
    console.log(`│ app/${f.padEnd(22)}  ${b.toLocaleString().padStart(8)} bytes`);
  }
  console.log("└──────────────────────────────────────────────────────\n");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
