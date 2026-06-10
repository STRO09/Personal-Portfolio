"use client";
import React, { useEffect, useRef, useState } from "react";

// Hook to trigger animation once when entering viewport
function useDiagramReveal() {
  const [active, setActive] = useState(false);
  const [packetsActive, setPacketsActive] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          setPacketsActive(true);
          // Stop packets after 2 seconds
          const timer = setTimeout(() => {
            setPacketsActive(false);
          }, 2200);
          observer.unobserve(el);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    // Initial check
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setActive(true);
      setPacketsActive(true);
      const timer = setTimeout(() => {
        setPacketsActive(false);
      }, 2200);
      observer.unobserve(el);
      return () => clearTimeout(timer);
    }

    return () => observer.disconnect();
  }, []);

  return [ref, active, packetsActive];
}

export function TopologyDiagram() {
  const [ref, active, packetsActive] = useDiagramReveal();

  return (
    <div ref={ref} className="arch-diagram mt-4 select-none">
      <div className="text-[10px] text-[var(--text3)] mb-3 tracking-wider font-mono">
        // SYSTEM TOPOLOGY (SLASHRTC)
      </div>
      <svg
        viewBox="0 0 460 140"
        width="100%"
        height="100%"
        className="font-mono"
        style={{ overflow: "visible" }}
      >
        {/* Connection Lines */}
        {active && (
          <>
            {/* Next.js -> API Gateway */}
            <path
              id="t-path1"
              d="M 90 30 L 150 30"
              fill="none"
              stroke="var(--border2)"
              strokeWidth="1"
              strokeDasharray="100"
              strokeDashoffset="100"
              className="animate-draw-line"
            />
            {/* API Gateway -> Node.js Services */}
            <path
              id="t-path2"
              d="M 240 30 L 300 30"
              fill="none"
              stroke="var(--border2)"
              strokeWidth="1"
              strokeDasharray="100"
              strokeDashoffset="100"
              className="animate-draw-line"
              style={{ animationDelay: "200ms" }}
            />
            {/* Bus Line & Down links to DBs */}
            <path
              id="t-path3"
              d="M 370 45 L 370 70 M 50 70 L 370 70 M 50 70 L 50 90"
              fill="none"
              stroke="var(--border2)"
              strokeWidth="1"
              strokeDasharray="300"
              strokeDashoffset="300"
              className="animate-draw-line"
              style={{ animationDelay: "400ms" }}
            />
            <path
              id="t-path4"
              d="M 155 70 L 155 90"
              fill="none"
              stroke="var(--border2)"
              strokeWidth="1"
              strokeDasharray="50"
              strokeDashoffset="50"
              className="animate-draw-line"
              style={{ animationDelay: "600ms" }}
            />
            <path
              id="t-path5"
              d="M 260 70 L 260 90"
              fill="none"
              stroke="var(--border2)"
              strokeWidth="1"
              strokeDasharray="50"
              strokeDashoffset="50"
              className="animate-draw-line"
              style={{ animationDelay: "600ms" }}
            />
            <path
              id="t-path6"
              d="M 370 70 L 370 90"
              fill="none"
              stroke="var(--border2)"
              strokeWidth="1"
              strokeDasharray="50"
              strokeDashoffset="50"
              className="animate-draw-line"
              style={{ animationDelay: "600ms" }}
            />
          </>
        )}

        {/* Data Packets */}
        {packetsActive && (
          <>
            <circle r="2" fill="var(--amber)">
              <animateMotion dur="1s" repeatCount="2" fill="freeze">
                <mpath href="#t-path1" />
              </animateMotion>
            </circle>
            <circle r="2" fill="var(--green)">
              <animateMotion dur="1.2s" begin="0.2s" repeatCount="1" fill="freeze">
                <mpath href="#t-path2" />
              </animateMotion>
            </circle>
            <circle r="2" fill="var(--teal)">
              <animateMotion dur="1.5s" begin="0.4s" repeatCount="1" fill="freeze">
                <mpath href="#t-path3" />
              </animateMotion>
            </circle>
            <circle r="2" fill="var(--blue)">
              <animateMotion dur="1.2s" begin="0.6s" repeatCount="1" fill="freeze">
                <mpath href="#t-path5" />
              </animateMotion>
            </circle>
          </>
        )}

        {/* Nodes */}
        {/* Next.js UI */}
        <rect
          x="10"
          y="15"
          width="80"
          height="30"
          rx="4"
          fill="var(--bg4)"
          stroke="var(--amber)"
          strokeWidth="1"
        />
        <text
          x="50"
          y="34"
          fill="var(--amber)"
          fontSize="9"
          textAnchor="middle"
          fontWeight="bold"
        >
          Next.js UI
        </text>

        {/* API Gateway */}
        <rect
          x="150"
          y="15"
          width="90"
          height="30"
          rx="4"
          fill="var(--bg4)"
          stroke="var(--blue)"
          strokeWidth="1"
        />
        <text
          x="195"
          y="34"
          fill="var(--blue)"
          fontSize="9"
          textAnchor="middle"
        >
          API Gateway
        </text>

        {/* Node.js Services */}
        <rect
          x="300"
          y="15"
          width="140"
          height="30"
          rx="4"
          fill="var(--bg4)"
          stroke="var(--green)"
          strokeWidth="1"
        />
        <text
          x="370"
          y="34"
          fill="var(--green)"
          fontSize="9"
          textAnchor="middle"
        >
          Node Services (15+)
        </text>

        {/* Databases Row */}
        {/* ScyllaDB */}
        <rect
          x="10"
          y="90"
          width="80"
          height="30"
          rx="4"
          fill="var(--bg4)"
          stroke="var(--border)"
          strokeWidth="1"
        />
        <text
          x="50"
          y="108"
          fill="var(--text2)"
          fontSize="9"
          textAnchor="middle"
        >
          ScyllaDB
        </text>

        {/* MongoDB */}
        <rect
          x="110"
          y="90"
          width="80"
          height="30"
          rx="4"
          fill="var(--bg4)"
          stroke="var(--border)"
          strokeWidth="1"
        />
        <text
          x="150"
          y="108"
          fill="var(--text2)"
          fontSize="9"
          textAnchor="middle"
        >
          MongoDB
        </text>

        {/* Redis (Bull) */}
        <rect
          x="210"
          y="90"
          width="100"
          height="30"
          rx="4"
          fill="var(--bg4)"
          stroke="var(--teal)"
          strokeWidth="1"
        />
        <text
          x="260"
          y="108"
          fill="var(--teal)"
          fontSize="9"
          textAnchor="middle"
        >
          Redis (Bull)
        </text>

        {/* FreeSWITCH */}
        <rect
          x="330"
          y="90"
          width="110"
          height="30"
          rx="4"
          fill="var(--bg4)"
          stroke="var(--border)"
          strokeWidth="1"
        />
        <text
          x="385"
          y="108"
          fill="var(--text2)"
          fontSize="9"
          textAnchor="middle"
        >
          FreeSWITCH
        </text>
      </svg>
    </div>
  );
}

