import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import TelemetryDemo from "@/components/telemetry-demo";
import FourPillars from "@/components/four-pillars";
import Comparison from "@/components/comparison";
import PricingSection from "@/components/pricing-section";
import FAQ from "@/components/faq";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfd] text-slate-900 selection:bg-violet-600 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TelemetryDemo />
        <FourPillars />
        <Comparison />
        <PricingSection />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
