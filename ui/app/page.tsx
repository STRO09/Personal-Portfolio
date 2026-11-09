// app/page.jsx (or wherever Home lives)
import React from "react";
import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MacbookScrollSkills from "@/components/MacBookSkills"
import Card from "@/components/Card";
import {
  Sparkles,
  Code2,
  Database,
  Wrench,
  MessageSquare,
  ShoppingCart,
  GitBranch,
  Terminal,
} from "lucide-react";

const projects = [
  {
    icon: MessageSquare,
    title: "AI Chat App",
    description:
      "Real-time messaging platform with JWT and refresh-token auth, featuring an AI participant as a first-class user. Optimized for 100k+ messages per chat with 50ms latency via compound indexing.",
    tags: ["CodeIgniter 3", "Node.js", "Socket.IO", "MongoDB"],
    href: "https://github.com/STRO09/ai-chat-app",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Portal",
    description:
      "Dual-role ERP-style system covering 10+ workflows and a 4-stage order lifecycle. Normalized schema with stored procedures and triggers, BCrypt-hashed auth, deployed end-to-end on Apache Tomcat.",
    tags: ["J2EE", "Servlets", "JDBC", "MySQL"],
    href: "https://github.com/STRO09/ecommerce-portal",
  },
  {
    icon: GitBranch,
    title: "Issues & Deployment Tracker",
    description:
      "Production-style issue tracking system with role-based access control and request lifecycle management. CI/CD via GitHub Actions, deployed on Vercel and Render with Docker support.",
    tags: ["Next.js", "Hibernate", "PostgreSQL", "Docker"],
    href: "https://github.com/STRO09/issues-deployment-tracker",
  },
];

const skills = [
  {
    icon: Code2,
    title: "Frontend",
    dotColor: "bg-indigo-400",
    items: ["React.js / Next.js", "JavaScript", "Tailwind CSS", "PHP"],
  },
  {
    icon: Database,
    title: "Backend & Database",
    dotColor: "bg-purple-400",
    items: ["Node.js / Express.js", "Java / Spring Boot / Hibernate", "PostgreSQL / MySQL", "MongoDB / Redis"],
  },
  {
    icon: Wrench,
    title: "Tools & DevOps",
    dotColor: "bg-pink-400",
    items: ["Git & GitHub Actions", "Docker", "Postman / Maven", "Vercel & Render"],
  },
];

export default function Home() {
  return (
    <GridBackground>
      <Navbar />
      <HeroSection />

      <main className="w-full max-w-5xl mx-auto px-6 flex-1 flex flex-col">
        <MacbookScrollSkills />

        {/* PROJECTS SECTION */}
        <section id="work" className="py-16 border-t border-white/5 scroll-mt-24">
          <div className="flex items-center gap-2 mb-10">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <h2 className="font-syne text-xs font-bold uppercase tracking-widest text-indigo-400">Featured Work</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.title} {...project} />
            ))}
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="about" className="py-16 border-t border-white/5 scroll-mt-24">
          <div className="flex items-center gap-2 mb-10">
            <Terminal className="h-4 w-4 text-indigo-400" />
            <h2 className="font-syne text-xs font-bold uppercase tracking-widest text-indigo-400">Tech Stack & Mastery</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <Card key={skill.title} {...skill} />
            ))}
          </div>
        </section>
      </main>
    </GridBackground>
  );
}