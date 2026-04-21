import * as React from "react";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/assetPath";

/**
 * Logo Grupo Nossa Farmácia — SVG inline, vectorial.
 *
 * Ficheiros fonte em /public/brand/ (optimizados via SVGO):
 *   - logo-full.svg            horizontal cor (fundo claro)
 *   - logo-full-dark.svg       horizontal branco (fundo escuro)
 *   - logo-stacked.svg         vertical cor (mark em cima)
 *   - logo-stacked-dark.svg    vertical branco
 *   - logo-mark.svg            monograma (cruz facetada) cor
 *   - logo-mark-dark.svg       monograma branco
 *
 * O componente inline o SVG em JSX (sem <img>) para permitir animação
 * path-a-path, currentColor e ausência de request HTTP adicional.
 */

export type LogoVariant = "full" | "stacked" | "mark";
export type LogoTheme = "light" | "dark" | "auto";

interface LogoProps extends React.SVGAttributes<SVGSVGElement> {
  variant?: LogoVariant;
  theme?: LogoTheme;
  /**
   * Altura renderizada. A largura é calculada a partir do viewBox para
   * preservar o rácio e evitar layout shift.
   */
  height?: number;
  className?: string;
  title?: string;
}

// Dimensões reais dos viewBox (dos SVGs oficiais do Illustrator).
const dims = {
  full: { vb: "0 0 1920 500", w: 1920, h: 500 },
  stacked: { vb: "0 0 1920 1250", w: 1920, h: 1250 },
  mark: { vb: "60 97.8 203.2 203.2", w: 203.2, h: 203.2 },
} as const;

// Tons do mark (coerentes com os tokens NF DS emerald).
const lightFills = {
  base: "#009b77", // ~emerald-600
  light: "#6bbfa3", // ~emerald-300
  dark: "#00624a", // ~emerald-800
  ink: "#48676b", // ink-muted usado em "FARMÁCIA"
};

const darkFills = {
  base: "#ffffff",
  light: "rgba(255,255,255,0.7)",
  dark: "rgba(255,255,255,0.4)",
  ink: "#ffffff",
};

function useResolvedTheme(theme: LogoTheme): "light" | "dark" {
  if (theme !== "auto") return theme;
  if (typeof window === "undefined") return "light";
  const isDark = document.documentElement.classList.contains("dark");
  return isDark ? "dark" : "light";
}

/**
 * Versão "full" e "stacked": inlinamos os paths exactos dos SVGs
 * exportados, usando classes CSS para colorir. Em vez de repetir ~6 KB
 * de path aqui dentro, pedimos o SVG via <img> quando theme é explícito,
 * para mantermos o bundle leve. Para o mark (cruz) inlinamos — é ≤1 KB
 * e é ele que beneficia da animação path-a-path no Hero.
 */
export function Logo({
  variant = "full",
  theme = "auto",
  height,
  className,
  title = "Grupo Nossa Farmácia",
  ...rest
}: LogoProps) {
  if (variant === "mark") {
    return (
      <LogoMark
        theme={theme}
        height={height}
        className={className}
        title={title}
        {...rest}
      />
    );
  }

  // Para lockups "full" e "stacked" usamos <img> com o SVG do disco.
  // Não beneficiamos de currentColor aqui, mas as variantes dark/light
  // já existem como ficheiros separados.
  const src = resolveLockupSrc(variant, theme);
  const d = dims[variant];
  const computedHeight = height ?? (variant === "full" ? 32 : 64);
  const computedWidth = (d.w / d.h) * computedHeight;

  return (
    <img
      src={src}
      alt={title}
      width={computedWidth}
      height={computedHeight}
      className={cn("block select-none", className)}
      draggable={false}
      style={{
        width: computedWidth,
        height: computedHeight,
      }}
      {...(rest as React.ImgHTMLAttributes<HTMLImageElement>)}
    />
  );
}

function resolveLockupSrc(
  variant: "full" | "stacked",
  theme: LogoTheme
): string {
  const base = variant === "full" ? "/brand/logo-full" : "/brand/logo-stacked";
  if (theme === "dark") return asset(`${base}-dark.svg`);
  if (theme === "light") return asset(`${base}.svg`);
  // auto: cor por defeito (light context); dark mode via <picture> no futuro.
  return asset(`${base}.svg`);
}

/**
 * Mark inline — 12 facetas triangulares formando a cruz.
 * Cada grupo (light / base / dark) é animável individualmente no Hero
 * (strokeDasharray, opacity, scale por path).
 */
export function LogoMark({
  theme = "auto",
  height = 40,
  className,
  title = "Nossa Farmácia",
  animate = false,
  ...rest
}: LogoProps & { animate?: boolean }) {
  const resolved = useResolvedTheme(theme);
  const fills = resolved === "dark" ? darkFills : lightFills;
  const d = dims.mark;
  const computedWidth = (d.w / d.h) * height;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={d.vb}
      role="img"
      aria-label={title}
      width={computedWidth}
      height={height}
      className={cn("block", className)}
      {...rest}
    >
      <title>{title}</title>
      <g fill={fills.base} data-layer="base">
        <path d="m111.7 97.8 49.9 51.6 54-51.6z" />
        <path d="M60 249.2v-104l51.7 54.1z" />
        <path d="M211.5 300.9H107.6l54-51.7z" />
        <path d="M263.2 149.4v104l-51.6-54.1z" />
      </g>
      <g fill={fills.light} data-layer="light">
        <path d="M111.6 97.8v101.6l49.9-50z" />
        <path d="m161.6 249.2-49.9-49.9L60 249.2z" />
        <path d="m211.5 199.3-49.9 49.9 49.9 51.7z" />
        <path d="m161.6 149.4 50 49.9 51.6-49.9z" />
      </g>
      <g fill={fills.dark} data-layer="dark">
        <path d="m215.6 97.8-54 51.6h54z" />
        <path d="M111.7 199.3v-54.1H60z" />
        <path d="M161.6 249.2h-54.1v51.7z" />
        <path d="M211.6 199.3v54.1h51.6z" />
      </g>
    </svg>
  );
}
