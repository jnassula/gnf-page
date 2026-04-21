"use client";

import * as React from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from "motion/react";

interface Stat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  detail: string;
}

const stats: Stat[] = [
  {
    label: "Farmácias",
    value: 400,
    suffix: "+",
    detail: "Associadas, de norte a sul de Portugal.",
  },
  {
    label: "Anos",
    value: 12,
    detail: "A construir um grupo de farmácias moderno e independente.",
  },
  {
    label: "Colaboradores",
    value: 35,
    detail: "Equipa central dedicada às farmácias e aos fornecedores.",
  },
  {
    label: "Parcerias",
    value: 60,
    suffix: "+",
    detail: "Armazenistas, laboratórios e parceiros estratégicos.",
  },
];

function Counter({ value, suffix, prefix }: Pick<Stat, "value" | "suffix" | "prefix">) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v).toString());
  const [display, setDisplay] = React.useState("0");

  React.useEffect(() => {
    const unsub = rounded.on("change", setDisplay);
    return () => unsub();
  }, [rounded]);

  React.useEffect(() => {
    if (!inView) return;
    if (reduce) {
      motionValue.set(value);
      return;
    }
    const controls = animate(motionValue, value, {
      duration: 1.6,
      ease: [0.22, 0.61, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, value, motionValue, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section
      id="numeros"
      aria-label="Números do Grupo Nossa Farmácia"
      className="relative border-t border-border-subtle py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="max-w-2xl">
            <span className="type-eyebrow text-primary">Em números</span>
            <h2 className="type-h2 mt-3 text-foreground">
              Uma história que se conta <span className="font-serif italic font-normal">em escala.</span>
            </h2>
          </div>
          <p className="type-body-md text-foreground-muted max-w-sm">
            Os números contam apenas parte da história. O resto acontece no
            balcão, todos os dias, em cada farmácia associada.
          </p>
        </div>

        <dl className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.22, 0.61, 0.36, 1],
              }}
              className="flex flex-col gap-3 border-l border-border-subtle pl-6 md:pl-8"
            >
              <dt className="type-eyebrow text-foreground-subtle">
                {stat.label}
              </dt>
              <dd className="flex flex-col gap-2">
                <span className="font-semibold tracking-[-0.03em] text-[clamp(2.5rem,5vw,4.25rem)] leading-none text-foreground">
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                  />
                </span>
                <span className="type-body-sm text-foreground-muted">
                  {stat.detail}
                </span>
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
