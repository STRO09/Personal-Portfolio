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
          // SYSTEM TOPOLOGY — SLASHRTC (2 PRODUCTS)
        </div>
        <svg
          viewBox="0 0 510 200"
          width="100%"
          height="100%"
          className="font-mono"
          style={{ overflow: "visible" }}
        >
          {/* ─── PRODUCT LABELS ─── */}
          <text x="5" y="10" fill="var(--text3)" fontSize="7" letterSpacing="0.08em">
            TELEPHONY PLATFORM · trace + debug
          </text>
          <text x="264" y="10" fill="var(--text3)" fontSize="7" letterSpacing="0.08em">
            TICKET PORTAL · active dev
          </text>

          {/* Divider */}
          <line
            x1="254" y1="14" x2="254" y2="145"
            stroke="var(--border)" strokeWidth="0.5" strokeDasharray="3 3"
          />

          {/* ─── CONNECTION LINES ─── */}
          {active && (
            <>
              {/* CI3 → Services */}
              <path id="tp-l1" d="M 118 45 L 118 62"
                fill="none" stroke="var(--border2)" strokeWidth="1"
                strokeDasharray="20" strokeDashoffset="20"
                className="animate-draw-line" />
              {/* JsSIP → Services */}
              {/* <path id="tp-l2" d="M 129 45 L 129 62"
                fill="none" stroke="var(--border2)" strokeWidth="1"
                strokeDasharray="20" strokeDashoffset="20"
                className="animate-draw-line" style={{ animationDelay: "150ms" }} /> */}
              {/* Services → FreeSWITCH */}
              <path id="tp-l3" d="M 45 98 L 45 112"
                fill="none" stroke="var(--border2)" strokeWidth="1"
                strokeDasharray="16" strokeDashoffset="16"
                className="animate-draw-line" style={{ animationDelay: "300ms" }} />
              {/* Services → Redis */}
              <path id="tp-l4" d="M 163 98 L 163 112"
                fill="none" stroke="var(--border2)" strokeWidth="1"
                strokeDasharray="16" strokeDashoffset="16"
                className="animate-draw-line" style={{ animationDelay: "420ms" }} />
              {/* Redis Queues → Redis */}
              <path id="tp-l5" d="M 163 139 L 100 162"
                fill="none" stroke="var(--border2)"strokeWidth="1"
                strokeDasharray="70" strokeDashoffset="70"
                className="animate-draw-line" style={{ animationDelay: "520ms" }} />

              {/* Redis Queues → MongoDB */}
              <path id="tp-l6"d="M 163 139 L 163 162"
                fill="none" stroke="var(--border2)" strokeWidth="1"
                strokeDasharray="30" strokeDashoffset="30"
                className="animate-draw-line" style={{ animationDelay: "620ms" }} />

              {/* Redis Queues → MySQL */}
              <path
                id="tp-l7" d="M 163 139 L 220 162"
                fill="none" stroke="var(--border2)" strokeWidth="1"
                strokeDasharray="70" strokeDashoffset="70"
                className="animate-draw-line" style={{ animationDelay: "720ms" }} />
              {/* Services → Kamailio */}
              {/* <path id="tp-l5" d="M 213 98 L 213 112"
                fill="none" stroke="var(--border2)" strokeWidth="1"
                strokeDasharray="16" strokeDashoffset="16"
                className="animate-draw-line" style={{ animationDelay: "520ms" }} /> */}
              {/* Next.js → Node */}
              <path id="tp-r1" d="M 320 45 L 320 62"
                fill="none" stroke="var(--border2)" strokeWidth="1"
                strokeDasharray="20" strokeDashoffset="20"
                className="animate-draw-line" style={{ animationDelay: "200ms" }} />
              {/* Node → ScyllaDB */}
              <path id="tp-r2" d="M 320 98 L 320 112"
                fill="none" stroke="var(--border2)" strokeWidth="1"
                strokeDasharray="16" strokeDashoffset="16"
                className="animate-draw-line" style={{ animationDelay: "450ms" }} />
            </>
          )}

          {/* ─── DATA PACKETS ─── */}
          {packetsActive && (
            <>
              <circle r="2" fill="var(--amber)">
                <animateMotion dur="0.7s" repeatCount="1" fill="freeze"><mpath href="#tp-l1" /></animateMotion>
              </circle>
              <circle r="2" fill="var(--amber)">
                <animateMotion dur="0.7s" begin="0.15s" repeatCount="1" fill="freeze"><mpath href="#tp-l2" /></animateMotion>
              </circle>
              <circle r="2" fill="var(--red)">
                <animateMotion dur="0.6s" begin="0.3s" repeatCount="1" fill="freeze"><mpath href="#tp-l3" /></animateMotion>
              </circle>
              <circle r="2" fill="var(--teal)">
                <animateMotion dur="0.6s" begin="0.42s" repeatCount="1" fill="freeze"><mpath href="#tp-l4" /></animateMotion>
              </circle>
              <circle r="2" fill="var(--amber)">
                <animateMotion dur="0.7s" begin="0.2s" repeatCount="1" fill="freeze"><mpath href="#tp-r1" /></animateMotion>
              </circle>
              <circle r="2" fill="var(--blue)">
                <animateMotion dur="0.6s" begin="0.45s" repeatCount="1" fill="freeze"><mpath href="#tp-r2" /></animateMotion>
              </circle>
              <circle r="2" fill="var(--teal)">
                <animateMotion dur="0.6s" begin="0.52s" repeatCount="1" fill="freeze">
                  <mpath href="#tp-l5" />
                </animateMotion>
              </circle>

              <circle r="2" fill="var(--green)">
                <animateMotion dur="0.6s" begin="0.62s" repeatCount="1" fill="freeze">
                  <mpath href="#tp-l6" />
                </animateMotion>
              </circle>

              <circle r="2" fill="var(--blue)">
                <animateMotion dur="0.6s" begin="0.72s" repeatCount="1" fill="freeze">
                  <mpath href="#tp-l7" />
                </animateMotion>
              </circle>
            </>
          )}

          {/* ═══ LEFT — TELEPHONY PLATFORM ═══ */}

          {/* CI3 Frontend */}
          <rect x="70" y="18" width="100" height="27" rx="4"
            fill="var(--bg4)" stroke="var(--amber)" strokeWidth="1" />
          <text x="120" y="31" fill="var(--amber)" fontSize="8" textAnchor="middle" fontWeight="bold">CI3 + React Frontend</text>
          <text x="118" y="41" fill="var(--text3)" fontSize="6.5" textAnchor="middle">PHP · WEBRTC</text>

          {/* JsSIP + React (browser) */}
          {/* <rect x="91" y="18" width="78" height="27" rx="4"
            fill="var(--bg4)" stroke="var(--border)" strokeWidth="1" />
          <text x="130" y="30" fill="var(--text2)" fontSize="8" textAnchor="middle">JsSIP · React</text>
          <text x="130" y="41" fill="var(--text3)" fontSize="6.5" textAnchor="middle">WebRTC · Browser</text> */}

          {/* 15+ Node.js Microservices — wide */}
          <rect x="5" y="62" width="240" height="36" rx="4"
            fill="var(--bg4)" stroke="var(--green)" strokeWidth="1" />
          <text x="125" y="75" fill="var(--green)" fontSize="8.5" textAnchor="middle" fontWeight="bold">
            15+ Node.js Microservices
          </text>
          <text x="125" y="87" fill="var(--text3)" fontSize="6.5" textAnchor="middle">
            calling · lead mgmt · state · reports · ESL · socket · monitor · APIs
          </text>

          {/* FreeSWITCH */}
          <rect x="5" y="112" width="80" height="27" rx="4"
            fill="var(--bg4)" stroke="var(--red)" strokeWidth="1" />
          <text x="45" y="124" fill="var(--red)" fontSize="8" textAnchor="middle">FreeSWITCH</text>
          <text x="45" y="134" fill="var(--text3)" fontSize="6.5" textAnchor="middle">ESL · Lua</text>

          {/* Redis Queues */}
          <rect x="125" y="112" width="77" height="27" rx="4"
            fill="var(--bg4)" stroke="var(--teal)" strokeWidth="1" />
          <text x="163" y="124" fill="var(--teal)" fontSize="8" textAnchor="middle">Redis Queues</text>
          <text x="163" y="134" fill="var(--text3)" fontSize="6.5" textAnchor="middle">Bull</text>

          {/* Redis */}
          <rect x="75" y="162" width="50" height="27" rx="4"
            fill="var(--bg4)" stroke="var(--teal)" strokeWidth="1" />
          <text x="100" y="174" fill="var(--teal)" fontSize="8" textAnchor="middle">Redis</text>
          <text x="100" y="182" fill="var(--text3)" fontSize="5.5" textAnchor="middle">Session</text>
          <text x="100" y="187" fill="var(--text3)" fontSize="5.5" textAnchor="middle">Config</text>

          {/* MongoDB */}
          <rect x="135" y="162" width="50" height="27" rx="4"
            fill="var(--bg4)" stroke="var(--green)" strokeWidth="1" />
          <text x="160" y="174" fill="var(--green)" fontSize="8" textAnchor="middle">MongoDB</text>
          <text x="160" y="184" fill="var(--text3)" fontSize="6" textAnchor="middle">Reports</text>

          {/* MySQL */}
          <rect x="195" y="162" width="50" height="27" rx="4"
            fill="var(--bg4)" stroke="var(--blue)" strokeWidth="1" />
          <text x="220" y="174" fill="var(--blue)" fontSize="8" textAnchor="middle">MySQL</text>
          <text x="220" y="182" fill="var(--text3)" fontSize="5.5" textAnchor="middle">Persistent</text>
          <text x="220" y="187" fill="var(--text3)" fontSize="5.5" textAnchor="middle">Data</text>
          {/* Kamailio */}
          {/* <rect x="182" y="112" width="63" height="27" rx="4"
            fill="var(--bg4)" stroke="var(--border)" strokeWidth="1" />
          <text x="213" y="124" fill="var(--text2)" fontSize="8" textAnchor="middle">Kamailio</text>
          <text x="213" y="134" fill="var(--text3)" fontSize="6.5" textAnchor="middle">SIP Proxy</text> */}

          {/* ═══ RIGHT — TICKET PORTAL ═══ */}

          {/* Next.js */}
          <rect x="264" y="18" width="112" height="27" rx="4"
            fill="var(--bg4)" stroke="var(--amber)" strokeWidth="1" />
          <text x="320" y="30" fill="var(--amber)" fontSize="8" textAnchor="middle" fontWeight="bold">Next.js · Redux</text>
          <text x="320" y="41" fill="var(--text3)" fontSize="6.5" textAnchor="middle">Frontend</text>

          {/* Node.js + Socket.IO */}
          <rect x="264" y="62" width="128" height="36" rx="4"
            fill="var(--bg4)" stroke="var(--green)" strokeWidth="1" />
          <text x="328" y="75" fill="var(--green)" fontSize="8" textAnchor="middle">Node.js · Socket.IO</text>
          <text x="328" y="87" fill="var(--text3)" fontSize="6.5" textAnchor="middle">REST API · Real-time chat</text>

          {/* ScyllaDB */}
          <rect x="264" y="112" width="112" height="27" rx="4"
            fill="var(--bg4)" stroke="var(--blue)" strokeWidth="1" />
          <text x="320" y="124" fill="var(--blue)" fontSize="8" textAnchor="middle">ScyllaDB</text>
          <text x="320" y="134" fill="var(--text3)" fontSize="6.5" textAnchor="middle">Distributed store</text>
        </svg>
      </div>
    );
  }

