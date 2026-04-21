"use client";

/**
 * Hero2 — variante do Hero com vídeo de farmácia em operação (Mixkit 5407:
 * farmacêutico de bata branca no balcão, caixa registadora, terminal).
 *
 * Wrapper de 4 linhas sobre <Hero/> apontando para /public/hero2/. Mantém o
 * Hero original (aerial) intacto em /public/hero/ — para reverter basta
 * trocar <Hero2 /> por <Hero /> em app/page.tsx.
 */

import { Hero, type HeroProps } from "./Hero";

export function Hero2(props: Omit<HeroProps, "assetBase">) {
  return <Hero {...props} assetBase="/hero2" />;
}
