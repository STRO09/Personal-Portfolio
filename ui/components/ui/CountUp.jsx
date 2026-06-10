"use client";
import React, { useEffect, useRef, useState } from "react";

export default function CountUp({ value, duration = 1000, className = "" }) {
  const [displayVal, setDisplayVal] = useState("");
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Parse value
    const match = String(value).match(/^([^\d]*?)(\d+)(.*)$/);
    if (!match) {
      setDisplayVal(value);
      return;
    }

    const prefix = match[1];
    const targetNumber = parseInt(match[2], 10);
    const suffix = match[3];

    setDisplayVal(prefix + "0" + suffix);

    const animate = () => {
      let startTime = null;
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        // Cubic ease-out
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeProgress * targetNumber);
        
        setDisplayVal(prefix + current + suffix);
        
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setDisplayVal(value);
        }
      };
      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate();
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
      animate();
      observer.unobserve(el);
    }

    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={ref} className={className}>{displayVal}</span>;
}
