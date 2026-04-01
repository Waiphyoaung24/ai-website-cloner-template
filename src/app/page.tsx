import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ClientsSection } from "@/components/ClientsSection";
import { ThreeShowcase } from "@/components/ThreeShowcase";
import { AwardsSection } from "@/components/AwardsSection";
import { CapabilitiesSection } from "@/components/CapabilitiesSection";
import { CTASection } from "@/components/CTASection";
import { FooterSection } from "@/components/FooterSection";
import { Preloader } from "@/components/Preloader";

export default function Home() {
  return (
    <>
      <Preloader />
      <Header />
      <main className="h-screen overflow-y-auto overflow-x-hidden scroll-smooth">
        <HeroSection />
        <ClientsSection />
        <ThreeShowcase />
        <AwardsSection />
        <CapabilitiesSection />
        <CTASection />
        <FooterSection />
      </main>
    </>
  );
}
