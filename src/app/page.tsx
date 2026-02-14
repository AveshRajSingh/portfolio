import { Hero } from "@/components/Hero";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { ActivityHub } from "@/components/ActivityHub";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 pt-32">
      <Hero />
      {/* <ProjectShowcase /> */}
      {/* <ActivityHub /> */}
      <div className="container mx-auto px-4">
        <p className="text-neutral-500">Navbar Development Mode</p>
      </div>
    </main>
  );
}
