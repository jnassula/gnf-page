"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuroraBackground } from "./AuroraBackground";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const headline = ["400", "farmácias."];

const chips = [
  { value: "≈400", label: "Farmácias associadas" },
  { value: "2012", label: "Ano de fundação" },
  { value: "PT", label: "De norte a sul" },
];

export function HeroAurora() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.07, delayChildren: 0.1 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  return (
    <section
      id="top"
      aria-label="Grupo Nossa Farmácia"
      className="relative isolate flex min-h-dvh items-center overflow-hidden"
    >
      <AuroraBackground variant="panel" tone="deep" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-32 lg:px-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-4xl text-center"
        >
          <h1 className="type-display-xl text-white">
            <motion.span variants={item} className="block">
              {headline.join(" ")}
            </motion.span>
            <motion.span variants={item} className="block">
              <span className="font-serif italic font-normal text-transparent bg-clip-text bg-[linear-gradient(120deg,var(--accent-mint),var(--brand-emerald-400)_60%,var(--accent-spring))]">
                Uma só voz.
              </span>
            </motion.span>
          </h1>

          <motion.p
            variants={item}
            className="mx-auto mt-7 max-w-2xl type-body-lg text-white/75"
          >
            O maior grupo de farmácias independentes de Portugal — com
            tecnologia própria, poder de compra agregado e{" "}
            <span className="text-white">autonomia intacta.</span>
          </motion.p>

          <motion.div
            variants={item}
            className="mx-auto mt-10 flex w-[80vw] flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-center"
          >
            <Button
              asChild
              size="xl"
              className="group w-full rounded-[var(--radius-full)] sm:w-auto"
            >
              <a href="#candidatura">
                Quero aderir
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button
              asChild
              size="xl"
              variant="ghost"
              className="w-full rounded-[var(--radius-full)] border border-white/15 text-white hover:bg-white/10 hover:text-white sm:w-auto"
            >
              <a href="#grupo">Conhecer o Grupo</a>
            </Button>
          </motion.div>

          {/* Stat chips em vidro */}
          <motion.dl
            variants={item}
            className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-3"
          >
            {chips.map((c) => (
              <div
                key={c.label}
                className="glass-dark flex flex-col items-center gap-1 rounded-[var(--radius-xl)] px-3 py-5"
              >
                <dd className="font-mono text-[clamp(1.5rem,3.5vw,2.25rem)] font-medium tabular-nums leading-none text-white">
                  {c.value}
                </dd>
                <dt className="type-body-xs text-center text-white/65">
                  {c.label}
                </dt>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>

      {/* Pista de scroll */}
      <a
        href="#numeros"
        aria-label="Desça para explorar"
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 transition-colors hover:text-white sm:flex"
      >
        <span className="type-eyebrow flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" /> Explorar a rede
        </span>
        <motion.span
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="glass-dark inline-flex h-8 w-8 items-center justify-center rounded-full"
        >
          <ArrowDown className="h-3.5 w-3.5" />
        </motion.span>
      </a>
    </section>
  );
}
