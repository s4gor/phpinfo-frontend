"use client";

import { toast } from "sonner";
import { useState } from "react";
import CTA from "@/components/cta";
import Pricing from "@/components/pricing";
import Features from "@/components/logos";
import Screenshots from "@/components/screenshots";
import Comparison from "@/components/comparison";
import Testimonials from "@/components/testimonials";
import DemoVideo from "@/components/demo-video";
import UseCases from "@/components/use-cases";
import Founder from "@/components/founder";
import FAQ from "@/components/faq";
import Particles from "@/components/ui/particles";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ExeebitBar from "@/components/exeebit-bar";
import WhatsAppWidget from "@/components/whatsapp-widget";

export default function Home() {
  const [loadingTier, setLoadingTier] = useState<string | null>(null);

  const handleBuy = async (tier: "single" | "unlimited" | "lifetime") => {
    setLoadingTier(tier);

    const promise = new Promise<{ url: string }>(async (resolve, reject) => {
      try {
        const res = await fetch("/api/checkout", {
          method: "POST",
          cache: "no-store",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tier }),
        });

        if (!res.ok) {
          if (res.status === 429) return reject("Rate limited");
          return reject("Checkout failed");
        }

        const data = await res.json();
        if (!data?.url) return reject("Checkout failed");
        resolve(data);
      } catch (e) {
        reject(e);
      }
    });

    toast.promise(promise, {
      loading: "Opening secure checkout…",
      success: (data) => {
        window.location.href = data.url;
        return "Redirecting to Stripe…";
      },
      error: (err) => {
        setLoadingTier(null);
        if (err === "Rate limited") return "Too many attempts. Try again in a minute.";
        return "Couldn't open checkout. Try again.";
      },
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-clip pt-20">
      <div className="fixed left-0 right-0 top-0 z-[60]">
        <ExeebitBar />
        <Header />
      </div>
      <section className="flex w-full flex-col items-center px-4 sm:px-6 lg:px-8">
        <CTA />

        <Screenshots />

        <DemoVideo />

        <Features />

        <UseCases />

        <Comparison />

        <Testimonials />

        <Pricing onBuy={handleBuy} loadingTier={loadingTier} />

        <Founder />

        <FAQ />
      </section>

      <Footer />

      <Particles
        quantityDesktop={350}
        quantityMobile={100}
        ease={80}
        color={"#A78BFA"}
        refresh
      />

      <WhatsAppWidget />
    </main>
  );
}
