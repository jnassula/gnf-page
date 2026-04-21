"use client";

import * as React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section
      aria-label="Convite final"
      className="relative isolate overflow-hidden bg-editorial text-foreground-inverse"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 0%, oklch(0.66 0.155 163 / 0.35), transparent 60%), radial-gradient(50% 40% at 10% 100%, oklch(0.43 0.105 163 / 0.3), transparent 70%)",
        }}
      />
      <div className="noise-overlay" style={{ opacity: 0.06 }} />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-28 md:py-40">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
          className="max-w-4xl"
        >
          <span className="type-eyebrow text-emerald-300">
            A sua farmácia, com o Grupo
          </span>
          <h2 className="type-display-xl mt-6 text-white tracking-[-0.035em]">
            Estamos aqui quando <span className="font-serif italic font-normal text-emerald-300">decidir.</span>
          </h2>
          <p className="mt-8 type-body-lg text-white/70 max-w-2xl">
            Sem pressão, sem contratos-surpresa. Uma conversa, uma proposta
            concreta — e a liberdade de decidir no ritmo da sua farmácia.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-3">
            <Button asChild size="xl" className="group">
              <a href="#candidatura">
                Candidatar a farmácia
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button
              asChild
              size="xl"
              variant="ghost"
              className="text-white hover:bg-white/10 hover:text-white"
            >
              <a href="#contactos">Falar com a equipa</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