export function RequestFlowDiagram() {
  const [ref, active, packetsActive] = useDiagramReveal();

  return (
    <div ref={ref} className="arch-diagram mt-4 select-none">
      <div className="text-[10px] text-[var(--text3)] mb-3 tracking-wider font-mono">
        // REQUEST FLOW (AI CHAT APP)
      </div>
      <svg
        viewBox="0 0 460 130"
        width="100%"
        height="100%"
        className="font-mono"
        style={{ overflow: "visible" }}
      >
        {/* Connections */}
        {active && (
          <>
            {/* Client -> Auth */}
            <path
              id="rf-path1"
              d="M 80 25 L 140 25"
              fill="none"
              stroke="var(--border2)"
              strokeWidth="1"
              strokeDasharray="60"
              strokeDashoffset="60"
              className="animate-draw-line"
            />
            {/* Auth -> Socket.IO */}
            <path
              id="rf-path2"
              d="M 220 25 L 280 25"
              fill="none"
              stroke="var(--border2)"
              strokeWidth="1"
              strokeDasharray="60"
              strokeDashoffset="60"
              className="animate-draw-line"
              style={{ animationDelay: "200ms" }}
            />
            {/* Socket.IO -> MongoDB */}
            <path
              id="rf-path3"
              d="M 370 25 L 390 25"
              fill="none"
              stroke="var(--border2)"
              strokeWidth="1"
              strokeDasharray="40"
              strokeDashoffset="40"
              className="animate-draw-line"
              style={{ animationDelay: "400ms" }}
            />
            {/* Bulk Aggregation -> Unread Counts */}
            <path
              id="rf-path4"
              d="M 280 85 L 220 85"
              fill="none"
              stroke="var(--border2)"
              strokeWidth="1"
              strokeDasharray="60"
              strokeDashoffset="60"
              className="animate-draw-line"
              style={{ animationDelay: "300ms" }}
            />
          </>
        )}

        {/* Data Packets */}
        {packetsActive && (
          <>
            <circle r="2" fill="var(--amber)">
              <animateMotion dur="0.8s" repeatCount="1" fill="freeze">
                <mpath href="#rf-path1" />
              </animateMotion>
            </circle>
            <circle r="2" fill="var(--green)">
              <animateMotion dur="0.8s" begin="0.2s" repeatCount="1" fill="freeze">
                <mpath href="#rf-path2" />
              </animateMotion>
            </circle>
            <circle r="2" fill="var(--teal)">
              <animateMotion dur="0.6s" begin="0.4s" repeatCount="1" fill="freeze">
                <mpath href="#rf-path3" />
              </animateMotion>
            </circle>
            <circle r="2" fill="var(--blue)">
              <animateMotion dur="0.8s" begin="0.3s" repeatCount="1" fill="freeze">
                <mpath href="#rf-path4" />
              </animateMotion>
            </circle>
          </>
        )}

        {/* Row 1 Nodes */}
        {/* Client */}
        <rect
          x="10"
          y="10"
          width="70"
          height="30"
          rx="4"
          fill="var(--bg4)"
          stroke="var(--border)"
          strokeWidth="1"
        />
        <text
          x="45"
          y="28"
          fill="var(--text2)"
          fontSize="9"
          textAnchor="middle"
        >
          Client
        </text>

        {/* CI3 Auth */}
        <rect
          x="140"
          y="10"
          width="80"
          height="30"
          rx="4"
          fill="var(--bg4)"
          stroke="var(--amber)"
          strokeWidth="1"
        />
        <text
          x="180"
          y="28"
          fill="var(--amber)"
          fontSize="9"
          textAnchor="middle"
          fontWeight="bold"
        >
          CI3 Auth
        </text>

        {/* Socket.IO */}
        <rect
          x="280"
          y="10"
          width="90"
          height="30"
          rx="4"
          fill="var(--bg4)"
          stroke="var(--green)"
          strokeWidth="1"
        />
        <text
          x="325"
          y="28"
          fill="var(--green)"
          fontSize="9"
          textAnchor="middle"
        >
          Socket.IO
        </text>

        {/* MongoDB */}
        <rect
          x="390"
          y="10"
          width="60"
          height="30"
          rx="4"
          fill="var(--bg4)"
          stroke="var(--teal)"
          strokeWidth="1"
        />
        <text
          x="420"
          y="28"
          fill="var(--teal)"
          fontSize="9"
          textAnchor="middle"
        >
          MongoDB
        </text>

        {/* Row 2 Nodes */}
        {/* Unread Counts */}
        <rect
          x="100"
          y="70"
          width="120"
          height="30"
          rx="4"
          fill="var(--bg4)"
          stroke="var(--border)"
          strokeWidth="1"
        />
        <text
          x="160"
          y="88"
          fill="var(--text2)"
          fontSize="9"
          textAnchor="middle"
        >
          Unread Counts
        </text>

        {/* Bulk Aggregation */}
        <rect
          x="280"
          y="70"
          width="130"
          height="30"
          rx="4"
          fill="var(--bg4)"
          stroke="var(--blue)"
          strokeWidth="1"
        />
        <text
          x="345"
          y="88"
          fill="var(--blue)"
          fontSize="9"
          textAnchor="middle"
        >
          Bulk Aggregation
        </text>
      </svg>
    </div>
  );
}

