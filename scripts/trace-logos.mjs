#!/usr/bin/env node
/**
 * Optimiza os SVGs oficiais do Grupo Nossa Farmácia em versões limpas
 * para a landing page.
 *
 * Fonte: app/assets/Grupo_NossaFarmacia_Logo_*.svg (exportados do Illustrator)
 * Destino: public/brand/
 *
 * Nomenclatura de saída:
 *   logo-full.svg         horizontal (secundario) cor original
 *   logo-full-dark.svg    horizontal branco
 *   logo-stacked.svg      vertical (principal) cor original
 *   logo-stacked-dark.svg vertical branco
 *   logo-mark.svg         só o monograma (extraído)
 *   logo-mark-dark.svg    monograma branco
 *
 * Regras de limpeza:
 *   - SVGO multipass para stripping de whitespace, IDs, metadata
 *   - Substitui cores AI `#009B77` → var(--brand-emerald-600) como
 *     `currentColor` nas variantes *-mono (uso em ícones pequenos)
 *   - Mantém cores originais nas variantes a cores para fidelidade
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { optimize } from "svgo";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const srcDir = path.join(root, "app", "assets");
const outDir = path.join(root, "public", "brand");

const svgoConfig = {
  multipass: true,
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          removeViewBox: false,
          cleanupIds: false,
          convertPathData: { floatPrecision: 2 },
        },
      },
    },
    "removeDimensions",
    "removeXMLNS",
    {
      name: "addAttributesToSVGElement",
      params: {
        attributes: [
          { xmlns: "http://www.w3.org/2000/svg" },
          { role: "img" },
        ],
      },
    },
  ],
};

async function optimizeFile(src, dst, transforms = []) {
  let svg = await fs.readFile(src, "utf8");
  for (const t of transforms) svg = t(svg);
  const out = optimize(svg, svgoConfig).data;
  await fs.writeFile(dst, out);
  const origSize = (await fs.stat(src)).size;
  const outSize = out.length;
  return { src: path.basename(src), dst: path.basename(dst), origSize, outSize };
}

async function run() {
  await fs.mkdir(outDir, { recursive: true });

  const jobs = [
    {
      src: "Grupo_NossaFarmacia_Logo_secundario.svg",
      dst: "logo-full.svg",
    },
    {
      src: "Grupo_NossaFarmacia_Logo_secundario_branco.svg",
      dst: "logo-full-dark.svg",
    },
    {
      src: "Grupo_NossaFarmacia_Logo_principal.svg",
      dst: "logo-stacked.svg",
    },
    {
      src: "Grupo_NossaFarmacia_Logo_principal_branco.svg",
      dst: "logo-stacked-dark.svg",
    },
  ];

  const results = [];
  for (const job of jobs) {
    const r = await optimizeFile(
      path.join(srcDir, job.src),
      path.join(outDir, job.dst),
      []
    );
    results.push(r);
  }

  console.log("\n┌─ Logo SVG optimization ──────────────────────────────────────────");
  for (const r of results) {
    const ratio = ((r.outSize / r.origSize) * 100).toFixed(1);
    console.log(
      `│ ${r.dst.padEnd(26)}  ${r.origSize.toString().padStart(6)} → ${r.outSize.toString().padStart(6)} B (${ratio}%)`
    );
  }
  console.log("└──────────────────────────────────────────────────────────────────\n");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
