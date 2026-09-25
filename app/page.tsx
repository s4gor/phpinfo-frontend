"use client";

import CTA from "@/components/cta";
import Features from "@/components/logos";
import UseCases from "@/components/use-cases";
import Testimonials from "@/components/testimonials";
import Founder from "@/components/founder";
import FAQ from "@/components/faq";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ExeebitBar from "@/components/exeebit-bar";
import WhatsAppWidget from "@/components/whatsapp-widget";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-clip pt-24 sm:pt-28 lg:pt-36">
      <div className="fixed left-0 right-0 top-0 z-[60]">
        <ExeebitBar />
        <Header />
      </div>
      <section className="flex w-full flex-col items-center px-4 sm:px-6 lg:px-8">
        <CTA />

        <Features />

        <UseCases />

        <Testimonials />

        <Founder />

        <FAQ />
      </section>

      <Footer />

      <WhatsAppWidget />
    </main>
  );
}
