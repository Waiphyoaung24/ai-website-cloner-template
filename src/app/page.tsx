import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ClientsSection } from "@/components/ClientsSection";
import { AwardsSection } from "@/components/AwardsSection";
import { CapabilitiesSection } from "@/components/CapabilitiesSection";
import { CTASection } from "@/components/CTASection";
import { FooterSection } from "@/components/FooterSection";

export default function Home() {
  return (
    <>
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
