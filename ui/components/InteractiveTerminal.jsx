"use client";
import React, { useState, useEffect, useCallback } from "react";

const SEQUENCE = [
  {
    cmd: "whoami",
    output: (
      <>
        <div className="out amber">→ Backend-focused Full-Stack Developer</div>
        <div className="out">→ Java · Node.js · Next.js</div>
      </>
    ),
  },
  {
    cmd: "cat current_role.json",
    output: (
      <>
        <div className="out">
          {"{ company: "}
          <span style={{ color: "var(--teal)" }}>"SlashRTC"</span>,
        </div>
        <div className="out">
          &nbsp; role:{" "}
          <span style={{ color: "var(--teal)" }}>"Software Developer"</span>,
        </div>
        <div className="out">
          &nbsp; since: <span style={{ color: "var(--teal)" }}>"Nov 2025"</span>
          ,
        </div>
        {/* <div className="out">
          &nbsp; team: <span style={{ color: "var(--amber)" }}>3</span>, services:{" "}
          <span style={{ color: "var(--amber)" }}>15+</span>
          {" }"}
        </div> */}
        <div className="out">
          {" "}
          &nbsp;&nbsp;"stack": [{" "}
          <span style={{ color: "var(--teal)" }}>
            {" "}
            "Node.js", "Next.js", "CodeIgniter",{" "}
          </span>{" "}
        </div>{" "}
        <div className="out">
          {" "}
          &nbsp;&nbsp;&nbsp;&nbsp;{" "}
          <span style={{ color: "var(--teal)" }}>
            {" "}
            "MongoDB", "Redis", "ScyllaDB", "MySQL"{" "}
          </span>{" "}
        </div>{" "}
        <div className="out">&nbsp;&nbsp;],</div>{" "}
        <div className="out"> &nbsp;&nbsp;"responsibilities": [ </div>{" "}
        <div className="out">
          {" "}
          &nbsp;&nbsp;&nbsp;&nbsp;{" "}
          <span style={{ color: "var(--teal)" }}>
            {" "}
            "Ship & Debug features for the ticket portal"{" "}
          </span>
          ,{" "}
        </div>{" "}
        <div className="out">
          {" "}
          &nbsp;&nbsp;&nbsp;&nbsp;{" "}
          <span style={{ color: "var(--teal)" }}>
            {" "}
            "Debug distributed telephony services"{" "}
          </span>
          ,{" "}
        </div>{" "}
        <div className="out">
          {" "}
          &nbsp;&nbsp;&nbsp;&nbsp;{" "}
          <span style={{ color: "var(--teal)" }}>
            {" "}
            "Troubleshoot issues across both products"{" "}
          </span>{" "}
        </div>{" "}
        <div className="out">&nbsp;&nbsp;]</div>{" "}
        <div className="out">{"}"}</div>{" "}
      </>
    ),
  },
  {
  cmd: "git log --oneline",
  output: (
    <>
      <div className="out">
        8e21fa3 feat(dsa):
        <span style={{ color: "var(--teal)" }}>
          {" "}Solved 150+ LeetCode & NeetCode problems
        </span>
      </div>

      <div className="out">
        b47cd91 docs(github):
        <span style={{ color: "var(--teal)" }}>
          {" "}Consistently shipping projects & improvements
        </span>
      </div>

      <div className="out">
        f12ab08 feat(update):
        <span style={{ color: "var(--teal)" }}>
          {" "}Learning Systems, Spring Boot & AI
        </span>
      </div>

      {/* <div className="out">
        c94de17 feat(ai):
        <span style={{ color: "var(--teal)" }}>
          {" "}Exploring AI engineering & LLM applications
        </span>
      </div> */}
    </>
  ),
}
];

export default function InteractiveTerminal() {
  // phases: typing → awaiting → transition → typing → ... → done
  const [phase, setPhase] = useState("typing");
  const [cmdIndex, setCmdIndex] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [history, setHistory] = useState([]);

  const current = SEQUENCE[cmdIndex];

  // Typewriter — one char per 65ms
  useEffect(() => {
    if (phase !== "typing") return;
    if (typedChars >= current.cmd.length) {
      setPhase("awaiting");
      return;
    }
    const t = setTimeout(() => setTypedChars((n) => n + 1), 65);
    return () => clearTimeout(t);
  }, [phase, typedChars, current]);

  // Execute: append to history, kick off next command or finish
  const execute = useCallback(() => {
    if (phase !== "awaiting") return;
    setHistory((h) => [...h, { cmd: current.cmd, output: current.output }]);
    if (cmdIndex < SEQUENCE.length - 1) {
      setPhase("transition");
      setTimeout(() => {
        setCmdIndex((i) => i + 1);
        setTypedChars(0);
        setPhase("typing");
      }, 500);
    } else {
      setPhase("done");
    }
  }, [phase, cmdIndex, current]);

  // Enter key (global — no need to focus the element)
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Enter") execute();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [execute]);

  const showCurrentLine = phase === "typing" || phase === "awaiting";

  return (
    <div
      className="terminal"
      // onClick={execute}
      style={{ cursor: phase === "awaiting" ? "pointer" : "default" }}
      title={phase === "awaiting" ? "Press ↵ Enter to execute" : undefined}
    >
      {/* Title bar */}
      <div className="term-bar">
        <div className="term-btn" style={{ background: "#e05252" }} />
        <div className="term-btn" style={{ background: "#e8a832" }} />
        <div className="term-btn" style={{ background: "#4caf6e" }} />
        <span
          style={{ fontSize: "10px", color: "var(--text3)", marginLeft: "8px" }}
        >
          sagar@devbox ~
        </span>
      </div>

      {/* Body */}
      <div className="term-body leading-relaxed">
        {/* Executed history */}
        {history.map((item, i) => (
          <React.Fragment key={i}>
            <div className="term-line">
              <span className="prompt">$</span>
              <span className="cmd">{item.cmd}</span>
            </div>
            {item.output}
            <br />
          </React.Fragment>
        ))}

        {/* Active command line */}
        {showCurrentLine && (
          <div className="term-line">
            <span className="prompt">$</span>
            <span className="cmd">{current.cmd.slice(0, typedChars)}</span>
            <span className="cursor" />
            {/* {phase === "awaiting" && (
              <span
                style={{
                  fontSize: "9px",
                  color: "var(--amber)",
                  opacity: 0.45,
                  marginLeft: "10px",
                  letterSpacing: "0.08em",
                  animation: "blink 1.8s ease-in-out infinite",
                }}
              >
                ↵
              </span>
            )} */}
          </div>
        )}

        {/* Idle cursor after last command */}
        {phase === "done" && (
          <div className="term-line">
            <span className="prompt">$</span>
            <span className="cursor" />
          </div>
        )}
      </div>
    </div>
  );
}
