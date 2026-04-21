import * as React from "react";
import { Linkedin, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

const columns = [
  {
    title: "Grupo",
    items: [
      { href: "#grupo", label: "Sobre" },
      { href: "#numeros", label: "Em números" },
      { href: "#aderir", label: "Como aderir" },
      { href: "#candidatura", label: "Candidatura" },
    ],
  },
  {
    title: "Tecnologia",
    items: [
      { href: "#tecnologia", label: "Nossa AI" },
      { href: "#tecnologia", label: "Addo Log" },
      { href: "#tecnologia", label: "Plataforma de compras" },
      { href: "#tecnologia", label: "Integrações ERP" },
    ],
  },
  {
    title: "Área reservada",
    items: [
      { href: "#login-colaborador", label: "Colaboradores" },
      { href: "#login-farmacia", label: "Farmácias" },
      { href: "#login-fornecedor", label: "Fornecedores" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contactos"
      className="bg-ink-950 text-white/80"
      aria-label="Rodapé"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_2fr] gap-12 lg:gap-20">
          <div className="flex flex-col gap-6">
            <Logo variant="full" theme="dark" height={44} />
            <p className="type-body-md text-white/60 max-w-sm">
              Cerca de 400 farmácias independentes, reunidas num grupo que
              negoceia, inova e cresce em conjunto. Desde 2012.
            </p>
            <ul className="flex flex-col gap-3 type-body-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-emerald-300 shrink-0" />
                <span>Rua ...., 1000-000 Lisboa, Portugal</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-emerald-300 shrink-0" />
                <a
                  href="tel:+351210000000"
                  className="hover:text-white transition-colors"
                >
                  +351 210 000 000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-emerald-300 shrink-0" />
                <a
                  href="mailto:geral@gruponossafarmacia.pt"
                  className="hover:text-white transition-colors"
                >
                  geral@gruponossafarmacia.pt
                </a>
              </li>
            </ul>
            <div className="flex items-center gap-2 pt-2">
              <a
                href="#"
                aria-label="LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col gap-4">
                <div className="type-eyebrow text-white/50">{col.title}</div>
                <ul className="flex flex-col gap-2.5">
                  {col.items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="type-body-sm text-white/75 hover:text-white transition-colors"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 type-body-xs text-white/50">
          <div>© {year} Grupo Nossa Farmácia. Todos os direitos reservados.</div>
          <nav aria-label="Legal" className="flex items-center gap-5">
            <a href="#privacidade" className="hover:text-white transition-colors">
              Privacidade
            </a>
            <a href="#termos" className="hover:text-white transition-colors">
              Termos
            </a>
            <a href="#cookies" className="hover:text-white transition-colors">
              Cookies
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
