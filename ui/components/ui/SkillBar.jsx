"use client";
import React, { useEffect, useRef, useState } from "react";

export default function SkillBar({ name, level, className = "" }) {
  const [width, setWidth] = useState("0%");
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          setWidth(level);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    // Check if already in viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0 && !hasAnimated.current) {
      hasAnimated.current = true;
      setWidth(level);
      observer.unobserve(el);
    }

    return () => observer.disconnect();
  }, [level]);

  return (
    <div ref={ref} className={`skill-item ${className}`}>
      <span className="skill-name">{name}</span>
      <div className="skill-bar">
        <div
          className="skill-fill"
          style={{
            width: width,
            animation: "none", // Override globals.css eager animation
            transition: "width 1.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        ></div>
      </div>
    </div>
  );
}
