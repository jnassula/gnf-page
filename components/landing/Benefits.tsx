"use client";

import * as React from "react";
import { motion } from "motion/react";
import {
  TrendingDown,
  Cpu,
  Megaphone,
  GraduationCap,
  Truck,
  Users,
} from "lucide-react";

const benefits = [
  {
    icon: TrendingDown,
    title: "Poder de compra",
    body: "Negociação conjunta com armazenistas e laboratórios, com campanhas exclusivas para associadas.",
  },
  {
    icon: Cpu,
    title: "Tecnologia",
    body: "Acesso a Nossa AI, Addo Log e integrações com o ERP — sem custos adicionais de implementação.",
  },
  {
    icon: Megaphone,
    title: "Marketing",
    body: "Materiais de montra, comunicação digital e campanhas de marca, adaptáveis à identidade de cada farmácia.",
  },
  {
    icon: GraduationCap,
    title: "Formação",
    body: "Programa contínuo para farmacêuticos e equipa de atendimento, em formato online e presencial.",
  },
  {
    icon: Truck,
    title: "Logística",
    body: "Plano de encomendas inteligente, alertas de rutura e parcerias de distribuição como a Bolt Food.",
  },
  {
    icon: Users,
    title: "Comunidade",
    body: "Encontros regulares, grupos de trabalho e uma rede de pares com quem se fala todos os dias.",
  },
];

export function Benefits() {
  return (
    <section
      id="vantagens"
      aria-label="Vantagens de aderir ao Grupo"
      className="relative border-t border-border-subtle py-24 md:py-32 bg-surface-sunken"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <span className="type-eyebrow text-primary">Vantagens</span>
          <h2 className="type-display-2 mt-3 text-foreground">
            Seis boas razões <span className="font-serif italic font-normal">para se juntar.</span>
          </h2>
          <p className="mt-5 type-body-md text-foreground-muted max-w-xl">
            O que entregamos às farmácias associadas — sem letras pequenas,
            sem contratos de fidelidade surpresa.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map((b, i) => (
            <motion.li
              key={b.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.55,
                delay: (i % 3) * 0.08,
                ease: [0.22, 0.61, 0.36, 1],
              }}
              className="group relative overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface p-6 transition-all duration-[var(--dur-slow)] ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[var(--shadow-md)]"
            >
              <span
                aria-hidden="true"
                className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary-soft opacity-0 blur-2xl transition-opacity duration-[var(--dur-slow)] group-hover:opacity-100"
              />
              <div className="relative flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-primary-soft text-primary transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out)] group-hover:scale-105 group-hover:rotate-[-3deg]">
                    <b.icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-[11px] text-foreground-subtle tabular-nums">
                    0{i + 1}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="type-h4 text-foreground">{b.title}</h3>
                  <p className="type-body-sm text-foreground-muted">{b.body}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
