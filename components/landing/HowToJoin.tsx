"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "motion/react";

const steps = [
  {
    title: "Contacto",
    body: "A farmácia envia uma manifestação de interesse. Ligamos no prazo de 48h úteis.",
    duration: "48 horas",
  },
  {
    title: "Avaliação",
    body: "Avaliação conjunta do perfil da farmácia, objectivos, sistemas actuais e expectativas de associação.",
    duration: "1 a 2 semanas",
  },
  {
    title: "Proposta",
    body: "Proposta concreta de adesão: condições comerciais, acesso a plataformas e plano de integração.",
    duration: "1 semana",
  },
  {
    title: "Integração",
    body: "Onboarding técnico, formação da equipa e ligação ao ERP. A farmácia mantém a operação sem interrupções.",
    duration: "2 a 3 semanas",
  },
  {
    title: "Crescer juntos",
    body: "Acompanhamento contínuo, acesso às campanhas do Grupo e evolução partilhada das plataformas.",
    duration: "Continuamente",
  },
];

export function HowToJoin() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 30%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="aderir"
      aria-label="Processo de adesão ao Grupo"
      className="relative border-t border-border-subtle py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <span className="type-eyebrow text-primary">Como aderir</span>
          <h2 className="type-display-2 mt-3 text-foreground">
            Um processo claro <span className="font-serif italic font-normal">e sem pressa.</span>
          </h2>
          <p className="mt-5 type-body-md text-foreground-muted max-w-xl">
            Cinco etapas da primeira conversa ao acompanhamento contínuo.
            Transparentes, com datas realistas — sem contratos que se decifram
            a correr.
          </p>
        </div>

        <div ref={ref} className="relative mt-16">
          <div
            aria-hidden="true"
            className="absolute left-[19px] top-0 bottom-0 w-px bg-border-subtle md:left-1/2 md:-translate-x-1/2"
          />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: lineScale, transformOrigin: "top" }}
            className="absolute left-[19px] top-0 bottom-0 w-px bg-primary md:left-1/2 md:-translate-x-1/2"
          />

          <ol className="relative flex flex-col gap-10 md:gap-14">
            {steps.map((step, i) => {
              const rightSide = i % 2 === 1;
              return (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.55,
                    ease: [0.22, 0.61, 0.36, 1],
                  }}
                  className="relative grid grid-cols-[40px_1fr] md:grid-cols-2 gap-6 items-start"
                >
                  <div className="relative md:col-span-2 md:grid md:grid-cols-2 md:gap-12">
                    <div
                      aria-hidden="true"
                      className="absolute left-[11px] top-1 md:left-1/2 md:-translate-x-1/2 flex h-4 w-4 items-center justify-center"
                    >
                      <span className="h-3 w-3 rounded-full bg-primary shadow-[0_0_0_4px_var(--background)]" />
                    </div>

                    <div
                      className={
                        rightSide
                          ? "md:col-start-2 md:pl-10 pl-10 md:text-left"
                          : "md:text-right md:pr-10 pl-10 md:pl-0"
                      }
                    >
                      <div
                        className={
                          "flex items-baseline gap-3 " +
                          (rightSide
                            ? ""
                            : "md:flex-row-reverse md:justify-start")
                        }
                      >
                        <span className="font-mono text-[13px] text-foreground-subtle tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="type-eyebrow text-primary">
                          {step.duration}
                        </span>
                      </div>
                      <h3 className="type-h3 mt-2 text-foreground">
                        {step.title}
                      </h3>
                      <p className="mt-2 type-body-md text-foreground-muted max-w-md md:max-w-xs md:inline-block">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
