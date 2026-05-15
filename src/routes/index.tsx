import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/sections/Stats";
import { Process } from "@/components/sections/Process";
import { Gallery } from "@/components/sections/Gallery";
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
      <Hero />
      <Stats />
      <Process />
      <Gallery />
      <Quiz />
      <Reviews />
      <InstagramFeed />
      <RenoStatement />
    </main>
  );
}
