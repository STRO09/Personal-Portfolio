"use client";
import React from "react";
import {
    House,
    Briefcase,
    FolderGit2,
    Code2,
    Mail
} from "lucide-react";

const ITEMS = [
  {
    href: "#hero",
    icon: <House size={18} strokeWidth={2} />,
    label: "Home",
  },
  {
    href: "#experience",
    icon: <Briefcase size={18} strokeWidth={2} />,
    label: "Experience",
  },
  {
    href: "#projects",
    icon: <FolderGit2 size={18} strokeWidth={2} />,
    label: "Projects",
  },
  {
    href: "#skills",
    icon: <Code2 size={18} strokeWidth={2} />,
    label: "Stack",
  },
  {
    href: "#contact",
    icon: <Mail size={18} strokeWidth={2} />,
    label: "Contact",
  }
];

export default function MobileNav({ activeSection }) {
  const activeIndex = Math.max(
    0,
    ITEMS.findIndex((i) => i.href === `#${activeSection}`)
  );

  const handleClick = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <nav className="wheel-nav" aria-label="Section navigation">
      <div className="pill-bar">
        {ITEMS.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <a
              key={item.href}
              href={item.href}
              // title={item.label}
              className={`pill-item ${isActive ? "active" : ""}`}
              onClick={(e) => handleClick(e, item.href)}
            >
              <span className="pill-icon">{item.icon}</span>
              {isActive && <span className="pill-label">{item.label}</span>}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