export function RequestFlowDiagram() {
  const [ref, active, packetsActive] = useDiagramReveal();

  return (
    <div ref={ref} className="arch-diagram mt-4 select-none">
      <div className="text-[10px] text-[var(--text3)] mb-3 tracking-wider font-mono">
        // AI CHAT APP — MESSAGE & DATA FLOW
      </div>
      <svg
        viewBox="0 0 460 165"
        width="100%"
        height="100%"
        className="font-mono"
        style={{ overflow: "visible" }}
      >
        {/* Section labels */}
        <text x="5" y="12" fill="var(--text3)" fontSize="7" letterSpacing="0.08em">
          MESSAGE FLOW
        </text>
        <text x="5" y="118" fill="var(--text3)" fontSize="7" letterSpacing="0.08em">
          N+1 FIX · UNREAD COUNTS
        </text>

        {/* Section divider */}
        <line x1="0" y1="108" x2="460" y2="108"
          stroke="var(--border)" strokeWidth="0.5" strokeDasharray="3 3" />

        {/* ─── CONNECTION PATHS ─── */}
        {active && (
          <>
            {/* Client → CI3 Auth */}
            <path id="rf-n1" d="M 80 36 L 105 36"
              fill="none" stroke="var(--border2)" strokeWidth="1"
              strokeDasharray="25" strokeDashoffset="25"
              className="animate-draw-line" />
            {/* CI3 Auth → Socket.IO (JWT issued) */}
            <path id="rf-n2" d="M 190 36 L 250 36"
              fill="none" stroke="var(--border2)" strokeWidth="1"
              strokeDasharray="60" strokeDashoffset="60"
              className="animate-draw-line" style={{ animationDelay: "200ms" }} />
            {/* Socket.IO → MongoDB */}
            <path id="rf-n3" d="M 335 36 L 375 36"
              fill="none" stroke="var(--border2)" strokeWidth="1"
              strokeDasharray="40" strokeDashoffset="40"
              className="animate-draw-line" style={{ animationDelay: "350ms" }} />
            {/* Socket.IO ↓ Ollama */}
            <path id="rf-n4" d="M 292 50 L 292 75"
              fill="none" stroke="var(--border2)" strokeWidth="1"
              strokeDasharray="25" strokeDashoffset="25"
              className="animate-draw-line" style={{ animationDelay: "500ms" }} />
            {/* N+1: 500+ convos → Agg Pipeline */}
            <path id="rf-n5" d="M 85 144 L 175 144"
              fill="none" stroke="var(--border2)" strokeWidth="1"
              strokeDasharray="90" strokeDashoffset="90"
              className="animate-draw-line" style={{ animationDelay: "300ms" }} />
            {/* Agg Pipeline → Unread Counts */}
            <path id="rf-n6" d="M 275 144 L 365 144"
              fill="none" stroke="var(--border2)" strokeWidth="1"
              strokeDasharray="90" strokeDashoffset="90"
              className="animate-draw-line" style={{ animationDelay: "500ms" }} />
          </>
        )}

        {/* ─── PACKETS ─── */}
        {packetsActive && (
          <>
            <circle r="2" fill="var(--amber)">
              <animateMotion dur="0.5s" repeatCount="1" fill="freeze"><mpath href="#rf-n1" /></animateMotion>
            </circle>
            <circle r="2" fill="var(--amber)">
              <animateMotion dur="0.7s" begin="0.2s" repeatCount="1" fill="freeze"><mpath href="#rf-n2" /></animateMotion>
            </circle>
            <circle r="2" fill="var(--green)">
              <animateMotion dur="0.5s" begin="0.35s" repeatCount="1" fill="freeze"><mpath href="#rf-n3" /></animateMotion>
            </circle>
            <circle r="2" fill="var(--blue)">
              <animateMotion dur="0.5s" begin="0.5s" repeatCount="1" fill="freeze"><mpath href="#rf-n4" /></animateMotion>
            </circle>
            <circle r="2" fill="var(--teal)">
              <animateMotion dur="1s" begin="0.3s" repeatCount="1" fill="freeze"><mpath href="#rf-n5" /></animateMotion>
            </circle>
            <circle r="2" fill="var(--green)">
              <animateMotion dur="1s" begin="0.5s" repeatCount="1" fill="freeze"><mpath href="#rf-n6" /></animateMotion>
            </circle>
          </>
        )}

        {/* ═══ MESSAGE FLOW NODES ═══ */}

        {/* Client */}
        <rect x="5" y="22" width="75" height="28" rx="4"
          fill="var(--bg4)" stroke="var(--border)" strokeWidth="1" />
        <text x="42" y="34" fill="var(--text2)" fontSize="8" textAnchor="middle">Client</text>
        <text x="42" y="44" fill="var(--text3)" fontSize="6.5" textAnchor="middle">Browser</text>

        {/* JWT label on connector */}
        {/* <text x="220" y="30" fill="var(--text3)" fontSize="6.5" textAnchor="middle">JWT + Refresh</text>
        <text x="222" y="45" fill="var(--text3)" fontSize="6.5" textAnchor="middle">Token Auth ✓</text> */}

        {/* CI3 Auth */}
        <rect x="105" y="22" width="85" height="28" rx="4"
          fill="var(--bg4)" stroke="var(--amber)" strokeWidth="1" />
        <text x="147" y="34" fill="var(--amber)" fontSize="8" textAnchor="middle" fontWeight="bold">CI3 Auth</text>
        <text x="147" y="44" fill="var(--text3)" fontSize="6.5" textAnchor="middle">JWT + Refresh Token</text>

        {/* Socket.IO */}
        <rect x="250" y="22" width="85" height="28" rx="4"
          fill="var(--bg4)" stroke="var(--green)" strokeWidth="1" />
        <text x="292" y="34" fill="var(--green)" fontSize="8" textAnchor="middle">Socket.IO</text>
        <text x="292" y="44" fill="var(--text3)" fontSize="6.5" textAnchor="middle">real-time · 50ms</text>

        {/* MongoDB */}
        <rect x="375" y="22" width="80" height="28" rx="4"
          fill="var(--bg4)" stroke="var(--teal)" strokeWidth="1" />
        <text x="415" y="34" fill="var(--teal)" fontSize="8" textAnchor="middle">MongoDB</text>
        <text x="415" y="44" fill="var(--text3)" fontSize="6.5" textAnchor="middle">compound idx</text>

        {/* Ollama API */}
        <rect x="250" y="75" width="85" height="28" rx="4"
          fill="var(--bg4)" stroke="var(--blue)" strokeWidth="1" />
        <text x="292" y="87" fill="var(--blue)" fontSize="8" textAnchor="middle">Ollama API</text>
        <text x="292" y="97" fill="var(--text3)" fontSize="6.5" textAnchor="middle">AI · first-class user</text>

        {/* ═══ N+1 FIX NODES ═══ */}

        {/* 500+ Conversations */}
        <rect x="5" y="130" width="80" height="28" rx="4"
          fill="var(--bg4)" stroke="var(--border)" strokeWidth="1" />
        <text x="45" y="142" fill="var(--text2)" fontSize="8" textAnchor="middle">500+ convos</text>
        <text x="45" y="152" fill="var(--text3)" fontSize="6.5" textAnchor="middle">MongoDB</text>

        {/* Aggregation Pipeline */}
        <rect x="175" y="130" width="100" height="28" rx="4"
          fill="var(--bg4)" stroke="var(--amber)" strokeWidth="1" />
        <text x="225" y="142" fill="var(--amber)" fontSize="8" textAnchor="middle" fontWeight="bold">Agg Pipeline</text>
        <text x="225" y="152" fill="var(--text3)" fontSize="6.5" textAnchor="middle">$group · 1 round trip</text>

        {/* Unread Counts result */}
        <rect x="365" y="130" width="90" height="28" rx="4"
          fill="var(--bg4)" stroke="var(--green)" strokeWidth="1" />
        <text x="410" y="142" fill="var(--green)" fontSize="8" textAnchor="middle">Unread Counts</text>
        <text x="410" y="152" fill="var(--text3)" fontSize="6.5" textAnchor="middle">N+1 resolved ✓</text>
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
