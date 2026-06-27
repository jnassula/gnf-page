"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Play } from "lucide-react";
import { asset } from "@/lib/assetPath";

/**
 * VideoSection — vídeo institucional do Grupo.
 *
 * Padrão "facade": mostra a miniatura + botão de play e só injeta o iframe do
 * YouTube ao clicar (evita carregar ~1MB de JS do player no load inicial).
 * Miniatura oficial guardada em /public/video/poster.jpg.
 *
 * A11y: botão com aria-label; iframe com title; respeita o foco de teclado.
 * Performance: aspect-ratio reservado (sem CLS); poster com lazy load.
 */

const VIDEO_ID = "1x9cvfmSB90";

export function VideoSection() {
  const [active, setActive] = React.useState(false);

  return (
    <section
      id="video"
      aria-label="Vídeo institucional do Grupo"
      className="relative py-24 md:py-32"
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="type-eyebrow text-primary">Vídeo institucional</span>
          <h2 className="type-display-2 mt-3 text-foreground">
            De farmácias para farmácias,{" "}
            <span className="font-serif italic font-normal">de nós para si.</span>
          </h2>
          <p className="mx-auto mt-5 type-body-md text-foreground-muted max-w-xl">
            Em pouco mais de um minuto, conheça o Grupo Nossa Farmácia pela voz
            de quem o constrói — e o que nos move todos os dias.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 0.61, 0.36, 1] }}
          className="glass mt-12 overflow-hidden rounded-[var(--radius-2xl)] p-1.5 shadow-[var(--shadow-glass)]"
        >
          <div className="relative aspect-video overflow-hidden rounded-[var(--radius-xl)] bg-ink-950">
            {active ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                title="Vídeo institucional — Grupo Nossa Farmácia"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            ) : (
              <button
                type="button"
                onClick={() => setActive(true)}
                aria-label="Reproduzir o vídeo institucional do Grupo Nossa Farmácia"
                className="group absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)]"
              >
                <img
                  src={asset("/video/poster.jpg")}
                  alt="Pré-visualização do vídeo institucional do Grupo Nossa Farmácia"
                  width={1280}
                  height={720}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[var(--dur-cinema)] ease-[var(--ease-out)] group-hover:scale-[1.03]"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink-950/55 via-transparent to-ink-950/15"
                />
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-[var(--dur-slow)] ease-[var(--ease-spring)] group-hover:scale-110 md:h-24 md:w-24"
                >
                  <Play className="ml-1 h-8 w-8 fill-current md:h-10 md:w-10" />
                </span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
