import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/sections/Stats";
import { Process } from "@/components/sections/Process";
import { Gallery } from "@/components/sections/Gallery";
import { Quiz } from "@/components/sections/Quiz";
import { Reviews } from "@/components/sections/Reviews";
import { RenoStatement } from "@/components/sections/RenoStatement";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
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
      <Process />
      <Gallery />
      <Quiz />
      <Reviews />
      <RenoStatement />
      <InstagramFeed />
      <Footer />
      <WhatsAppFAB />
    </main>
  );
}
