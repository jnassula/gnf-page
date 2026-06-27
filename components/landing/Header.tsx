"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginDialog } from "./LoginDialog";
import { Logo } from "@/components/brand/Logo";

interface NavItem {
  label: string;
  /** Secção da homepage (âncora) — resolvida para `/#id`. */
  id?: string;
  /** Rota dedicada (ex.: /servicos). */
  href?: string;
}

const navItems: NavItem[] = [
  { id: "grupo", label: "O Grupo" },
  { id: "vantagens", label: "Vantagens" },
  { id: "tecnologia", label: "Tecnologia" },
  { href: "/servicos", label: "Serviços" },
  { id: "aderir", label: "Aderir" },
  { id: "parceiros", label: "Parceiros" },
  { id: "contactos", label: "Contactos" },
];

const hrefFor = (item: NavItem) => item.href ?? `/#${item.id}`;

export function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [overHero, setOverHero] = React.useState(true);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const heroBottomRef = React.useRef(0);
  const { scrollY } = useScroll();

  // Mede o fundo do hero (#top) uma vez + em resize, evitando layout reads no scroll
  React.useEffect(() => {
    const measure = () => {
      const hero = document.getElementById("top");
      heroBottomRef.current = hero
        ? hero.offsetTop + hero.offsetHeight
        : window.innerHeight;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pathname]);

  // Header transparente enquanto o hero ocupa o ecrã; vidro quando o scroll sai
  useMotionValueEvent(scrollY, "change", (latest) => {
    setOverHero(latest < heroBottomRef.current - 72);
  });

  // Scrollspy — destaca a secção visível no menu (só na homepage)
  React.useEffect(() => {
    const ids = navItems.map((i) => i.id).filter((v): v is string => !!v);
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [pathname]);

  const isActive = (item: NavItem) =>
    item.href
      ? pathname?.startsWith(item.href)
      : onHome && activeId === item.id;

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-40 pt-3 sm:pt-5"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div
        className={cn(
          "group flex w-full items-center justify-between gap-3 rounded-[var(--radius-2xl)] pl-5 pr-2 transition-all duration-[var(--dur-slow)] ease-[var(--ease-out)]",
          overHero
            ? "border border-transparent bg-transparent py-3 shadow-none"
            : "glass-strong py-2 shadow-[var(--shadow-glass)]"
        )}
      >
        <Link
          href="/"
          aria-label="Grupo Nossa Farmácia — início"
          className={cn(
            "flex items-center gap-2.5 rounded-[var(--radius-sm)] transition-opacity duration-[var(--dur-base)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
            // Na hero a logo fica oculta; revela-se em hover do header ou em foco (teclado)
            overHero
              ? "opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100"
              : "opacity-100"
          )}
        >
          {/* 3x do tamanho original (32→96) no desktop; reduzido em telemóvel p/ não transbordar */}
          <Logo
            variant="full"
            height={56}
            theme={overHero ? "dark" : "light"}
            className="lg:hidden"
          />
          <Logo
            variant="full"
            height={96}
            theme={overHero ? "dark" : "light"}
            className="hidden lg:block"
          />
        </Link>

        <div className="ml-auto flex items-center gap-1 xl:gap-3">
          <nav
            aria-label="Navegação principal"
            className={cn(
              "hidden items-center gap-1 transition-opacity duration-[var(--dur-base)] ease-[var(--ease-out)] xl:flex",
              // Na hero o menu fica oculto; revela-se em hover do header ou em foco (teclado)
              overHero
                ? "opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100"
                : "opacity-100"
            )}
          >
            {navItems.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item.label}
                  href={hrefFor(item)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-[var(--radius-full)] px-3.5 py-2 text-[13px] transition-colors duration-[var(--dur-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
                    overHero
                      ? cn(
                          "hover:bg-white/10 hover:text-white",
                          active ? "font-semibold text-white" : "font-medium text-white/75"
                        )
                      : cn(
                          "hover:bg-primary-soft hover:text-primary",
                          active ? "font-semibold text-primary" : "font-medium text-foreground-muted"
                        )
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <LoginDialog>
            <Button size="sm" variant="primary" className="gap-1.5 rounded-[var(--radius-full)] px-4">
              Entrar
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </LoginDialog>
          <button
            type="button"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-full)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] xl:hidden",
              overHero
                ? "text-white hover:bg-white/10 hover:text-white"
                : "text-foreground-muted hover:bg-surface-sunken hover:text-foreground"
            )}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.22, ease: [0.22, 0.61, 0.36, 1] }}
          className="glass-strong mt-2 w-full rounded-[var(--radius-xl)] p-2 xl:hidden"
        >
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item.label}
                  href={hrefFor(item)}
                  onClick={() => setMobileOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-[var(--radius-md)] px-4 py-2.5 text-sm transition-colors hover:bg-primary-soft hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]",
                    active
                      ? "bg-primary-soft font-semibold text-primary"
                      : "font-medium text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </motion.div>
      )}
      </div>
    </motion.header>
  );
}