export function StackDiagram() {
  const [ref, active, packetsActive] = useDiagramReveal();

  return (
    <div ref={ref} className="arch-diagram mt-4 select-none">
      <div className="text-[10px] text-[var(--text3)] mb-3 tracking-wider font-mono">
        // LAYER STACK (MVC2 ERP)
      </div>
      <svg
        viewBox="0 0 460 150"
        width="100%"
        height="100%"
        className="font-mono"
        style={{ overflow: "visible" }}
      >
        {/* Vertical Lines */}
        {active && (
          <>
            {/* View -> Controller (Down) */}
            <path
              id="sd-path1"
              d="M 220 35 L 220 60"
              fill="none"
              stroke="var(--border2)"
              strokeWidth="1"
              strokeDasharray="25"
              strokeDashoffset="25"
              className="animate-draw-line"
            />
            {/* Controller -> View (Up) */}
            <path
              id="sd-path2"
              d="M 240 60 L 240 35"
              fill="none"
              stroke="var(--border2)"
              strokeWidth="1"
              strokeDasharray="25"
              strokeDashoffset="25"
              className="animate-draw-line"
              style={{ animationDelay: "100ms" }}
            />
            {/* Controller -> DB (Down) */}
            <path
              id="sd-path3"
              d="M 220 85 L 220 110"
              fill="none"
              stroke="var(--border2)"
              strokeWidth="1"
              strokeDasharray="25"
              strokeDashoffset="25"
              className="animate-draw-line"
              style={{ animationDelay: "200ms" }}
            />
            {/* DB -> Controller (Up) */}
            <path
              id="sd-path4"
              d="M 240 110 L 240 85"
              fill="none"
              stroke="var(--border2)"
              strokeWidth="1"
              strokeDasharray="25"
              strokeDashoffset="25"
              className="animate-draw-line"
              style={{ animationDelay: "300ms" }}
            />
          </>
        )}

        {/* Data Packets */}
        {packetsActive && (
          <>
            <circle r="1.5" fill="var(--blue)">
              <animateMotion dur="0.6s" repeatCount="1" fill="freeze">
                <mpath href="#sd-path1" />
              </animateMotion>
            </circle>
            <circle r="1.5" fill="var(--amber)">
              <animateMotion dur="0.6s" begin="0.5s" repeatCount="1" fill="freeze">
                <mpath href="#sd-path3" />
              </animateMotion>
            </circle>
            <circle r="1.5" fill="var(--teal)">
              <animateMotion dur="0.6s" begin="0.9s" repeatCount="1" fill="freeze">
                <mpath href="#sd-path4" />
              </animateMotion>
            </circle>
            <circle r="1.5" fill="var(--text2)">
              <animateMotion dur="0.6s" begin="1.3s" repeatCount="1" fill="freeze">
                <mpath href="#sd-path2" />
              </animateMotion>
            </circle>
          </>
        )}

        {/* Layer 1: JSP View */}
        <rect
          x="130"
          y="10"
          width="200"
          height="25"
          rx="4"
          fill="var(--bg4)"
          stroke="var(--blue)"
          strokeWidth="1"
        />
        <text
          x="230"
          y="26"
          fill="var(--blue)"
          fontSize="9"
          textAnchor="middle"
        >
          JSP — View Layer
        </text>

        {/* Layer 2: Java Servlets Controller */}
        <rect
          x="130"
          y="60"
          width="200"
          height="25"
          rx="4"
          fill="var(--bg4)"
          stroke="var(--border)"
          strokeWidth="1"
        />
        <text
          x="230"
          y="76"
          fill="var(--text2)"
          fontSize="9"
          textAnchor="middle"
        >
          Java Servlets — Controller
        </text>

        {/* Layer 3: MySQL */}
        <rect
          x="130"
          y="110"
          width="200"
          height="25"
          rx="4"
          fill="var(--bg4)"
          stroke="var(--teal)"
          strokeWidth="1"
        />
        <text
          x="230"
          y="126"
          fill="var(--teal)"
          fontSize="9"
          textAnchor="middle"
        >
          MySQL — Stored Procs & Triggers
        </text>
      </svg>
    </div>
  );
}

