import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { FloatingCTA } from "@/components/FloatingCTA";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/sections/Stats";
import { WhyUs } from "@/components/sections/WhyUs";
import { Process } from "@/components/sections/Process";
import { Gallery } from "@/components/sections/Gallery";
import { Guarantee } from "@/components/sections/Guarantee";
import { Quiz } from "@/components/sections/Quiz";
import { Reviews } from "@/components/sections/Reviews";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
import { RenoStatement } from "@/components/sections/RenoStatement";
export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main>
      <Navbar />
      <FloatingCTA />
      <Hero />
      <Stats />
      <WhyUs />
      <Gallery />
      <Guarantee />
      <Quiz />
      <Reviews />
      <Process />
      <InstagramFeed />
      <RenoStatement />
    </main>
  );
}
