import { Hero } from "@/components/Hero";

import { ActivityHub } from "@/components/ActivityHub";
import { Skills3D } from "@/components/Skills3D";


export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 pt-32">
      <Hero />
      <div id="skills" className="relative z-10 bg-neutral-950 scroll-mt-32">
        <Skills3D />
      </div>
    </main>
  );
}
