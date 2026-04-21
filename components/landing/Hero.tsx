"use client";

import * as React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  MotionValue,
} from "motion/react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/brand/Logo";
import { asset } from "@/lib/assetPath";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const headlineIntro = ["400", "farmácias.", "Uma", "só"];
const taglineIntro =
  "O maior grupo de farmácias independentes de Portugal — com tecnologia própria, poder de compra agregado e";

export interface HeroProps {
  /**
   * Pasta em /public/ com os assets de vídeo (`hero-desktop.webm/.mp4`,
   * `hero-mobile.mp4`, `hero-poster.jpg`). Permite múltiplas variantes
   * (aerial vs farmácia) sem tocar no componente.
   */
  assetBase?: string;
}

export function Hero({ assetBase: assetBaseProp = "/hero" }: HeroProps = {}) {
  const assetBase = asset(assetBaseProp);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [playVideo, setPlayVideo] = React.useState(false);

  React.useEffect(() => {
    if (reduceMotion) return;
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    };
    const conn = nav.connection;
    const slow =
      conn?.saveData === true ||
      (conn?.effectiveType && /^(slow-2g|2g|3g)$/.test(conn.effectiveType));
    if (!slow) setPlayVideo(true);
  }, [reduceMotion]);

  if (reduceMotion) {
    return <HeroStatic assetBase={assetBase} />;
  }

  return (
    <HeroCinematic
      containerRef={containerRef}
      playVideo={playVideo}
      assetBase={assetBase}
    />
  );
}

function HeroCinematic({
  containerRef,
  playVideo,
  assetBase,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  playVideo: boolean;
  assetBase: string;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Video: starts zoomed-in, normaliza no scroll
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  // Overlay: escurece → clareia um pouco → escurece no final para transição
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.85, 1],
    [0.5, 0.35, 0.25, 0.5, 0.85]
  );

  // Stage 1 — Headline
  const headlineOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 0.32],
    [1, 1, 0]
  );
  const headlineY = useTransform(
    scrollYProgress,
    [0, 0.32],
    ["0%", "-20%"]
  );

  // Stage 2 — Tagline + CTAs
  const taglineOpacity = useTransform(
    scrollYProgress,
    [0.28, 0.4, 0.6, 0.72],
    [0, 1, 1, 0]
  );
  const taglineY = useTransform(
    scrollYProgress,
    [0.28, 0.4, 0.6, 0.72],
    ["20%", "0%", "0%", "-20%"]
  );

  // Stage 3 — Floating stats (with different parallax speeds)
  const statsOpacity = useTransform(
    scrollYProgress,
    [0.55, 0.66, 0.88, 0.98],
    [0, 1, 1, 0]
  );
  const statLeftY = useTransform(
    scrollYProgress,
    [0.55, 0.98],
    ["40%", "-60%"]
  );
  const statRightY = useTransform(
    scrollYProgress,
    [0.55, 0.98],
    ["25%", "-30%"]
  );

  // Monogram: fica "docked" no canto topo-direito, subtilmente cresce no final
  const markScale = useTransform(scrollYProgress, [0.8, 1], [1, 1.35]);
  const markOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.75, 0.92, 1],
    [0, 0.42, 0.42, 0.9, 0]
  );

  // Scroll hint fades quickly
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  return (
    <section
      id="top"
      ref={containerRef}
      aria-label="Grupo Nossa Farmácia"
      className="relative h-[220vh] w-full"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-ink-950">
        <motion.div
          className="absolute inset-0"
          style={{ scale: videoScale }}
          aria-hidden="true"
        >
          {playVideo ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={`${assetBase}/hero-poster.jpg`}
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source
                src={`${assetBase}/hero-desktop.webm`}
                type="video/webm"
                media="(min-width: 768px)"
              />
              <source
                src={`${assetBase}/hero-desktop.mp4`}
                type="video/mp4"
                media="(min-width: 768px)"
              />
              <source src={`${assetBase}/hero-mobile.mp4`} type="video/mp4" />
            </video>
          ) : (
            // Fallback quando JS detecta ligação lenta ou save-data
            <img
              src={`${assetBase}/hero-poster.jpg`}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </motion.div>

        <motion.div
          className="absolute inset-0 bg-ink-950"
          style={{ opacity: overlayOpacity }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(70% 55% at 50% 55%, transparent 35%, rgba(10,17,16,0.55) 85%), linear-gradient(180deg, rgba(10,17,16,0.6) 0%, transparent 35%, transparent 65%, rgba(10,17,16,0.7) 100%)",
          }}
        />
        <div className="noise-overlay" style={{ opacity: 0.05 }} />

        {/* Monogram docked top-right */}
        <motion.div
          className="absolute top-20 md:top-24 right-6 md:right-10 z-10"
          style={{ scale: markScale, opacity: markOpacity }}
          aria-hidden="true"
        >
          <LogoMark theme="dark" height={56} />
        </motion.div>

        {/* Stage 1 — Headline */}
        <motion.div
          style={{ opacity: headlineOpacity, y: headlineY }}
          className="absolute inset-0 flex items-center justify-center px-6 lg:px-10"
        >
          <div className="max-w-5xl text-center">
            <span className="type-eyebrow text-emerald-300/90">
              Grupo Nossa Farmácia · desde 2012
            </span>
            <h1 className="type-display-xl mt-6 text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.4)]">
              <span className="block">
                {headlineIntro.map((w, i) => (
                  <motion.span
                    key={`${w}-${i}`}
                    initial={{ y: "70%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{
                      duration: 0.95,
                      delay: 0.65 + i * 0.08,
                      ease: EASE,
                    }}
                    className="inline-block mr-[0.22em] will-change-transform"
                  >
                    {w}
                  </motion.span>
                ))}
              </span>
              <span className="block overflow-hidden pb-2">
                <motion.span
                  initial={{ y: "70%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 1, delay: 1.0, ease: EASE }}
                  className="inline-block font-serif italic font-normal text-emerald-300 will-change-transform"
                >
                  voz.
                </motion.span>
              </span>
            </h1>
          </div>
        </motion.div>

        {/* Stage 2 — Tagline + CTAs */}
        <motion.div
          style={{ opacity: taglineOpacity, y: taglineY }}
          className="absolute inset-0 flex items-center justify-center px-6 lg:px-10"
        >
          <div className="max-w-3xl text-center">
            <p className="type-h2 text-white/95">
              {taglineIntro}{" "}
              <span className="font-serif italic font-normal text-emerald-300">
                autonomia intacta.
              </span>
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="xl" className="group">
                <a href="#candidatura">
                  Quero aderir
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </Button>
              <Button
                asChild
                size="xl"
                variant="ghost"
                className="text-white border border-white/15 hover:bg-white/10 hover:text-white"
              >
                <a href="#grupo">Conhecer o Grupo</a>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stage 3 — Floating stats (parallax) */}
        <motion.div
          style={{ opacity: statsOpacity }}
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <FloatingStat
            y={statLeftY}
            position="left"
            eyebrow="Associadas"
            value="≈400"
            caption="farmácias independentes em Portugal."
          />
          <FloatingStat
            y={statRightY}
            position="right"
            eyebrow="Desde"
            value="2012"
            caption="doze anos a construir grupo."
          />
        </motion.div>

        {/* Scroll hint */}
        <motion.a
          href="#numeros"
          aria-label="Desça para explorar"
          style={{ opacity: hintOpacity }}
          className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/75 hover:text-white transition-colors"
        >
          <span className="type-eyebrow">Desça para explorar</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/30 bg-white/5 backdrop-blur"
          >
            <ArrowDown className="h-3.5 w-3.5" />
          </motion.span>
        </motion.a>
      </div>
    </section>
  );
}

