import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import BeforeAfterLens from "@/components/before-after-lens";
import TelemetryDemo from "@/components/telemetry-demo";
import FourPillars from "@/components/four-pillars";
import CommandPalette from "@/components/command-palette";
import Comparison from "@/components/comparison";
import PricingSection from "@/components/pricing-section";
import FAQ from "@/components/faq";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0a2540] selection:bg-[#635bff] selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <BeforeAfterLens />
        <TelemetryDemo />
        <FourPillars />
        <CommandPalette />
        <Comparison />
        <PricingSection />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
