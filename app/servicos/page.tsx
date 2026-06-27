import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { AuroraBackground } from "@/components/landing/AuroraBackground";
import { Footer } from "@/components/landing/Footer";
import { ServicesContent } from "@/components/services/ServicesContent";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Serviços diferenciados do Grupo Nossa Farmácia: consultoria comercial e apoio à gestão, analytics de negócio, marketing de valor acrescentado, JUMP Academy e nutrição clínica.",
};

export default function ServicosPage() {
  return (
    <>
      {/* Skip-link — primeiro elemento focável, visível apenas em foco */}
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-[var(--radius-md)] focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:shadow-[var(--shadow-lg)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
      >
        Saltar para o conteúdo
      </a>
      <AuroraBackground variant="page" tone="light" />
      <Header />
      <main
        id="conteudo"
        tabIndex={-1}
        className="relative z-0 text-foreground outline-none"
      >
        <ServicesContent />
      </main>
      <Footer />
    </>
  );
}
