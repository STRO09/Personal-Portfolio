"use client";
import React, { useState, useRef } from "react";

export default function ContactCard({ icon, label, value, href, onCopy }) {
  const [entryEdge, setEntryEdge] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef(null);

  const handleMouseEnter = (e) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const w = rect.width;
    const h = rect.height;
    const slope = h / w;

    let edge = 0; // 0: top, 1: right, 2: bottom, 3: left
    if (Math.abs(x) * slope > Math.abs(y)) {
      edge = x > 0 ? 1 : 3;
    } else {
      edge = y > 0 ? 2 : 0;
    }
    
    setEntryEdge(edge);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const getOverlayStyle = () => {
    if (!isHovered) {
      if (entryEdge === 0) return { transform: "translateY(-100%)", opacity: 0 };
      if (entryEdge === 1) return { transform: "translateX(100%)", opacity: 0 };
      if (entryEdge === 2) return { transform: "translateY(100%)", opacity: 0 };
      if (entryEdge === 3) return { transform: "translateX(-100%)", opacity: 0 };
    }
    return { transform: "translate(0, 0)", opacity: 1 };
  };

  const handleClick = (e) => {
    // Allow default navigation for tel or http links
    if (href && (href.startsWith("http") || href.startsWith("tel"))) {
      return;
    }

    e.preventDefault();
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      if (onCopy) onCopy();
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <a
      ref={cardRef}
      href={href}
      target={href && href.startsWith("http") ? "_blank" : undefined}
      rel={href && href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="contact-item group relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Subtle direction-aware highlight overlay */}
      <div
        className="absolute inset-0 bg-[rgba(232,168,50,0.025)] border-[#e8a832]/20 border-t pointer-events-none transition-all duration-300 ease-out"
        style={getOverlayStyle()}
      ></div>

      <span className="contact-icon z-10 transition-transform duration-300 group-hover:scale-110">
        {icon}
      </span>
      
      <div className="contact-info z-10 w-full">
        <div className="flex justify-between items-center w-full">
          <span className="label transition-colors duration-300 group-hover:text-[#e8a832]">
            {label}
          </span>
          {copied && (
            <span className="text-[9px] text-[#e8a832] font-mono tracking-wider animate-pulse">
              [ COPIED ]
            </span>
          )}
        </div>
        <div className="value transition-colors duration-300 group-hover:text-[#e8e4da]">
          {value}
        </div>
      </div>
    </a>
  );
}
