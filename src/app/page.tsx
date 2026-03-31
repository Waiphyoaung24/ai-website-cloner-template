import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ClientsSection } from "@/components/ClientsSection";
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
        <AwardsSection />
        <CapabilitiesSection />
        <CTASection />
        <FooterSection />
      </main>
    </>
  );
}
