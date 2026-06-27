import { Header } from "@/components/landing/Header";
import { AuroraBackground } from "@/components/landing/AuroraBackground";
import { HeroAurora } from "@/components/landing/HeroAurora";
import { Stats } from "@/components/landing/Stats";
import { About } from "@/components/landing/About";
import { VideoSection } from "@/components/landing/VideoSection";
import { Ecosystem } from "@/components/landing/Ecosystem";
import { Benefits } from "@/components/landing/Benefits";
import { HowToJoin } from "@/components/landing/HowToJoin";
import { JoinForm } from "@/components/landing/JoinForm";
import { Testimonials } from "@/components/landing/Testimonials";
import { Partners } from "@/components/landing/Partners";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

export default function Page() {
  return (
    <>
      {/* Skip-link — primeiro elemento focável, visível apenas em foco */}
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-[var(--radius-md)] focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:shadow-[var(--shadow-lg)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
      >
        Saltar para o conteúdo
      </a>
      {/* Atmosfera global — aurora viva atrás de todo o conteúdo */}
      <AuroraBackground variant="page" tone="light" />
      <Header />
      <main id="conteudo" tabIndex={-1} className="relative z-0 text-foreground outline-none">
        <HeroAurora />
        <Stats />
        <About />
        <VideoSection />
        <Ecosystem />
        <Benefits />
        <HowToJoin />
        <JoinForm />
        <Testimonials />
        <Partners />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
