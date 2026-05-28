"use client";
import { useState, useEffect, useRef } from "react";
import "./globals.css";

export default function Home() {
  // Experience toggles
  const [slashOpen, setSlashOpen] = useState(true);
  const [sdacOpen, setSdacOpen] = useState(false);
  // Copy notice state
  const [copyVisible, setCopyVisible] = useState(false);
  // Refs for fade-in observer
  const fadeRefs = useRef([]);

  useEffect(() => {
    // IntersectionObserver for fade-in elements
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08 }
    );

    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el) => observer.observe(el));

    // Also trigger for elements already visible
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add("visible");
      }
    });

    return () => observer.disconnect();
  }, []);

  const showCopyNotice = () => {
    setCopyVisible(true);
    setTimeout(() => setCopyVisible(false), 1800);
  };

  const handleContactClick = (e, value, href) => {
    // Original logic: if href starts with http or tel, do not copy
    if (href && (href.startsWith("http") || href.startsWith("tel"))) {
      return; // allow default navigation
    }
    e.preventDefault();
    navigator.clipboard.writeText(value).then(() => {
      showCopyNotice();
    });
  };

  return (
    <>
      <div className="grid-bg"></div>
      <nav>
        <div className="nav-id">
          <div className="nav-dot"></div>
          <span className="nav-name">SAGAR JANJOTED</span>
        </div>
        <div className="nav-links">
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Stack</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="nav-status">
          <div className="status-dot"></div>
          <span>Available for opportunities</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero">
        <div className="hero-left">
          <div className="hero-tag">Backend · Full-Stack · Systems</div>
          <h1>Sagar<br />Janjoted</h1>
          <p className="hero-sub">
            Building scalable REST APIs, real-time systems, and distributed
            architectures. Currently shipping production features at SlashRTC —
            a Mumbai-based RTC startup — across a 15+ microservices telephony
            platform.
          </p>
          <div className="hero-links">
            <a href="mailto:sagarjanjoted123@gmail.com" className="btn btn-primary">
              → Get in touch
            </a>
            <a
              href="https://github.com/STRO09"
              target="_blank"
              className="btn btn-ghost"
            >
              GitHub ↗
            </a>
            <a
              href="https://linkedin.com/in/sagar-janjoted"
              target="_blank"
              className="btn btn-ghost"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
        <div className="hero-right">
          <div className="terminal">
            <div className="term-bar">
              <div className="term-btn" style={{ background: "#e05252" }}></div>
              <div className="term-btn" style={{ background: "#e8a832" }}></div>
              <div className="term-btn" style={{ background: "#4caf6e" }}></div>
              <span style={{ fontSize: "10px", color: "var(--text3)", marginLeft: "8px" }}>
                sagar@slashrtc ~
              </span>
            </div>
            <div className="term-body">
              <div className="term-line">
                <span className="prompt">$</span>
                <span className="cmd">whoami</span>
              </div>
              <div className="out amber">→ Backend-focused Full-Stack Developer</div>
              <div className="out">→ Java · Node.js · Next.js</div>
              <br />
              <div className="term-line">
                <span className="prompt">$</span>
                <span className="cmd">cat current_role.json</span>
              </div>
              <div className="out">
                {"{ company: "}
                <span style={{ color: "var(--teal)" }}>"SlashRTC"</span>,{")"}
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
              <br />
              <div className="term-line">
                <span className="prompt">$</span>
                <span className="cmd">ps aux | grep solved</span>
              </div>
              <div className="out blue">→ DSA problems: 150+</div>
              <div className="out blue">→ Platforms: LeetCode, NeetCode</div>
              <br />
              <div className="term-line">
                <span className="prompt">$</span>
                <span className="cursor"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <div className="section fade-in">
        <div className="metrics-row">
          <div className="metric">
            <span className="metric-val">15+</span>
            <div className="metric-label">Node.js Microservices</div>
          </div>
          <div className="metric">
            <span className="metric-val">50ms</span>
            <div className="metric-label">Chat Latency Achieved</div>
          </div>
          <div className="metric">
            <span className="metric-val">100k+</span>
            <div className="metric-label">Messages per Chat</div>
          </div>
          <div className="metric">
            <span className="metric-val">150+</span>
            <div className="metric-label">DSA Problems Solved</div>
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <section id="experience" className="section fade-in">
        <div className="sec-header">
          <span className="sec-num">01 //</span>
          <span className="sec-title">EXPERIENCE</span>
          <div className="sec-line"></div>
        </div>

        {/* SlashRTC */}
        <div className="exp-item">
          <div className="exp-head" onClick={() => setSlashOpen(!slashOpen)}>
            <div>
              <div className="exp-company">SlashRTC — Mumbai</div>
              <div className="exp-role">Software Developer · Full-Stack</div>
            </div>
            <div className="exp-period">
              Nov 2025 – Present
              <div className="status">● Active</div>
            </div>
          </div>
          <div className={`exp-body ${slashOpen ? "open" : ""}`}>
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
              Building full-stack features in a 3-engineer team, driving the product from active
              development through UAT into production rollout.
            </div>
            <div className="exp-detail">
              Implemented real-time 1:1 and group chat using CI3, Node.js, Socket.IO, and MongoDB
              across a production telephony product.
            </div>
            <div className="exp-detail">
              Debugged and resolved cross-cutting issues in a distributed telephony system spanning
              15+ Node.js microservices, Redis (Bull) job queues, and FreeSWITCH ESL.
            </div>
            <br />
            <div className="arch-diagram">
              <div style={{ fontSize: "10px", color: "var(--text3)", marginBottom: "8px", letterSpacing: "0.1em" }}>
                // SYSTEM TOPOLOGY
              </div>
              <div className="arch-row">
                <div className="arch-box accent">Next.js UI</div>
                <span className="arrow">→</span>
                <div className="arch-box blue">API Gateway</div>
                <span className="arrow">→</span>
                <div className="arch-box green">Node.js Services (15+)</div>
              </div>
              <div className="arch-row" style={{ marginLeft: "90px" }}>
                <span className="arrow" style={{ transform: "rotate(90deg)" }}>
                  ↕
                </span>
              </div>
              <div className="arch-row">
                <div className="arch-box">ScyllaDB</div>
                <span className="arrow">·</span>
                <div className="arch-box">MongoDB</div>
                <span className="arrow">·</span>
                <div className="arch-box teal">Redis (Bull)</div>
                <span className="arrow">·</span>
                <div className="arch-box">FreeSWITCH</div>
              </div>
            </div>
          </div>
        </div>

        {/* SDAC INFOTECH */}
        <div className="exp-item">
          <div className="exp-head" onClick={() => setSdacOpen(!sdacOpen)}>
            <div>
              <div className="exp-company">SDAC INFOTECH — Mumbai</div>
              <div className="exp-role">Java Development Trainee + Intern</div>
            </div>
            <div className="exp-period">Jul 2024 – Oct 2024</div>
          </div>
          <div className={`exp-body ${sdacOpen ? "open" : ""}`}>
            <div className="exp-tags">
              <span className="tag">Java Servlets</span>
              <span className="tag">JDBC</span>
              <span className="tag">JSP</span>
              <span className="tag">MySQL</span>
              <span className="tag">MVC2 Pattern</span>
            </div>
            <div className="exp-detail">
              Built an ERP-style e-commerce portal using Java Servlets, JDBC, JSP, and MySQL
              following MVC2 architectural pattern.
            </div>
            <div className="exp-detail">
              Covered core inventory, order, and user management workflows end-to-end across the
              full J2EE stack.
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section fade-in">
        <div className="sec-header">
          <span className="sec-num">02 //</span>
          <span className="sec-title">PROJECTS</span>
          <div className="sec-line"></div>
        </div>

        <div className="project-grid">
          {/* AI Chat App */}
          <div className="project">
            <div className="project-header">
              <div className="project-name">AI Chat-App</div>
              <span className="project-type type-realtime">Real-Time System</span>
            </div>
            <div className="project-body">
              <p className="project-desc">
                A real-time messaging platform with secure JWT + refresh token auth. An AI
                participant is treated as a first-class user — not a plugin bolted on. Optimized
                for 100k+ messages per conversation through strategic compound indexing.
              </p>
              <div className="arch-diagram">
                <div style={{ fontSize: "10px", color: "var(--text3)", marginBottom: "8px", letterSpacing: "0.1em" }}>
                  // REQUEST FLOW
                </div>
                <div className="arch-row">
                  <div className="arch-box">Client</div>
                  <span className="arrow">→</span>
                  <div className="arch-box accent">CI3 Auth</div>
                  <span className="arrow">→</span>
                  <div className="arch-box green">Socket.IO</div>
                  <span className="arrow">→</span>
                  <div className="arch-box teal">MongoDB</div>
                </div>
                <div className="arch-row" style={{ marginTop: "6px" }}>
                  <div className="arch-box">Unread Counts</div>
                  <span className="arrow">←</span>
                  <div className="arch-box blue">Bulk Aggregation</div>
                  <span style={{ color: "var(--text3)", fontSize: "10px", marginLeft: "8px" }}>
                    // solved N+1
                  </span>
                </div>
                <div style={{ marginTop: "8px", fontSize: "10px", color: "var(--text3)" }}>
                  compound index: {"{ conversationId, createdAt, readBy }"} → 50ms latency
                </div>
              </div>
              <div className="stat-row">
                <div className="stat">
                  <span className="stat-val">50ms</span>
                  <span className="stat-label">msg latency</span>
                </div>
                <div className="stat">
                  <span className="stat-val">100k+</span>
                  <span className="stat-label">msgs/chat</span>
                </div>
                <div className="stat">
                  <span className="stat-val">500+</span>
                  <span className="stat-label">conversations (N+1 fixed)</span>
                </div>
              </div>
              <div className="project-links">
                <a href="https://github.com/STRO09" target="_blank" className="plink">
                  ⎋ GitHub
                </a>
              </div>
            </div>
          </div>

          {/* E-commerce ERP Portal */}
          <div className="project">
            <div className="project-header">
              <div className="project-name">E-Commerce ERP Portal</div>
              <span className="project-type type-erp">ERP · J2EE</span>
            </div>
            <div className="project-body">
              <p className="project-desc">
                Dual-role ERP-style system covering 10+ workflows and a 4-stage order lifecycle.
                Designed to SRS requirements with a normalized relational schema, stored
                procedures, and triggers for inventory consistency.
              </p>
              <div className="arch-diagram">
                <div style={{ fontSize: "10px", color: "var(--text3)", marginBottom: "8px", letterSpacing: "0.1em" }}>
                  // LAYER STACK
                </div>
                <div className="arch-row" style={{ flexDirection: "column", alignItems: "flex-start", gap: "4px" }}>
                  <div className="arch-box blue" style={{ width: "100%", textAlign: "center" }}>
                    JSP — View Layer
                  </div>
                  <div style={{ color: "var(--text3)", fontSize: "10px", paddingLeft: "12px" }}>
                    ↕ MVC2
                  </div>
                  <div className="arch-box" style={{ width: "100%", textAlign: "center" }}>
                    Java Servlets — Controller
                  </div>
                  <div style={{ color: "var(--text3)", fontSize: "10px", paddingLeft: "12px" }}>
                    ↕ JDBC
                  </div>
                  <div className="arch-box teal" style={{ width: "100%", textAlign: "center" }}>
                    MySQL — stored procs + triggers
                  </div>
                </div>
                <div style={{ marginTop: "8px", fontSize: "10px", color: "var(--text3)" }}>
                  auth: BCrypt · deploy: Apache Tomcat · roles: admin / customer
                </div>
              </div>
              <div className="stat-row">
                <div className="stat">
                  <span className="stat-val">10+</span>
                  <span className="stat-label">workflows</span>
                </div>
                <div className="stat">
                  <span className="stat-val">4-stage</span>
                  <span className="stat-label">order lifecycle</span>
                </div>
              </div>
              <div className="project-links">
                <a href="https://github.com/STRO09" target="_blank" className="plink">
                  ⎋ GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Issues & Deployment Tracker */}
          <div className="project">
            <div className="project-header">
              <div className="project-name">Issues &amp; Deployment Tracker</div>
              <span className="project-type type-infra">Infra · CI/CD · Live</span>
            </div>
            <div className="project-body">
              <p className="project-desc">
                Production-style issue tracking with role-based access control and clear
                authorization boundaries across user roles. Fully deployed with CI/CD via GitHub
                Actions. Backend validated with H2 in-memory DB before shipping to production.
              </p>
              <div className="arch-diagram">
                <div style={{ fontSize: "10px", color: "var(--text3)", marginBottom: "8px", letterSpacing: "0.1em" }}>
                  // DEPLOYMENT MAP
                </div>
                <div className="arch-row">
                  <div className="arch-box green">GitHub Actions</div>
                  <span className="arrow">→</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <div className="arch-row" style={{ margin: 0 }}>
                      <div className="arch-box blue">Vercel (Next.js)</div>
                    </div>
                    <div className="arch-row" style={{ margin: 0 }}>
                      <div className="arch-box teal">Render / Jetty (J2EE)</div>
                    </div>
                  </div>
                </div>
                <div className="arch-row" style={{ marginTop: "6px" }}>
                  <div className="arch-box accent">Hibernate ORM</div>
                  <span className="arrow">→</span>
                  <div className="arch-box">PostgreSQL</div>
                  <span className="arrow">·</span>
                  <div className="arch-box">H2 (test)</div>
                  <span style={{ fontSize: "10px", color: "var(--text3)", marginLeft: "6px" }}>
                    · Docker
                  </span>
                </div>
              </div>
              <div className="stat-row">
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
              <div className="project-links">
                <a href="#" className="plink">
                  ↗ Live
                </a>
                <a href="https://github.com/STRO09" target="_blank" className="plink">
                  ⎋ GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section fade-in">
        <div className="sec-header">
          <span className="sec-num">03 //</span>
          <span className="sec-title">STACK &amp; TOOLS</span>
          <div className="sec-line"></div>
        </div>
        <div className="skills-grid">
          <div className="skill-group">
            <div className="skill-group-title">Backend</div>
            <div className="skill-item">
              <span className="skill-name">Node.js / Express.js</span>
              <div className="skill-bar">
                <div className="skill-fill" style={{ width: "88%" }}></div>
              </div>
            </div>
            <div className="skill-item">
              <span className="skill-name">Java / Spring Boot</span>
              <div className="skill-bar">
                <div className="skill-fill" style={{ width: "80%" }}></div>
              </div>
            </div>
            <div className="skill-item">
              <span className="skill-name">Hibernate / JPA</span>
              <div className="skill-bar">
                <div className="skill-fill" style={{ width: "75%" }}></div>
              </div>
            </div>
            <div className="skill-item">
              <span className="skill-name">CodeIgniter 3</span>
              <div className="skill-bar">
                <div className="skill-fill" style={{ width: "70%" }}></div>
              </div>
            </div>
          </div>
          <div className="skill-group">
            <div className="skill-group-title">Frontend</div>
            <div className="skill-item">
              <span className="skill-name">Next.js (App Router)</span>
              <div className="skill-bar">
                <div className="skill-fill" style={{ width: "82%" }}></div>
              </div>
            </div>
            <div className="skill-item">
              <span className="skill-name">React.js</span>
              <div className="skill-bar">
                <div className="skill-fill" style={{ width: "78%" }}></div>
              </div>
            </div>
            <div className="skill-item">
              <span className="skill-name">Redux</span>
              <div className="skill-bar">
                <div className="skill-fill" style={{ width: "70%" }}></div>
              </div>
            </div>
            <div className="skill-item">
              <span className="skill-name">TypeScript</span>
              <div className="skill-bar">
                <div className="skill-fill" style={{ width: "65%" }}></div>
              </div>
            </div>
          </div>
          <div className="skill-group">
            <div className="skill-group-title">Databases</div>
            <div className="skill-item">
              <span className="skill-name">PostgreSQL / MySQL</span>
              <div className="skill-bar">
                <div className="skill-fill" style={{ width: "82%" }}></div>
              </div>
            </div>
            <div className="skill-item">
              <span className="skill-name">MongoDB</span>
              <div className="skill-bar">
                <div className="skill-fill" style={{ width: "78%" }}></div>
              </div>
            </div>
            <div className="skill-item">
              <span className="skill-name">Redis</span>
              <div className="skill-bar">
                <div className="skill-fill" style={{ width: "72%" }}></div>
              </div>
            </div>
            <div className="skill-item">
              <span className="skill-name">ScyllaDB</span>
              <div className="skill-bar">
                <div className="skill-fill" style={{ width: "60%" }}></div>
              </div>
            </div>
          </div>
          <div className="skill-group">
            <div className="skill-group-title">DevOps &amp; Tools</div>
            <div className="skill-item">
              <span className="skill-name">Docker</span>
              <div className="skill-bar">
                <div className="skill-fill" style={{ width: "72%" }}></div>
              </div>
            </div>
            <div className="skill-item">
              <span className="skill-name">GitHub Actions (CI/CD)</span>
              <div className="skill-bar">
                <div className="skill-fill" style={{ width: "75%" }}></div>
              </div>
            </div>
            <div className="skill-item">
              <span className="skill-name">Socket.IO / Real-time</span>
              <div className="skill-bar">
                <div className="skill-fill" style={{ width: "85%" }}></div>
              </div>
            </div>
            <div className="skill-item">
              <span className="skill-name">Git / GitHub</span>
              <div className="skill-bar">
                <div className="skill-fill" style={{ width: "90%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section fade-in">
        <div className="sec-header">
          <span className="sec-num">04 //</span>
          <span className="sec-title">JOURNEY</span>
          <div className="sec-line"></div>
        </div>
        <div className="timeline">
          <div className="tl-item">
            <div className="tl-date">Nov 2025 – Present</div>
            <div className="tl-title">Software Developer @ SlashRTC</div>
            <div className="tl-body">
              Debugging distributed telephony systems, shipping real-time chat, navigating 15+
              microservices in production.
            </div>
          </div>
          <div className="tl-item">
            <div className="tl-date">2025</div>
            <div className="tl-title">AI Chat-App — solo project</div>
            <div className="tl-body">
              Real-time messaging with 50ms latency, compound indexing strategy, N+1 bulk
              aggregation fix across 500+ conversations.
            </div>
          </div>
          <div className="tl-item">
            <div className="tl-date">2024 – Ongoing</div>
            <div className="tl-title">Issues &amp; Deployment Tracker — live</div>
            <div className="tl-body">
              Production issue tracker with RBAC, CI/CD pipeline via GitHub Actions, full Docker
              support, Vercel + Render deployment.
            </div>
          </div>
          <div className="tl-item">
            <div className="tl-date">Jul – Oct 2024</div>
            <div className="tl-title">Java Internship @ SDAC INFOTECH</div>
            <div className="tl-body">
              J2EE ERP portal — learned MVC2, JDBC, stored procedures, BCrypt auth, Apache Tomcat
              deployment end-to-end.
            </div>
          </div>
          <div className="tl-item">
            <div className="tl-date">Dec 2021 – Jun 2025</div>
            <div className="tl-title">B.E. in Information Technology — SFIT Mumbai</div>
            <div className="tl-body">
              St. Francis Institute of Technology. Built the technical foundation; started shipping
              real products from year 2 onwards.
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section fade-in">
        <div className="sec-header">
          <span className="sec-num">05 //</span>
          <span className="sec-title">CONTACT</span>
          <div className="sec-line"></div>
        </div>
        <p
          style={{
            fontSize: "12px",
            color: "var(--text2)",
            fontFamily: "var(--sans)",
            marginBottom: "1.5rem",
            maxWidth: "500px",
          }}
        >
          Open to backend/full-stack roles, internships, and interesting engineering problems.
          Based in Andheri, Mumbai.
        </p>
        <div className="contact-grid">
          <a
            href="mailto:sagarjanjoted123@gmail.com"
            className="contact-item"
            onClick={(e) => handleContactClick(e, "sagarjanjoted123@gmail.com", "mailto:sagarjanjoted123@gmail.com")}
          >
            <span className="contact-icon">✉</span>
            <div className="contact-info">
              <div className="label">Email</div>
              <div className="value">sagarjanjoted123@gmail.com</div>
            </div>
          </a>
          <a
            href="tel:+919699432854"
            className="contact-item"
            onClick={(e) => handleContactClick(e, "+91 9699-432854", "tel:+919699432854")}
          >
            <span className="contact-icon">✆</span>
            <div className="contact-info">
              <div className="label">Phone</div>
              <div className="value">+91 9699-432854</div>
            </div>
          </a>
          <a
            href="https://github.com/STRO09"
            target="_blank"
            className="contact-item"
            onClick={(e) => handleContactClick(e, "github.com/STRO09", "https://github.com/STRO09")}
          >
            <span className="contact-icon">⌥</span>
            <div className="contact-info">
              <div className="label">GitHub</div>
              <div className="value">github.com/STRO09</div>
            </div>
          </a>
          <a
            href="https://linkedin.com/in/sagar-janjoted"
            target="_blank"
            className="contact-item"
            onClick={(e) => handleContactClick(e, "linkedin.com/in/sagar-janjoted", "https://linkedin.com/in/sagar-janjoted")}
          >
            <span className="contact-icon">◈</span>
            <div className="contact-info">
              <div className="label">LinkedIn</div>
              <div className="value">linkedin.com/in/sagar-janjoted</div>
            </div>
          </a>
          <a
            href="https://leetcode.com/u/stro12"
            target="_blank"
            className="contact-item"
            onClick={(e) => handleContactClick(e, "leetcode.com/u/stro12 · 150+ solved", "https://leetcode.com/u/stro12")}
          >
            <span className="contact-icon">∑</span>
            <div className="contact-info">
              <div className="label">LeetCode</div>
              <div className="value">leetcode.com/u/stro12 · 150+ solved</div>
            </div>
          </a>
        </div>
      </section>

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
        <span style={{ color: "var(--amber)" }}>Backend · Full-Stack · Systems</span>
      </footer>

      <div className={`copy-notice ${copyVisible ? "show" : ""}`}>Copied ✓</div>
    </>
  );
}