"use client";

import React, { useRef, useEffect, useState } from "react";
import ProfileHero from "./ProfileHero";
import { ArrowUpRight, MapPin, Briefcase } from "lucide-react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollable = sectionHeight - windowHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / scrollable));
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const phase1 = Math.min(1, progress / 0.45);
  const phase2 = Math.max(0, Math.min(1, (progress - 0.45) / 0.55));

  return (
    <div ref={sectionRef} style={{ height: "280vh" }} className="relative w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Status badge — commented out as requested */}
        {/*
        <div
          className="absolute top-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300"
          style={{
            opacity: 1 - phase1,
            transform: `translateX(-50%) translateY(${phase1 * -16}px)`,
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/25 bg-indigo-500/8 text-[11px] font-medium tracking-wide text-indigo-300 backdrop-blur-md shadow-[0_0_20px_rgba(99,102,241,0.12)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
            </span>
            Available for new opportunities
          </div>
        </div>
        */}

        <div className="relative w-full h-full max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 md:gap-12">

          {/* Profile hero */}
          <div
            className="hero-image-wrapper flex-shrink-0"
            style={{
              "--phase1": phase1,
              transform: `translateX(var(--translate-x)) scale(var(--image-scale))`,
              transformOrigin: "center center",
              transition: "transform 0.06s linear",
              willChange: "transform",
              zIndex: 20,
            } as React.CSSProperties}
          >
            <ProfileHero />
          </div>

          {/* Bio panel */}
          <div
            className="hero-bio-panel w-full max-w-[480px] md:w-[45%] z-10 text-center md:text-left"
            style={{
              "--phase2": phase2,
              opacity: "var(--phase2)",
              transform: "var(--bio-transform)",
              transition: "opacity 0.08s linear, transform 0.08s linear",
              pointerEvents: phase2 > 0.6 ? "auto" : "none",
            } as React.CSSProperties}
          >
            <div className="flex flex-col gap-5 items-center md:items-start">
              <div className="flex flex-col gap-2 items-center md:items-start">
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-widest">
                  <Briefcase className="h-3.5 w-3.5" />
                  Full-Stack Developer &amp; Designer
                </div>
                <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                  <MapPin className="h-3 w-3" />
                  India — open to remote worldwide
                </div>
              </div>

              <div className="w-10 h-px bg-indigo-500/40" />

              <div className="flex flex-col gap-3">
                <p className="text-zinc-200 text-base leading-relaxed">
                  I craft <span className="text-indigo-400 font-medium">high-performance</span> digital
                  experiences — combining precise engineering with a deep sense of visual design.
                </p>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  From interactive UI systems and 3D web experiences to real-time data dashboards,
                  I build things that are both technically solid and genuinely beautiful.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-white/5 w-full">
                {[
                  { value: "3+", label: "Years Building" },
                  { value: "20+", label: "Projects Shipped" },
                  { value: "5★", label: "Client Rating" },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col gap-0.5">
                    <span className="text-xl font-bold text-white">{s.value}</span>
                    <span className="text-[11px] text-zinc-500">{s.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="#work"
                  className="flex h-10 items-center justify-center gap-1.5 rounded-full bg-indigo-600 px-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.45)] hover:scale-[1.03] active:scale-95"
                >
                  Explore Work
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <a
                  href="#about"
                  className="flex h-10 items-center rounded-full border border-white/10 bg-zinc-950/20 px-5 text-sm font-semibold text-zinc-300 transition-all duration-300 hover:border-white/25 hover:text-white hover:bg-zinc-900/40"
                >
                  Tech Stack
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}