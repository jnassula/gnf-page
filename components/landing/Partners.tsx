"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { asset } from "@/lib/assetPath";

/**
 * Partners — prova social: carrossel infinito (marquee) com as logos dos
 * parceiros do Grupo (laboratórios e fornecedores).
 *
 * Logos oficiais descarregadas de grupo.nossafarmacia.pt (secção "Nossos
 * Parceiros") para /public/partners/. JPEGs 200×100 com fundo branco →
 * apresentados em tiles de vidro branco para integração no tema aurora glass.
 *
 *  - Duas faixas em sentidos opostos, scroll contínuo (CSS transform, 60fps).
 *  - Pausa em hover/focus; fade nas bordas via mask.
 *  - prefers-reduced-motion → grelha estática responsiva (sem auto-scroll).
 */

interface Partner {
  name: string;
  file: string;
}

const partners: Partner[] = [
  { name: "Arkopharma", file: "Arkopharma" },
  { name: "Atral Cipan", file: "AtralCipan" },
  { name: "Bausch + Lomb", file: "BauschLomb" },
  { name: "Bial", file: "Bial" },
  { name: "Boiron", file: "Boiron" },
  { name: "Ciclum / Stada", file: "CiclumStada" },
  { name: "Edol", file: "Edol" },
  { name: "Gedeon Richter", file: "GedeonRichter" },
  { name: "Generis", file: "Generis" },
  { name: "GSK", file: "GSK" },
  { name: "KRKA", file: "KRKA" },
  { name: "Laboratórios Vitória", file: "LaboratoriosVitoria" },
  { name: "Medinfar", file: "Medinfar" },
  { name: "P&G", file: "P_G" },
  { name: "Perrigo", file: "Perrigo" },
  { name: "Pfizer", file: "Pfizer" },
  { name: "PharmaKern", file: "PharmaKern" },
  { name: "Phytoderm", file: "Phytoderm" },
  { name: "Reckitt Benckiser", file: "ReckittBenckiser" },
  { name: "Sandoz", file: "Sandoz" },
  { name: "Sanofi", file: "Sanofi" },
  { name: "Tecnimede", file: "Tecnimede" },
  { name: "Teva", file: "Teva" },
  { name: "ToLife", file: "ToLife" },
  { name: "Uriach", file: "Uriach" },
  { name: "Viatris", file: "Viatris" },
];

function LogoTile({ partner }: { partner: Partner }) {
  return (
    <div className="glass mx-2 flex h-20 w-40 shrink-0 items-center justify-center rounded-[var(--radius-lg)] px-5 sm:h-24 sm:w-48">
      <img
        src={asset(`/partners/${partner.file}.jpg`)}
        alt={partner.name}
        width={120}
        height={60}
        loading="lazy"
        decoding="async"
        className="h-auto max-h-12 w-auto max-w-full object-contain opacity-80 mix-blend-multiply grayscale-[0.25] transition-[filter,opacity] duration-[var(--dur-slow)] ease-[var(--ease-out)] hover:opacity-100 hover:grayscale-0"
      />
    </div>
  );
}

function MarqueeRow({
  items,
  reverse,
  duration,
}: {
  items: Partner[];
  reverse?: boolean;
  duration: string;
}) {
  return (
    <div className="marquee py-1.5">
      <div
        className={`marquee-track ${reverse ? "is-reverse" : ""}`}
        style={{ "--marquee-dur": duration } as React.CSSProperties}
      >
        {/* duplicado para loop contínuo; cópia é decorativa p/ leitores de ecrã */}
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="flex"
            aria-hidden={copy === 1 ? "true" : undefined}
          >
            {items.map((p) => (
              <li key={`${copy}-${p.file}`}>
                <LogoTile partner={p} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function Partners() {
  const reduce = useReducedMotion();
  const half = Math.ceil(partners.length / 2);
  const rowA = partners.slice(0, half);
  const rowB = partners.slice(half);

  return (
    <section
      id="parceiros"
      aria-label="Parceiros do Grupo"
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          className="max-w-2xl"
        >
          <span className="type-eyebrow text-primary">Parceiros</span>
          <h2 className="type-display-2 mt-3 text-foreground">
            Marcas que caminham{" "}
            <span className="font-serif italic font-normal">connosco.</span>
          </h2>
          <p className="mt-5 type-body-md text-foreground-muted max-w-xl">
            Laboratórios e fornecedores de referência que negoceiam com o Grupo
            — e que chegam, através de nós, a cerca de 400 farmácias em Portugal.
          </p>
        </motion.div>
      </div>

      {reduce ? (
        // Fallback estático para prefers-reduced-motion
        <ul className="mx-auto mt-14 grid max-w-7xl grid-cols-2 gap-3 px-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:px-10">
          {partners.map((p) => (
            <li key={p.file}>
              <div className="glass flex h-24 items-center justify-center rounded-[var(--radius-lg)] px-5">
                <img
                  src={asset(`/partners/${p.file}.jpg`)}
                  alt={p.name}
                  width={120}
                  height={60}
                  loading="lazy"
                  decoding="async"
                  className="h-auto max-h-12 w-auto max-w-full object-contain mix-blend-multiply"
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-14 flex flex-col gap-3">
          <MarqueeRow items={rowA} duration="52s" />
          <MarqueeRow items={rowB} reverse duration="46s" />
        </div>
      )}
    </section>
  );
}