export function DeploymentDiagram() {
  const [ref, active, packetsActive] = useDiagramReveal();

  return (
    <div ref={ref} className="arch-diagram mt-4 select-none">
      <div className="text-[10px] text-[var(--text3)] mb-3 tracking-wider font-mono">
        // INFRASTRUCTURE & DEPLOYMENT MAP
      </div>
      <svg
        viewBox="0 0 460 130"
        width="100%"
        height="100%"
        className="font-mono"
        style={{ overflow: "visible" }}
      >
        {/* Connection paths */}
        {active && (
          <>
            {/* Actions -> Vercel (branch up) */}
            <path
              id="dep-path1"
              d="M 120 40 C 150 40, 150 20, 180 20"
              fill="none"
              stroke="var(--border2)"
              strokeWidth="1"
              strokeDasharray="80"
              strokeDashoffset="80"
              className="animate-draw-line"
            />
            {/* Actions -> Render (branch down) */}
            <path
              id="dep-path2"
              d="M 120 40 C 150 40, 150 75, 180 75"
              fill="none"
              stroke="var(--border2)"
              strokeWidth="1"
              strokeDasharray="80"
              strokeDashoffset="80"
              className="animate-draw-line"
              style={{ animationDelay: "150ms" }}
            />
            {/* Vercel -> PostgreSQL */}
            <path
              id="dep-path3"
              d="M 310 20 C 330 20, 335 48, 350 48"
              fill="none"
              stroke="var(--border2)"
              strokeWidth="1"
              strokeDasharray="60"
              strokeDashoffset="60"
              className="animate-draw-line"
              style={{ animationDelay: "300ms" }}
            />
            {/* Render -> PostgreSQL */}
            <path
              id="dep-path4"
              d="M 310 75 C 330 75, 335 48, 350 48"
              fill="none"
              stroke="var(--border2)"
              strokeWidth="1"
              strokeDasharray="60"
              strokeDashoffset="60"
              className="animate-draw-line"
              style={{ animationDelay: "300ms" }}
            />
          </>
        )}

        {/* Data Packets */}
        {packetsActive && (
          <>
            <circle r="1.5" fill="var(--blue)">
              <animateMotion dur="0.9s" repeatCount="1" fill="freeze">
                <mpath href="#dep-path1" />
              </animateMotion>
            </circle>
            <circle r="1.5" fill="var(--amber)">
              <animateMotion dur="1s" begin="0.15s" repeatCount="1" fill="freeze">
                <mpath href="#dep-path2" />
              </animateMotion>
            </circle>
            <circle r="1.5" fill="var(--teal)">
              <animateMotion dur="0.7s" begin="0.9s" repeatCount="1" fill="freeze">
                <mpath href="#dep-path3" />
              </animateMotion>
            </circle>
          </>
        )}

        {/* GitHub Actions */}
        <rect
          x="10"
          y="25"
          width="110"
          height="30"
          rx="4"
          fill="var(--bg4)"
          stroke="var(--green)"
          strokeWidth="1"
        />
        <text
          x="65"
          y="43"
          fill="var(--green)"
          fontSize="9"
          textAnchor="middle"
        >
          GitHub Actions
        </text>

        {/* Vercel */}
        <rect
          x="180"
          y="5"
          width="130"
          height="30"
          rx="4"
          fill="var(--bg4)"
          stroke="var(--blue)"
          strokeWidth="1"
        />
        <text
          x="245"
          y="23"
          fill="var(--blue)"
          fontSize="9"
          textAnchor="middle"
        >
          Vercel (Next.js)
        </text>

        {/* Render */}
        <rect
          x="180"
          y="60"
          width="130"
          height="30"
          rx="4"
          fill="var(--bg4)"
          stroke="var(--amber)"
          strokeWidth="1"
        />
        <text
          x="245"
          y="78"
          fill="var(--amber)"
          fontSize="9"
          textAnchor="middle"
        >
          Render / Jetty
        </text>

        {/* PostgreSQL */}
        <rect
          x="350"
          y="33"
          width="100"
          height="30"
          rx="4"
          fill="var(--bg4)"
          stroke="var(--teal)"
          strokeWidth="1"
        />
        <text
          x="400"
          y="51"
          fill="var(--teal)"
          fontSize="9"
          textAnchor="middle"
        >
          PostgreSQL
        </text>
      </svg>
    </div>
  );
}
