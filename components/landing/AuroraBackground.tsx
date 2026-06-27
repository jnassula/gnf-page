import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * AuroraBackground — campo atmosférico de aurora (glassmorphism).
 *
 * Blobs radiais emerald/mint/spring que derivam lentamente em loop (CSS puro,
 * transform/opacity → 60fps, sem custo de JS). Pensado para viver atrás de
 * superfícies `.glass` / `.glass-dark`.
 *
 *  - `variant="page"`   fixo, viewport inteiro, subtil — a atmosfera global.
 *  - `variant="panel"`  absoluto, preenche o contentor pai (hero / CTA).
 *  - `tone="deep"`      escurece a base para vidro escuro + texto branco.
 *
 * Respeita prefers-reduced-motion (animação desligada via globals.css).
 */
export function AuroraBackground({
  variant = "page",
  tone = "light",
  className,
}: {
  variant?: "page" | "panel";
  tone?: "light" | "deep";
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "overflow-hidden",
        variant === "page" ? "fixed inset-0 -z-10" : "absolute inset-0 -z-0",
        tone === "deep" && "bg-ink-950",
        className
      )}
    >
      {tone === "deep" && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.16 0.025 163) 0%, oklch(0.1 0.018 163) 100%)",
          }}
        />
      )}
      <div className={cn("aurora-field", tone === "deep" && "opacity-90")}>
        <span className="aurora-blob aurora-blob-1" />
        <span className="aurora-blob aurora-blob-2" />
        <span className="aurora-blob aurora-blob-3" />
        <span className="aurora-blob aurora-blob-4" />
      </div>
      {/* Véu para garantir contraste do texto sobre a aurora */}
      {tone === "light" ? (
        <div className="absolute inset-0 bg-background/35" />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(80% 60% at 50% 40%, transparent 40%, oklch(0.1 0.018 163 / 0.55) 100%)",
          }}
        />
      )}
      <div className="aurora-grain" />
    </div>
  );
}