function FloatingStat({
  y,
  position,
  eyebrow,
  value,
  caption,
}: {
  y: MotionValue<string>;
  position: "left" | "right";
  eyebrow: string;
  value: string;
  caption: string;
}) {
  const sideClass =
    position === "left"
      ? "left-4 md:left-10 lg:left-20 text-left"
      : "right-4 md:right-10 lg:right-20 text-right";
  return (
    <motion.div
      style={{ y }}
      className={`absolute top-1/2 -translate-y-1/2 ${sideClass}`}
    >
      <div className="rounded-[var(--radius-xl)] border border-white/15 bg-white/5 backdrop-blur-md px-5 py-4 md:px-7 md:py-6 max-w-[16rem]">
        <div className="type-eyebrow text-emerald-300">{eyebrow}</div>
        <div className="font-mono text-[clamp(2.25rem,3.5vw,3.25rem)] font-medium text-white tabular-nums leading-none mt-1.5">
          {value}
        </div>
        <div
          className={`type-body-sm text-white/75 mt-2 ${
            position === "right" ? "ml-auto" : ""
          }`}
        >
          {caption}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Versão sem scroll-driven para utilizadores com prefers-reduced-motion.
 * Apresenta headline + tagline + CTAs num único layout estático sobre o poster.
 */
function HeroStatic({ assetBase }: { assetBase: string }) {
  return (
    <section
      id="top"
      aria-label="Grupo Nossa Farmácia"
      className="relative h-screen min-h-[720px] w-full overflow-hidden bg-ink-950"
    >
      <img
        src={`${assetBase}/hero-poster.jpg`}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-ink-950/60" aria-hidden="true" />
      <div className="noise-overlay" style={{ opacity: 0.05 }} />

      <div className="absolute top-20 right-6 md:right-10 opacity-50">
        <LogoMark theme="dark" height={56} />
      </div>

      <div className="relative h-full flex flex-col items-center justify-center text-center px-6 lg:px-10">
        <span className="type-eyebrow text-emerald-300/90">
          Grupo Nossa Farmácia · desde 2012
        </span>
        <h1 className="type-display-xl mt-6 text-white max-w-5xl">
          400 farmácias.{" "}
          <span className="font-serif italic font-normal text-emerald-300">
            Uma só voz.
          </span>
        </h1>
        <p className="mt-8 type-body-lg text-white/80 max-w-2xl">
          O maior grupo de farmácias independentes de Portugal — com
          tecnologia própria, poder de compra agregado e autonomia intacta.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="xl">
            <a href="#candidatura">
              Quero aderir
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button
            asChild
            size="xl"
            variant="ghost"
            className="text-white border border-white/15 hover:bg-white/10 hover:text-white"
          >
            <a href="#grupo">Conhecer o Grupo</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
