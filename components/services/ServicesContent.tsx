"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Briefcase,
  BarChart3,
  Megaphone,
  GraduationCap,
  Salad,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuroraBackground } from "@/components/landing/AuroraBackground";
import { asset } from "@/lib/assetPath";

const EASE = [0.22, 0.61, 0.36, 1] as const;

interface Service {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
  image: string;
  alt: string;
  featured?: boolean;
}

const services: Service[] = [
  {
    icon: Briefcase,
    title: "Consultoria Comercial e Apoio à Gestão",
    body: "Acompanhamento especializado das farmácias com foco em análise de portefólio, gestão de compras e dinamização do ponto de venda. Os consultores agendam reuniões mensais personalizadas, conforme os objetivos e necessidades de cada farmácia.",
    image: "/services/consultoria.jpg",
    alt: "Consultor e responsável de farmácia a analisar relatórios e gráficos numa reunião.",
    featured: true,
  },
  {
    icon: BarChart3,
    title: "Analytics — Relatórios de Negócio",
    body: "O Nossa Farmácia Analytics transforma e modela os dados da farmácia em relatórios de gestão claros. Self-service, com tecnologias modernas e acessível em computador, tablet ou smartphone.",
    image: "/services/analytics.jpg",
    alt: "Portátil a mostrar um painel de analytics com gráficos de negócio.",
  },
  {
    icon: Megaphone,
    title: "Marketing de Valor Acrescentado",
    body: "Equipa especializada com enfoque em dermocosmética e OTC. Parcerias estratégicas que trazem melhores condições e ferramentas para alavancar o negócio da farmácia.",
    image: "/services/marketing.jpg",
    alt: "Produtos de dermocosmética dispostos sobre uma superfície de mármore.",
  },
  {
    icon: GraduationCap,
    title: "JUMP Academy",
    body: "Academia de Recursos Humanos dedicada ao desenvolvimento de talentos: mentoria, avaliação de potencial e planos integrados de desenvolvimento, com desafios de carreira para os colaboradores.",
    image: "/services/academy.jpg",
    alt: "Sessão de formação em equipa, com uma formadora junto a um quadro.",
  },
  {
    icon: Salad,
    title: "Nutrição Clínica",
    body: "Consultas presenciais e online de nutrição para saúde e bem-estar, com parcerias entre indústria e farmácias e produção de conteúdos para redes sociais e marketing.",
    image: "/services/nutricao.jpg",
    alt: "Várias refeições saudáveis com legumes e cereais dispostas numa mesa.",
  },
];

export function ServicesContent() {
  return (
    <>
      {/* HERO */}
      <section
        id="top"
        aria-label="Nossos Serviços"
        className="relative isolate flex min-h-[68svh] items-center overflow-hidden"
      >
        <AuroraBackground variant="panel" tone="deep" />

        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-16 pt-36 text-center lg:px-10">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="type-eyebrow text-emerald-200"
          >
            Nossos Serviços
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06, ease: EASE }}
            className="type-display-2 mt-5 text-white"
          >
            Serviços que dão{" "}
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-[linear-gradient(120deg,var(--accent-mint),var(--brand-emerald-400)_60%,var(--accent-spring))]">
              vantagem competitiva.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
            className="mx-auto mt-6 max-w-2xl type-body-lg text-white/75"
          >
            Acreditamos que serviços diferenciados e inovadores fidelizam os
            utentes, atraem novos e potenciam o crescimento do negócio — tornando
            cada farmácia mais competitiva num mercado em constante mudança.
          </motion.p>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section aria-label="Lista de serviços" className="relative py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {services.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: (i % 2) * 0.08, ease: EASE }}
                className={`glass group relative flex flex-col overflow-hidden rounded-[var(--radius-2xl)] transition-all duration-[var(--dur-slow)] ease-[var(--ease-out)] hover:-translate-y-1 ${
                  s.featured ? "md:col-span-2" : ""
                }`}
              >
                {/* Banner de imagem */}
                <div
                  className={`relative overflow-hidden ${
                    s.featured ? "aspect-[16/10] md:aspect-[5/2]" : "aspect-[16/10]"
                  }`}
                >
                  <img
                    src={asset(s.image)}
                    alt={s.alt}
                    width={1100}
                    height={s.featured ? 440 : 688}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[var(--dur-cinema)] ease-[var(--ease-out)] group-hover:scale-[1.04]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink-950/35 to-transparent"
                  />
                  <span className="absolute right-4 top-4 rounded-[var(--radius-full)] bg-ink-950/55 px-2.5 py-1 font-mono text-[11px] tabular-nums text-white backdrop-blur">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Conteúdo */}
                <div className="flex flex-col gap-3 p-7 md:p-8">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-primary-soft text-primary transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out)] group-hover:scale-105"
                    >
                      <s.icon className="h-5 w-5" />
                    </span>
                    <h2 className="type-h3 text-foreground">{s.title}</h2>
                  </div>
                  <p className="type-body-md text-foreground-muted max-w-2xl">
                    {s.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section
        aria-label="Convite para aderir"
        className="relative isolate overflow-hidden text-foreground-inverse"
      >
        <AuroraBackground variant="panel" tone="deep" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:py-32 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="max-w-3xl"
          >
            <span className="type-eyebrow text-emerald-300">
              Estes serviços, na sua farmácia
            </span>
            <h2 className="type-display-2 mt-5 text-white">
              Quanto vale ter o Grupo{" "}
              <span className="font-serif italic font-normal text-emerald-300">
                ao seu lado?
              </span>
            </h2>
            <p className="mt-6 max-w-2xl type-body-lg text-white/70">
              Fale connosco e descubra como estes serviços se adaptam à realidade
              da sua farmácia — sem compromisso.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="xl" className="group rounded-[var(--radius-full)]">
                <Link href="/#candidatura">
                  Quero aderir
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button
                asChild
                size="xl"
                variant="ghost"
                className="rounded-[var(--radius-full)] border border-white/15 text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/#contactos">
                  Falar com a equipa
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
