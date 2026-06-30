"use client";
import { useState, useEffect } from "react";
import "./globals.css";
import { Scroll } from "lucide-react";

// Interactive primitives
import Magnetic from "../components/ui/Magnetic";
import Reveal from "../components/ui/Reveal";
import CountUp from "../components/ui/CountUp";
import SkillBar from "../components/ui/SkillBar";

// Feature modules
import TerminalBoot from "../components/TerminalBoot";
import ContactCard from "../components/ContactCard";
import InteractiveTerminal from "../components/InteractiveTerminal";
import MobileNav from "../components/MobileNav";
import {
  TopologyDiagram,
  RequestFlowDiagram,
  StackDiagram,
  DeploymentDiagram,
} from "../components/Diagrams";

// Sub-components
function Navbar({ underlineStyle }) {
  return (
    <nav className="desktop-nav">
      <div className="nav-id">
        {/* <div className="nav-dot"></div> */}
        {/* <span className="nav-name">Chasing IT.</span> */}
      </div>
      <div className="nav-links">
        {/* Active Navigation underline */}
        <div className="nav-active-pill" style={underlineStyle}></div>
        <a href="#experience">Experience</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Stack</a>
        <a href="#contact">Contact</a>
        {/* <a href="https://drive.google.com/drive/folders/1L5YIGVPIyr6R5wi5yJP4vYrN3j496soM">↗ Resume</a> */}
      </div>
      <div className="nav-status">
        <div className="status-dot"></div>
        <span>Available for opportunities</span>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="hero">
      <div className="hero-left">
        <Reveal delay={100}>
          <div className="hero-tag">
            Backend Engineer · Distributed Systems · Reliable Applications
          </div>
        </Reveal>
        <Reveal delay={200}>
          <h1>
            Sagar
            <br />
            Janjoted
          </h1>
        </Reveal>
        <Reveal delay={350}>
          <p className="hero-sub">
            I enjoy understanding how complex software works under the hood.
            Distributed systems, real-time communication, databases, APIs, and
            everything in between. Most of my time is spent building, debugging,
            and improving backend systems that solve real engineering problems.
          </p>
        </Reveal>
        <Reveal delay={500}>
          <div className="hero-links">
            <Magnetic strength={0.12}>
              <a
                href="mailto:sagarjanjoted123@gmail.com"
                className="btn btn-primary"
              >
                → Get in touch
              </a>
            </Magnetic>
            <Magnetic strength={0.12}>
              <a
                href="https://github.com/STRO09"
                target="_blank"
                className="btn btn-ghost"
              >
                GitHub ↗
              </a>
            </Magnetic>
            <Magnetic strength={0.12}>
              <a
                href="https://linkedin.com/in/sagar-janjoted"
                target="_blank"
                className="btn btn-ghost"
              >
                LinkedIn ↗
              </a>
            </Magnetic>
            <Magnetic strength={0.12}>
              <a
                href="https://drive.google.com/drive/folders/1L5YIGVPIyr6R5wi5yJP4vYrN3j496soM"
                target="_blank"
                className="btn btn-ghost"
              >
                Resume ↗
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>
      <div className="hero-right">
        {/* <Reveal delay={400} className="w-full">
          <div className="terminal">
            <div className="term-bar">
              <div className="term-btn" style={{ background: "#e05252" }}></div>
              <div className="term-btn" style={{ background: "#e8a832" }}></div>
              <div className="term-btn" style={{ background: "#4caf6e" }}></div>
              <span style={{ fontSize: "10px", color: "var(--text3)", marginLeft: "8px" }}>
                sagar@slashrtc ~
              </span>
            </div>
            <div className="term-body leading-relaxed">
              <Reveal delay={550}>
                <div className="term-line">
                  <span className="prompt">$</span>
                  <span className="cmd">whoami</span>
                </div>
                <div className="out amber">→ Backend-focused Full-Stack Developer</div>
                <div className="out">→ Java · Node.js · Next.js</div>
              </Reveal>
              <br />
              <Reveal delay={750}>
                <div className="term-line">
                  <span className="prompt">$</span>
                  <span className="cmd">cat current_role.json</span>
                </div>
                <div className="out">
                  {"{ company: "}
                  <span style={{ color: "var(--teal)" }}>"SlashRTC"</span>,
                </div>
                <div className="out">
                  &nbsp; role: <span style={{ color: "var(--teal)" }}>"Software Developer"</span>,
                </div>
                <div className="out">
                  &nbsp; since: <span style={{ color: "var(--teal)" }}>"Nov 2025"</span>,
                </div>
                <div className="out">
                  &nbsp; team: <span style={{ color: "var(--amber)" }}>3</span>, services:{" "}
                  <span style={{ color: "var(--amber)" }}>15+</span>{" }"}
                </div>
              </Reveal>
              <br />
              <Reveal delay={950}>
                <div className="term-line">
                  <span className="prompt">$</span>
                  <span className="cmd">ps aux | grep solved</span>
                </div>
                <div className="out blue">→ DSA problems: 150+</div>
                <div className="out blue">→ Platforms: LeetCode, NeetCode</div>
              </Reveal>
              <br />
              <div className="term-line">
                <span className="prompt">$</span>
                <span className="cursor"></span>
              </div>
            </div>
          </div>
        </Reveal> */}
        <Reveal delay={400} className="w-full">
          <InteractiveTerminal />
        </Reveal>
      </div>
    </section>
  );
}

