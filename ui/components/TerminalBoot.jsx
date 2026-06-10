"use client";
import React, { useEffect, useState } from "react";

export default function TerminalBoot({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [showCursor, setShowCursor] = useState(true);
  const [isFading, setIsFading] = useState(false);

  const sequence = [
    "initializing portfolio...",
    "loading projects...",
    "rendering systems...",
    "ready"
  ];

  useEffect(() => {
    // Progressive timing under 1 second total
    const timers = [];
    
    sequence.forEach((line, index) => {
      const timer = setTimeout(() => {
        setLines((prev) => [...prev, `> ${line}`]);
        
        // When we output the last line "ready"
        if (index === sequence.length - 1) {
          const fadeTimer = setTimeout(() => {
            setIsFading(true);
            const completeTimer = setTimeout(() => {
              onComplete();
            }, 200); // Short transition fade
            timers.push(completeTimer);
          }, 250); // Small pause at "ready"
          timers.push(fadeTimer);
        }
      }, index * 180); // 0ms, 180ms, 360ms, 540ms. Boot sequence ends at 540ms, fade triggers at 790ms, completes by 990ms.
      timers.push(timer);
    });

    // Blinking cursor
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 150);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(cursorInterval);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0d0d0d] font-mono text-[11px] text-[#8a8578] transition-all duration-300 ease-in-out ${
        isFading ? "opacity-0 scale-95 blur-md pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="w-full max-w-[320px] p-6 border border-[#2a2a2a] bg-[#111] rounded-lg shadow-2xl">
        <div className="flex items-center gap-1.5 mb-4 border-b border-[#2a2a2a] pb-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#e05252]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#e8a832]"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#4caf6e]"></div>
          <span className="text-[9px] text-[#555] ml-2">system_boot.sh</span>
        </div>
        <div className="space-y-1.5 min-h-[85px] leading-relaxed">
          {lines.map((line, idx) => (
            <div
              key={idx}
              className={idx === sequence.length - 1 ? "text-[#e8a832]" : ""}
            >
              {line}
            </div>
          ))}
          {lines.length < sequence.length && (
            <div>
              &gt;{" "}
              <span
                className={`inline-block w-1.5 h-3 bg-[#e8a832] align-middle ${
                  showCursor ? "opacity-100" : "opacity-0"
                }`}
              ></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
