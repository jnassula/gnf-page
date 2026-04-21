"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Compass, HeartHandshake, Sparkles } from "lucide-react";

const pillars = [
  {
    icon: Compass,
    title: "Independência com escala",
    body: "Cada farmácia mantém a sua identidade e a relação com a sua comunidade. O Grupo só entra onde a escala traz vantagem — negociação, tecnologia, formação.",
  },
  {
    icon: HeartHandshake,
    title: "Parceria, não franchising",
    body: "Não pintamos montras nem impomos modelos de gestão. Partilhamos poder de compra, boas práticas e infra-estrutura digital com quem decide aderir.",
  },
  {
    icon: Sparkles,
    title: "Tecnologia própria",
    body: "Nossa AI, Addo Log e integrações com os ERPs do mercado. Construímos as ferramentas que faltavam, porque as melhores soluções vêm de quem conhece o balcão.",
  },
];

export function About() {
  return (
    <section
      id="grupo"
      aria-label="Sobre o Grupo"
      className="relative border-t border-border-subtle py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <span className="type-eyebrow text-primary">O Grupo</span>
              <h2 className="type-display-2 mt-4 text-foreground">
                Uma rede de farmácias <span className="font-serif italic font-normal">que se pertence.</span>
              </h2>
              <p className="mt-6 type-body-lg text-foreground-muted max-w-md">
                O Grupo Nossa Farmácia nasceu em 2012 da vontade de farmácias
                independentes portuguesas ganharem peso sem perder autonomia.
                Hoje somos quase 400 — e continuamos fiéis ao que nos fez
                começar.
              </p>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <ul className="flex flex-col gap-6">
              {pillars.map((p, i) => (
                <motion.li
                  key={p.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.1,
                    ease: [0.22, 0.61, 0.36, 1],
                  }}
                  className="group relative flex gap-5 rounded-[var(--radius-xl)] border border-border bg-surface p-6 md:p-7 shadow-[var(--shadow-card)] transition-all duration-[var(--dur-slow)] ease-[var(--ease-out)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)] hover:border-border-strong"
                >
                  <div className="shrink-0">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-primary-soft text-primary transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out)] group-hover:scale-105">
                      <p.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="type-h4 text-foreground">{p.title}</h3>
                    <p className="type-body-md text-foreground-muted">
                      {p.body}
                    </p>
                  </div>
                  <span className="absolute right-6 top-6 font-mono text-[11px] text-foreground-subtle tabular-nums">
                    0{i + 1}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
