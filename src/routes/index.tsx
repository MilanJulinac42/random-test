import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/sections/Stats";
import { Gallery } from "@/components/sections/Gallery";
import { Quiz } from "@/components/sections/Quiz";
import { WhyReno } from "@/components/sections/WhyReno";
import { Process } from "@/components/sections/Process";
import { Reviews } from "@/components/sections/Reviews";
import { TrustBar } from "@/components/sections/TrustBar";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <Gallery />
      <Quiz />
      <WhyReno />
      <Process />
      <Reviews />
      <TrustBar />
      <FinalCTA />
      <Footer />
      <WhatsAppFAB />
    </main>
  );
}
