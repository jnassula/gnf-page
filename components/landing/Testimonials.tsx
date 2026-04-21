"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Aderir ao Grupo deu-nos peso na mesa de negociação com os armazenistas. A diferença aparece no talão da farmácia, mês a mês.",
    author: "Dra. Helena Ramalho",
    role: "Direcção Técnica",
    farmacia: "Farmácia Central de Aveiro",
  },
  {
    quote:
      "A Nossa AI tornou-se uma extensão da equipa. Responde ao balcão em segundos e formou os meus auxiliares sem eu ter de pôr ninguém em sala.",
    author: "Dr. Miguel Antunes",
    role: "Farmacêutico Proprietário",
    farmacia: "Farmácia São Roque, Braga",
  },
  {
    quote:
      "O que nos prendeu não foi o preço — foi perceber que havia gente a pensar no nosso dia-a-dia. O Grupo escuta, itera e devolve.",
    author: "Dra. Teresa Correia",
    role: "Direcção Técnica",
    farmacia: "Farmácia do Rossio, Lisboa",
  },
];

export function Testimonials() {
  return (
    <section
      aria-label="Testemunhos de farmácias associadas"
      className="relative border-t border-border-subtle py-24 md:py-32 bg-surface-sunken"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <span className="type-eyebrow text-primary">Testemunhos</span>
          <h2 className="type-display-2 mt-3 text-foreground">
            Quem já está <span className="font-serif italic font-normal">no Grupo.</span>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.author}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.55,
                delay: i * 0.1,
                ease: [0.22, 0.61, 0.36, 1],
              }}
              className="group relative flex flex-col gap-6 rounded-[var(--radius-xl)] border border-border bg-surface p-7 md:p-8 shadow-[var(--shadow-card)] transition-all duration-[var(--dur-slow)] ease-[var(--ease-out)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)]"
            >
              <Quote
                className="h-6 w-6 text-primary/50 shrink-0"
                aria-hidden="true"
              />
              <blockquote className="font-serif text-[22px] leading-[1.35] text-foreground tracking-[-0.01em]">
                {t.quote}
              </blockquote>
              <figcaption className="mt-auto pt-4 border-t border-border-subtle">
                <div className="type-label text-foreground">{t.author}</div>
                <div className="type-body-sm text-foreground-muted">
                  {t.role}
                </div>
                <div className="type-mono mt-2 text-foreground-subtle">
                  {t.farmacia}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
