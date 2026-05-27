import React from "react";
import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MacbookScrollSkills from "@/components/MacBookSkills"
import {
  Sparkles,
  Code2,
  Cpu,
  Layers,
  Terminal,
  ExternalLink
} from "lucide-react";

export default function Home() {
  return (
    <GridBackground>
      {/* Sticky borderless top-right navbar */}
      <Navbar />

      {/* Scroll-driven hero: starts big & centered, shrinks left, bio reveals right */}
      <HeroSection />

      <main className="w-full max-w-5xl mx-auto px-6 flex-1 flex flex-col">

        {/* Macbook Scroll Skills */}
        <MacbookScrollSkills />

        {/* PROJECTS SECTION */}
        <section id="work" className="py-16 border-t border-white/5 scroll-mt-24">
          <div className="flex items-center gap-2 mb-10">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <h2 className="font-syne text-xs font-bold uppercase tracking-widest text-indigo-400">Featured Work</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project 1 */}
            <div className="group glass-panel p-6 flex flex-col justify-between min-h-[300px] transition-all duration-500 hover:-translate-y-1">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/10">
                    <Code2 className="h-5 w-5" />
                  </div>
                  <ExternalLink className="h-4 w-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                </div>
                <h3 className="font-syne text-lg font-bold text-zinc-100 mb-2 group-hover:text-indigo-300 transition-colors">
                  Aura UI Library
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  A premium collection of high-fidelity, interactive components tailored for Next.js and Tailwind applications.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/5 text-zinc-400">TypeScript</span>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/5 text-zinc-400">Tailwind CSS</span>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/5 text-zinc-400">React</span>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group glass-panel p-6 flex flex-col justify-between min-h-[300px] transition-all duration-500 hover:-translate-y-1">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/10">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <ExternalLink className="h-4 w-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                </div>
                <h3 className="font-syne text-lg font-bold text-zinc-100 mb-2 group-hover:text-indigo-300 transition-colors">
                  Vortex Engine
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  A hardware-accelerated 3D rendering pipeline for the web using custom fragment shaders and WebGL.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/5 text-zinc-400">WebGL</span>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/5 text-zinc-400">GLSL</span>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/5 text-zinc-400">Rust</span>
              </div>
            </div>

            {/* Project 3 */}
            <div className="group glass-panel p-6 flex flex-col justify-between min-h-[300px] transition-all duration-500 hover:-translate-y-1">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/10">
                    <Layers className="h-5 w-5" />
                  </div>
                  <ExternalLink className="h-4 w-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                </div>
                <h3 className="font-syne text-lg font-bold text-zinc-100 mb-2 group-hover:text-indigo-300 transition-colors">
                  Synthesis Dashboard
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Real-time analytics engine processing massive data streams using Server-Sent Events (SSE) and fast visual charts.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/5 text-zinc-400">Next.js 15</span>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/5 text-zinc-400">Recharts</span>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/5 text-zinc-400">Redis</span>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="about" className="py-16 border-t border-white/5 scroll-mt-24">
          <div className="flex items-center gap-2 mb-10">
            <Terminal className="h-4 w-4 text-indigo-400" />
            <h2 className="font-syne text-xs font-bold uppercase tracking-widest text-indigo-400">Tech Stack & Mastery</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-6">
              <h3 className="font-syne text-sm font-semibold text-zinc-200 mb-4 border-b border-white/5 pb-2">Frontend</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-indigo-400"></span>React / Next.js</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-indigo-400"></span>TypeScript</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-indigo-400"></span>Tailwind CSS v4</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-indigo-400"></span>Framer Motion</li>
              </ul>
            </div>

            <div className="glass-panel p-6">
              <h3 className="font-syne text-sm font-semibold text-zinc-200 mb-4 border-b border-white/5 pb-2">Backend & Database</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-purple-400"></span>Node.js / Express</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-purple-400"></span>GraphQL / REST APIs</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-purple-400"></span>PostgreSQL / Prisma</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-purple-400"></span>MongoDB / Redis</li>
              </ul>
            </div>

            <div className="glass-panel p-6">
              <h3 className="font-syne text-sm font-semibold text-zinc-200 mb-4 border-b border-white/5 pb-2">Tools & DevOps</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-pink-400"></span>Git & GitHub Actions</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-pink-400"></span>Docker Containers</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-pink-400"></span>Vercel & AWS</li>
                <li className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-pink-400"></span>Figma Design System</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        {/* <footer className="mt-20 py-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} Sagar Portfolio. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed with <span className="text-indigo-400 font-bold">♥</span> & Next.js
          </p>
        </footer> */}
      </main>
    </GridBackground>
  );
}