function WhatIDo() {
  const [expanded, setExpanded] = useState({});
  const cards = [
    {
      headline: "Reliable & Secure Backend",
      body: "I design and build production-ready backend systems with secure REST APIs, authentication, authorization, background jobs, scalable data models, efficient indexing, and optimized database queries. I'm comfortable building reliable services in Java and Node.js using both relational and NoSQL databases.",
      tags: [
        "Java",
        "Spring Boot",
        "Node.js",
        "Express.js",
        "Hibernate",
        "JDBC",
        "REST APIs",
        "Access + Refresh Token",
        "RBAC",
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "ScyllaDB",
      ],
    },
    {
      headline: "Distributed & Real-Time Systems",
      body: "I enjoy working on systems where multiple services need to communicate reliably. From real-time communication and event-driven workflows to debugging production issues across microservices, queues, and databases, I like solving problems that span the entire system.",
      tags: [
        "WebSockets",
        "Microservices",
        "Redis",
        "Bull Queues",
        "Event-Driven",
        "ScyllaDB",
        "Debugging",
      ],
    },
    {
      headline: "Modern Frontend Development",
      body: "I build responsive and maintainable user interfaces using React and Next.js. While backend engineering is my primary focus, I'm comfortable taking features from API to UI and enjoy building interfaces that are clean, fast, and practical.",
      tags: [
        "React",
        "Next.js",
        "Redux",
        "JavaScript",
        "TypeScript",
        "Tailwind CSS",
        "HTML5",
        "CSS3",
        "Responsive UI",
        "API Integration",
      ],
    },
    {
      headline: "End-to-End Product Delivery",
      body: "I enjoy taking ownership of features from implementation through testing, deployment, and production support. Working in a small engineering team has taught me to move comfortably across the backend, frontend, databases, and infrastructure whenever the product needs it.",
      tags: [
        "Git",
        "GitHub",
        "Docker",
        "GitHub Actions",
        "CI/CD",
        "Render",
        "Vercel",
        "Postman",
        "Agile",
        "Production Support",
      ],
    },
  ];

  return (
    <div className="section">
      <Reveal className="w-full">
        <div className="sec-header">
          <span className="sec-title">WHAT I CAN DO</span>
          <div className="sec-line"></div>
        </div>
        <p
          style={{
            fontSize: "12px",
            color: "var(--text2)",
            fontFamily: "var(--sans)",
            lineHeight: "1.7",
            marginBottom: "1.5rem",
            maxWidth: "100%",
          }}
        >
          {/* If you're a founder or PM evaluating whether I'm the right fit —
          here's what I can actually deliver for your product, without the
          jargon. */}
          The engineering work I enjoy most—and the problems I can help solve.
        </p>
      </Reveal>
      <div className="wib-grid">
        {cards.map((card, i) => {
          const isExpanded = expanded[i];
          const visibleTags = isExpanded ? card.tags : card.tags.slice(0, 3);

          return (
            <Reveal key={i} delay={i * 80} className="w-full">
              <div className="wib-card">
                <div className="wib-headline">{card.headline}</div>

                <p className="wib-body">{card.body}</p>

                <div className="wib-tags">
                  {visibleTags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}

                  {!isExpanded && card.tags.length > 3 && (
                    <button
                      className="tag tag-expand"
                      onClick={() =>
                        setExpanded((prev) => ({
                          ...prev,
                          [i]: true,
                        }))
                      }
                    >
                      +{card.tags.length - 3}
                    </button>
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

function Metrics() {
  return (
    <div className="section">
      <Reveal delay={100} className="w-full">
        <div className="metrics-row">
          <div className="metric">
            <span className="metric-val">
              <CountUp value="1+" />
            </span>
            <div className="metric-label">Years of Experience</div>
          </div>
          <div className="metric">
            <span className="metric-val">
              <CountUp value="150+" />
            </span>
            <div className="metric-label">DSA Problems Solved</div>
          </div>
          <div className="metric">
            <span className="metric-val">
              <CountUp value="400+" />
            </span>
            <div className="metric-label">Commits Last year</div>
          </div>
          <div className="metric">
            <span className="metric-val">
              <CountUp value="15+" />
            </span>
            <div className="metric-label">Technologies used</div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function CollapsibleCard({
  containerClass,
  headerClass,
  bodyClass,
  headerContent,
  children,
  initiallyOpen = false,
}) {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  return (
    <div className={containerClass}>
      <div
        className={headerClass}
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: "pointer" }}
        title={isOpen ? "Click to collapse" : "Click to expand"}
      >
        {headerContent}
      </div>
      <div className={`${bodyClass} ${isOpen ? "open" : ""}`}>{children}</div>
    </div>
  );
}

function Experience() {
  return (
    <section id="experience" className="section">
      <Reveal className="w-full">
        <div className="sec-header">
          <span className="sec-num">01 //</span>
          <span className="sec-title">EXPERIENCE</span>
          <div className="sec-line"></div>
        </div>
      </Reveal>

      {/* SlashRTC */}
      <Reveal delay={150} className="w-full">
        <CollapsibleCard
          containerClass="exp-item"
          headerClass="exp-head"
          bodyClass="exp-body"
          initiallyOpen={true}
          headerContent={
            <>
              <div>
                <div className="exp-company">SlashRTC — Mumbai</div>
                <div className="exp-role">Software Developer · Full-Stack</div>
              </div>
              <div className="exp-period">
                Nov 2025 – Present
                <div className="status">● Active</div>
              </div>
            </>
          }
        >
          <div className="exp-tags">
            <span className="tag highlight">Next.js</span>
            <span className="tag highlight">Node.js</span>
            <span className="tag">Redux</span>
            <span className="tag">Socket.IO</span>
            <span className="tag">ScyllaDB</span>
            <span className="tag">MongoDB</span>
            <span className="tag">Redis (Bull)</span>
            <span className="tag">FreeSWITCH</span>
            <span className="tag">CodeIgniter 3</span>
          </div>
          <div className="exp-detail">
            Building full-stack features in a 3-engineer team, driving the
            product from active development through UAT into production rollout.
          </div>
          <div className="exp-detail">
            Debugged and resolved cross-cutting issues in a distributed
            telephony system spanning 15+ Node.js microservices, Redis (Bull)
            job queues, and FreeSWITCH ESL.
          </div>
          <div className="exp-detail">
            Built projects including a real-time messaging platform with live 1:1 and group messaging using CI3, Node.js,
            Socket.IO, and MongoDB across a production telephony product.
          </div>

          <TopologyDiagram />
        </CollapsibleCard>
      </Reveal>

      {/* SDAC INFOTECH */}
      <Reveal delay={250} className="w-full">
        <CollapsibleCard
          containerClass="exp-item"
          headerClass="exp-head"
          bodyClass="exp-body"
          initiallyOpen={false}
          headerContent={
            <>
              <div>
                <div className="exp-company">SDAC INFOTECH — Mumbai</div>
                <div className="exp-role">
                  Java & Full Stack Development Trainee + Intern
                </div>
              </div>
              <div className="exp-period">Jul 2024 – Oct 2024</div>
            </>
          }
        >
          <div className="exp-tags">
            <span className="tag">Java Servlets</span>
            <span className="tag">JDBC</span>
            <span className="tag">JSP</span>
            <span className="tag">MySQL</span>
            <span className="tag">MVC2 Pattern</span>
          </div>
          <div className="exp-detail">
            Built an ERP-style e-commerce portal using Java Servlets, JDBC, JSP,
            and MySQL following MVC2 architectural pattern.
          </div>
          <div className="exp-detail">
            Covered core inventory, order, and user management workflows
            end-to-end across the full J2EE stack.
          </div>
        </CollapsibleCard>
      </Reveal>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section">
      <Reveal className="w-full">
        <div className="sec-header">
          <span className="sec-num">02 //</span>
          <span className="sec-title">PROJECTS</span>
          <div className="sec-line"></div>
        </div>
      </Reveal>

      <div className="project-grid">
        {/* AI Chat App */}
        <Reveal delay={150} className="w-full">
          <CollapsibleCard
            containerClass="project"
            headerClass="project-header"
            bodyClass="project-body"
            initiallyOpen={true}
            headerContent={
              <>
                <div className="project-name">AI Chat-App</div>
                <span className="project-type type-realtime">
                  Real-Time System
                </span>
              </>
            }
          >
            <p className="project-desc">
              A real-time messaging platform with secure JWT + refresh token
              auth. An AI participant is treated as a first-class user — not a
              plugin bolted on. Optimized for 100k+ messages per conversation
              through strategic compound indexing.
            </p>

            <RequestFlowDiagram />

            <div className="stat-row mt-4">
              <div className="stat">
                <span className="stat-val">
                  <CountUp value="50ms" />
                </span>
                <span className="stat-label">msg latency</span>
              </div>
              <div className="stat">
                <span className="stat-val">
                  <CountUp value="100k+" />
                </span>
                <span className="stat-label">msgs/chat</span>
              </div>
              <div className="stat">
                <span className="stat-val">
                  <CountUp value="500+" />
                </span>
                <span className="stat-label">conversations (N+1 fixed)</span>
              </div>
            </div>

            <div className="project-links mt-4">
              <Magnetic strength={0.12}>
                <a
                  href="https://github.com/STRO09/ChatApp-CodeIgniter3-Nodejs"
                  target="_blank"
                  className="plink"
                >
                  ⎋ GitHub
                </a>
              </Magnetic>
            </div>
          </CollapsibleCard>
        </Reveal>

        {/* E-commerce ERP Portal */}
        <Reveal delay={250} className="w-full">
          <CollapsibleCard
            containerClass="project"
            headerClass="project-header"
            bodyClass="project-body"
            initiallyOpen={false}
            headerContent={
              <>
                <div className="project-name">E-Commerce ERP Portal</div>
                <span className="project-type type-erp">ERP · J2EE</span>
              </>
            }
          >
            <p className="project-desc">
              Dual-role ERP-style system covering 10+ workflows and a 4-stage
              order lifecycle. Designed to SRS requirements with a normalized
              relational schema, stored procedures, and triggers for inventory
              consistency.
            </p>

            <StackDiagram />

            <div className="stat-row mt-4">
              <div className="stat">
                <span className="stat-val">
                  <CountUp value="10+" />
                </span>
                <span className="stat-label">workflows</span>
              </div>
              <div className="stat">
                <span className="stat-val">
                  <CountUp value="4-stage" />
                </span>
                <span className="stat-label">order lifecycle</span>
              </div>
            </div>

            <div className="project-links mt-4">
              <Magnetic strength={0.12}>
                <a
                  href="https://github.com/STRO09/Ecommerce_Portal"
                  target="_blank"
                  className="plink"
                >
                  ⎋ GitHub
                </a>
              </Magnetic>
            </div>
          </CollapsibleCard>
        </Reveal>

        {/* Issues & Deployment Tracker */}
        <Reveal delay={350} className="w-full">
          <CollapsibleCard
            containerClass="project"
            headerClass="project-header"
            bodyClass="project-body"
            initiallyOpen={false}
            headerContent={
              <>
                <div className="project-name">
                  Issues &amp; Deployment Tracker
                </div>
                <span className="project-type type-infra">
                  Infra · CI/CD · Live
                </span>
              </>
            }
          >
            <p className="project-desc">
              Production-style issue tracking with role-based access control and
              clear authorization boundaries across user roles. Fully deployed
              with CI/CD via GitHub Actions. Backend validated with H2 in-memory
              DB before shipping to production.
            </p>

            <DeploymentDiagram />

            <div className="stat-row mt-4">
              <div className="stat">
                <span className="stat-val">Live</span>
                <span className="stat-label">deployed</span>
              </div>
              <div className="stat">
                <span className="stat-val">RBAC</span>
                <span className="stat-label">multi-role auth</span>
              </div>
              <div className="stat">
                <span className="stat-val">CI/CD</span>
                <span className="stat-label">GitHub Actions</span>
              </div>
            </div>

            <div className="project-links mt-4">
              <Magnetic strength={0.12}>
                <a href="https://issues-deployment-tracker.vercel.app/auth" className="plink">
                  ↗ Live
                </a>
              </Magnetic>
              <Magnetic strength={0.12}>
                <a
                  href="https://github.com/STRO09/Issues-Deployment-Tracker"
                  target="_blank"
                  className="plink"
                >
                  ⎋ GitHub
                </a>
              </Magnetic>
            </div>
          </CollapsibleCard>
        </Reveal>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section">
      <Reveal className="w-full">
        <div className="sec-header">
          <span className="sec-num">03 //</span>
          <span className="sec-title">STACK &amp; TOOLS</span>
          <div className="sec-line"></div>
        </div>
      </Reveal>

      <div className="skills-grid">
        {/* Backend */}
        <Reveal delay={100} className="w-full">
          <div className="skill-group">
            <div className="skill-group-title">Backend</div>
            <SkillBar name="Node.js / Express.js" level="88%" />
            <SkillBar name="Java / Spring Boot" level="80%" />
            <SkillBar name="Hibernate / JPA" level="75%" />
            <SkillBar name="CodeIgniter 3" level="70%" />
          </div>
        </Reveal>

        {/* Frontend */}
        <Reveal delay={200} className="w-full">
          <div className="skill-group">
            <div className="skill-group-title">Frontend</div>
            <SkillBar name="Next.js (App Router)" level="82%" />
            <SkillBar name="React.js" level="78%" />
            <SkillBar name="Redux" level="70%" />
            <SkillBar name="TypeScript" level="65%" />
          </div>
        </Reveal>

        {/* Databases */}
        <Reveal delay={300} className="w-full">
          <div className="skill-group">
            <div className="skill-group-title">Databases</div>
            <SkillBar name="PostgreSQL / MySQL" level="82%" />
            <SkillBar name="MongoDB" level="78%" />
            <SkillBar name="Redis" level="72%" />
            <SkillBar name="ScyllaDB" level="60%" />
          </div>
        </Reveal>

        {/* DevOps */}
        <Reveal delay={400} className="w-full">
          <div className="skill-group">
            <div className="skill-group-title">DevOps &amp; Tools</div>
            <SkillBar name="Docker" level="30%" />
            <SkillBar name="GitHub Actions (CI/CD)" level="60%" />
            <SkillBar name="Socket.IO / Real-time" level="85%" />
            <SkillBar name="Git / GitHub" level="90%" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section className="section">
      <Reveal className="w-full">
        <div className="sec-header">
          <span className="sec-num">04 //</span>
          <span className="sec-title">JOURNEY</span>
          <div className="sec-line"></div>
        </div>
      </Reveal>

      <div className="timeline">
        {/* Forward-looking entry */}
        <Reveal delay={50} className="w-full">
          <div className="tl-item">
            <div className="tl-date" style={{ color: "var(--green)" }}>
              Jun 2026 – Present
            </div>
            <div className="tl-title" style={{ color: "var(--green)" }}>
              Open to Opportunities
            </div>
            <div className="tl-body">
              Targeting backend/full-stack roles at early-stage funded startups.
              Solving DSA daily, shipping side projects, actively interviewing.
            </div>
          </div>
        </Reveal>

        {/* SlashRTC — date fixed */}
        <Reveal delay={100} className="w-full">
          <div className="tl-item">
            <div className="tl-date">Nov 2025 – May 2026</div>
            <div className="tl-title">Software Developer @ SlashRTC</div>
            <div className="tl-body">
              Debugging distributed telephony systems, shipping real-time chat,
              navigating 15+ microservices in production. Took features on a new product from
              active dev through UAT to rollout.
            </div>
          </div>
        </Reveal>

        {/* rest unchanged from here */}
        {/* <Reveal delay={200} className="w-full">
          <div className="tl-item">
            <div className="tl-date">2025</div>
            <div className="tl-title">AI Chat-App — solo project</div>
            <div className="tl-body">
              Real-time messaging with 50ms latency, compound indexing strategy,
              N+1 bulk aggregation fix across 500+ conversations.
            </div>
          </div>
        </Reveal>
        <Reveal delay={300} className="w-full">
          <div className="tl-item">
            <div className="tl-date">2024 – Ongoing</div>
            <div className="tl-title">
              Issues &amp; Deployment Tracker — live
            </div>
            <div className="tl-body">
              Production issue tracker with RBAC, CI/CD pipeline via GitHub
              Actions, full Docker support, Vercel + Render deployment.
            </div>
          </div>
        </Reveal> */}
        <Reveal delay={400} className="w-full">
          <div className="tl-item">
            <div className="tl-date">Jul – Oct 2024</div>
            <div className="tl-title">Java Internship @ SDAC INFOTECH</div>
            <div className="tl-body">
              J2EE ERP portal — learned MVC2, JDBC, stored procedures, BCrypt
              auth, Apache Tomcat deployment end-to-end.
            </div>
          </div>
        </Reveal>
        <Reveal delay={500} className="w-full">
          <div className="tl-item">
            <div className="tl-date">Dec 2021 – Jun 2025</div>
            <div className="tl-title">
              B.E. in Information Technology — SFIT Mumbai
            </div>
            <div className="tl-body">
              St. Francis Institute of Technology. Built the technical
              foundation; started shipping real products from year 2 onwards.
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact({ showCopyNotice }) {
  return (
    <section id="contact" className="section">
      <Reveal className="w-full">
        <div className="sec-header">
          <span className="sec-num">05 //</span>
          <span className="sec-title">CONTACT</span>
          <div className="sec-line"></div>
        </div>
      </Reveal>
      <Reveal delay={100} className="w-full">
        <p
          style={{
            fontSize: "12px",
            color: "var(--text2)",
            fontFamily: "var(--sans)",
            marginBottom: "1.5rem",
            maxWidth: "500px",
          }}
        >
          Open to backend/full-stack roles, internships, and interesting
          engineering problems. Based in Andheri, Mumbai.
        </p>
      </Reveal>

      <div className="contact-grid">
        <Reveal delay={150} className="w-full">
          <ContactCard
            icon="✉"
            label="Email"
            value="sagarjanjoted123@gmail.com"
            href="mailto:sagarjanjoted123@gmail.com"
            onCopy={showCopyNotice}
          />
        </Reveal>
        <Reveal delay={200} className="w-full">
          <ContactCard
            icon="✆"
            label="Phone"
            value="+91 9699-432854"
            href="tel:+919699432854"
            onCopy={showCopyNotice}
          />
        </Reveal>
        <Reveal delay={250} className="w-full">
          <ContactCard
            icon="⌥"
            label="GitHub"
            value="github.com/STRO09"
            href="https://github.com/STRO09"
            onCopy={showCopyNotice}
          />
        </Reveal>
        <Reveal delay={300} className="w-full">
          <ContactCard
            icon="◈"
            label="LinkedIn"
            value="linkedin.com/in/sagar-janjoted"
            href="https://linkedin.com/in/sagar-janjoted"
            onCopy={showCopyNotice}
          />
        </Reveal>
        <Reveal delay={350} className="w-full">
          <ContactCard
            icon="∑"
            label="LeetCode"
            value="leetcode.com/u/stro12 · 150+ solved"
            href="https://leetcode.com/u/stro12"
            onCopy={showCopyNotice}
          />
        </Reveal>
        <Reveal delay={350} className="w-full">
          <ContactCard
            icon="X"
            label="Twitter / X"
            value="@SagarJanjoted11"
            href="https://X.com/SagarJanjoted11"
            onCopy={showCopyNotice}
          />
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "2rem",
        fontSize: "10px",
        color: "var(--text3)",
        borderTop: "1px solid var(--border)",
        letterSpacing: "0.1em",
      }}
    >
      <span>SAGAR JANJOTED · MUMBAI · 2025</span>
      <span style={{ margin: "0 12px", color: "var(--border)" }}>|</span>
      <span style={{ color: "var(--amber)" }}>
        Backend · Full-Stack · Systems
      </span>
    </footer>
  );
}

export default function Home() {
  const [booting, setBooting] = useState(true);
  const [copyVisible, setCopyVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [underlineStyle, setUnderlineStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [scrollY, setScrollY] = useState(0);

  // Parallax tracking
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section observer for navigation sliding active indicator
  useEffect(() => {
    const sections = ["hero", "experience", "projects", "skills", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!activeSection || activeSection === "hero") {
      setUnderlineStyle((prev) => ({ ...prev, opacity: 0 }));
      return;
    }

    const activeLink = document.querySelector(
      `.nav-links a[href="#${activeSection}"]`,
    );
    if (activeLink) {
      setUnderlineStyle({
        left: activeLink.offsetLeft,
        width: activeLink.offsetWidth,
        opacity: 1,
      });
    } else {
      setUnderlineStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeSection]);

  const showCopyNotice = () => {
    setCopyVisible(true);
    setTimeout(() => setCopyVisible(false), 1800);
  };

  return (
    <>
      {booting && <TerminalBoot onComplete={() => setBooting(false)} />}

      <div
        className="grid-bg"
        style={{ transform: `translateY(${scrollY * 0.12}px)` }}
      ></div>

      <Navbar underlineStyle={underlineStyle} />
      <MobileNav activeSection={activeSection} />

      {/* Hero Section */}
      <Hero />

      {/* What I can offer Section */}
      <WhatIDo />

      {/* Metrics */}
      <Metrics />

      {/* Experience Section */}
      <Experience />

      {/* Projects Section */}
      <Projects />

      {/* Skills Section */}
      <Skills />

      {/* Timeline Section */}
      <Journey />

      {/* Contact Section */}
      <Contact showCopyNotice={showCopyNotice} />

      <Footer />

      <div className={`copy-notice ${copyVisible ? "show" : ""}`}>Copied ✓</div>
    </>
  );
}
