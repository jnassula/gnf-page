"use client";

import * as React from "react";
import { motion } from "motion/react";
import {
  Brain,
  Boxes,
  ShoppingCart,
  Plug,
  Utensils,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Tile {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  feature?: boolean;
  accent?: "emerald" | "ink";
}

const tiles: Tile[] = [
  {
    id: "nossa-ai",
    eyebrow: "Nossa AI",
    title: "O assistente que entende a farmácia.",
    description:
      "Formação contínua, apoio à dispensa, pesquisa em bulas e bases técnicas — tudo em português, treinado com o contexto do Grupo.",
    icon: Brain,
    feature: true,
    accent: "emerald",
  },
  {
    id: "addo-log",
    eyebrow: "Addo Log",
    title: "Portal logístico do Grupo.",
    description:
      "Fornecedores e farmácias na mesma plataforma: catálogos, propostas, encomendas, acompanhamento.",
    icon: Boxes,
  },
  {
    id: "compras",
    eyebrow: "Plataforma de compras",
    title: "Negociação agregada com armazenistas.",
    description:
      "Campanhas, planos de encomenda e condições preferenciais concentradas num só lugar.",
    icon: ShoppingCart,
  },
  {
    id: "erp",
    eyebrow: "Integrações ERP",
    title: "Ligação nativa aos sistemas da farmácia.",
    description:
      "Sifarma, Winphar e outros: a nossa infra-estrutura fala com o ERP que a farmácia já usa.",
    icon: Plug,
  },
  {
    id: "bolt",
    eyebrow: "Parceria Bolt Food",
    title: "eDelivery para farmácias associadas.",
    description:
      "Distribuição ao domicílio, gerida pela Bolt, disponível às farmácias do Grupo sem integração técnica do lado da farmácia.",
    icon: Utensils,
  },
];

export function Ecosystem() {
  return (
    <section
      id="tecnologia"
      aria-label="Ecossistema de tecnologia do Grupo"
      className="relative border-t border-border-subtle py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="max-w-2xl">
            <span className="type-eyebrow text-primary">Tecnologia</span>
            <h2 className="type-display-2 mt-3 text-foreground">
              Plataformas construídas <span className="font-serif italic font-normal">a partir do balcão.</span>
            </h2>
          </div>
          <p className="type-body-md text-foreground-muted max-w-sm">
            A nossa tecnologia não vem de fora. É desenhada com farmácias do
            Grupo, em iteração contínua com quem a usa todos os dias.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-6 auto-rows-[minmax(180px,auto)] gap-4">
          {tiles.map((tile, i) => {
            const isFeature = tile.feature;
            return (
              <motion.article
                key={tile.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.07,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
                className={cn(
                  "group relative overflow-hidden rounded-[var(--radius-xl)] border p-6 md:p-7 flex flex-col gap-4",
                  "transition-all duration-[var(--dur-slow)] ease-[var(--ease-out)]",
                  "hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)]",
                  isFeature
                    ? "md:col-span-4 md:row-span-2 bg-surface-inverse text-foreground-inverse border-transparent"
                    : "md:col-span-2 bg-surface border-border hover:border-border-strong shadow-[var(--shadow-card)]"
                )}
              >
                {isFeature && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none opacity-60"
                    style={{
                      background:
                        "radial-gradient(60% 80% at 100% 0%, oklch(0.66 0.155 163 / 0.45), transparent 60%), radial-gradient(50% 60% at 0% 100%, oklch(0.43 0.105 163 / 0.45), transparent 70%)",
                    }}
                  />
                )}

                <div className="relative flex items-start justify-between">
                  <div
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out)] group-hover:scale-105",
                      isFeature
                        ? "bg-white/10 text-white backdrop-blur"
                        : "bg-primary-soft text-primary"
                    )}
                  >
                    <tile.icon className="h-5 w-5" />
                  </div>
                  <span
                    className={cn(
                      "type-eyebrow",
                      isFeature ? "text-white/70" : "text-foreground-subtle"
                    )}
                  >
                    {tile.eyebrow}
                  </span>
                </div>

                <div className="relative flex flex-col gap-2 mt-auto">
                  <h3
                    className={cn(
                      isFeature ? "type-h2" : "type-h4",
                      isFeature ? "text-white" : "text-foreground",
                      "max-w-[22ch]"
                    )}
                  >
                    {tile.title}
                  </h3>
                  <p
                    className={cn(
                      "type-body-md max-w-[44ch]",
                      isFeature ? "text-white/75" : "text-foreground-muted"
                    )}
                  >
                    {tile.description}
                  </p>

                  {isFeature && (
                    <div className="mt-6 inline-flex items-center gap-1.5 type-label text-white/80 group-hover:text-white transition-colors">
                      Conhecer a Nossa AI
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
