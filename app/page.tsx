import { Header } from "@/components/landing/Header";
import { Hero2 } from "@/components/landing/Hero2";
import { Stats } from "@/components/landing/Stats";
import { About } from "@/components/landing/About";
import { Ecosystem } from "@/components/landing/Ecosystem";
import { Benefits } from "@/components/landing/Benefits";
import { HowToJoin } from "@/components/landing/HowToJoin";
import { JoinForm } from "@/components/landing/JoinForm";
import { Testimonials } from "@/components/landing/Testimonials";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main className="relative bg-background text-foreground">
        <Hero2 />
        <Stats />
        <About />
        <Ecosystem />
        <Benefits />
        <HowToJoin />
        <JoinForm />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
