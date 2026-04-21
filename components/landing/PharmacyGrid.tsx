"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

const GRID = 20;
const TOTAL = GRID * GRID;

export function PharmacyGrid() {
  const reduceMotion = useReducedMotion();
  const cells = React.useMemo(() => Array.from({ length: TOTAL }), []);

  return (
    <div
      className="relative aspect-square w-full max-w-[540px] mx-auto"
      aria-hidden="true"
    >
      <div className="absolute inset-0 rounded-[var(--radius-2xl)] bg-gradient-to-br from-emerald-50/70 via-transparent to-transparent dark:from-emerald-950/30 pointer-events-none" />

      <div
        className="relative grid h-full w-full p-6"
        style={{
          gridTemplateColumns: `repeat(${GRID}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${GRID}, minmax(0, 1fr))`,
          gap: "2px",
        }}
      >
        {cells.map((_, i) => {
          const row = Math.floor(i / GRID);
          const col = i % GRID;
          const centerDist = Math.hypot(row - GRID / 2, col - GRID / 2);
          const delay = reduceMotion ? 0 : (centerDist / GRID) * 0.9 + 0.1;

          const row1 = row === GRID / 2 - 1 || row === GRID / 2;
          const col1 = col === GRID / 2 - 1 || col === GRID / 2;
          const inCross = row1 || col1;

          return (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: inCross ? 1 : 0.14, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.55,
                delay,
                ease: [0.22, 0.61, 0.36, 1],
              }}
              className="block rounded-[2px]"
              style={{
                backgroundColor: inCross
                  ? "var(--brand-emerald-500)"
                  : "var(--ink-300)",
                boxShadow: inCross
                  ? "0 0 8px var(--brand-emerald-400)"
                  : "none",
              }}
            />
          );
        })}
      </div>

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute inset-x-6 bottom-6 flex items-center justify-between text-[11px] font-mono text-foreground-subtle"
      >
        <span>20 × 20 = 400</span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          farmácias activas
        </span>
      </motion.div>
    </div>
  );
}
