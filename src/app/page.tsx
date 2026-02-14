import { Hero } from "@/components/Hero";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { ActivityHub } from "@/components/ActivityHub";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 pt-32">
      <Hero />
      {/* <ProjectShowcase />
      <ActivityHub /> */}
    </main>
  );
}
