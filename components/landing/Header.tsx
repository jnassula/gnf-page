"use client";

import * as React from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginDialog } from "./LoginDialog";
import { Logo } from "@/components/brand/Logo";

const navItems = [
  { href: "#grupo", label: "O Grupo" },
  { href: "#vantagens", label: "Vantagens" },
  { href: "#tecnologia", label: "Tecnologia" },
  { href: "#aderir", label: "Aderir" },
  { href: "#contactos", label: "Contactos" },
];

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 12);
  });

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-[background-color,border-color,backdrop-filter,box-shadow] duration-[var(--dur-slow)] ease-[var(--ease-out)]",
        scrolled
          ? "bg-background/75 backdrop-blur-xl border-b border-border-subtle shadow-[var(--shadow-xs)]"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between">
          <a
            href="#top"
            aria-label="Grupo Nossa Farmácia — início"
            className="flex items-center gap-2.5 rounded-[var(--radius-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
          >
            <Logo variant="full" height={36} />
          </a>

          <nav
            aria-label="Navegação principal"
            className="hidden md:flex items-center gap-1"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-[var(--radius-sm)] px-3 py-1.5 text-[13px] font-medium text-foreground-muted hover:text-primary hover:bg-primary-soft transition-colors duration-[var(--dur-fast)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LoginDialog>
              <Button size="sm" variant="primary" className="gap-1.5">
                Entrar
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </LoginDialog>
            <button
              type="button"
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] border border-border text-foreground-muted hover:text-foreground hover:bg-surface-sunken"
            >
              {mobileOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
          className="md:hidden border-t border-border-subtle bg-background/95 backdrop-blur-xl"
        >
          <nav className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-[var(--radius-sm)] px-3 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-primary-soft"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
