"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Mail,
  Phone,
  Share2,
  ChevronDown,
  Globe,
  Check,
} from "lucide-react";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [navVisible, setNavVisible] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const diff = currentY - lastScrollY.current;

          if (diff > 6 && currentY > 80) {
            // Scrolling down — hide
            setNavVisible(false);
            setDropdownOpen(false);
          } else if (diff < -6) {
            // Scrolling up — show
            setNavVisible(true);
          }

          lastScrollY.current = currentY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    const email = "hello@sagarportfolio.com";
    navigator.clipboard.writeText(email);
    triggerToast("Email copied to clipboard!");
    window.location.href = `mailto:${email}`;
  };

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.preventDefault();
    const phone = "+1 (555) 019-2834";
    navigator.clipboard.writeText(phone);
    triggerToast("Phone copied to clipboard!");
    window.location.href = `tel:${phone.replace(/\s+/g, "")}`;
  };

  return (
    <>
      {/* Toast Notification */}
      <div
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full border border-indigo-500/20 bg-zinc-950/80 backdrop-blur-md text-sm text-zinc-200 shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_15px_rgba(99,102,241,0.15)] transition-all duration-300 ${toastMessage ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
          }`}
      >
        <Check className="h-4 w-4 text-emerald-400" />
        <span>{toastMessage}</span>
      </div>

      {/* Floating Borderless Navbar — hides on scroll down, reveals on scroll up */}
      <nav
        className="fixed top-6 right-6 z-40 flex items-center gap-3 transition-all duration-300"
        style={{
          transform: navVisible ? "translateY(0)" : "translateY(-120%)",
          opacity: navVisible ? 1 : 0,
        }}
      >
        {/* Mail Button */}
        <a
          href="mailto:hello@sagarportfolio.com"
          onClick={handleCopyEmail}
          className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-zinc-950/30 backdrop-blur-md text-zinc-300 hover:text-indigo-400 hover:border-indigo-500/40 hover:bg-zinc-950/60 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all duration-300 hover:scale-105 active:scale-95"
          title="Email Me"
        >
          <Mail className="h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-110" />
          <span className="absolute -bottom-10 right-0 scale-0 rounded bg-zinc-900 px-2 py-1 text-xs text-zinc-300 border border-white/5 group-hover:scale-100 transition-all duration-200 whitespace-nowrap shadow-md">
            Email Me
          </span>
        </a>

        {/* Phone Button */}
        <a
          href="tel:+15550192834"
          onClick={handleCopyPhone}
          className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-zinc-950/30 backdrop-blur-md text-zinc-300 hover:text-indigo-400 hover:border-indigo-500/40 hover:bg-zinc-950/60 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all duration-300 hover:scale-105 active:scale-95"
          title="Call Me"
        >
          <Phone className="h-[18px] w-[18px] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
          <span className="absolute -bottom-10 right-0 scale-0 rounded bg-zinc-900 px-2 py-1 text-xs text-zinc-300 border border-white/5 group-hover:scale-100 transition-all duration-200 whitespace-nowrap shadow-md">
            Call Me
          </span>
        </a>

        {/* Socials Dropdown */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`group flex h-11 items-center gap-1.5 px-4 rounded-full border bg-zinc-950/30 backdrop-blur-md text-zinc-300 hover:text-indigo-400 hover:bg-zinc-950/60 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all duration-300 hover:scale-105 active:scale-95 ${dropdownOpen ? "border-indigo-500/50 text-indigo-400" : "border-white/10"
              }`}
          >
            <Share2 className="h-[16px] w-[16px]" />
            <span className="text-xs font-medium tracking-wide">Socials</span>
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-300 ${dropdownOpen ? "rotate-180 text-indigo-400" : "text-zinc-500 group-hover:text-zinc-300"
                }`}
            />
          </button>

          <div
            className={`absolute right-0 mt-3 p-1.5 w-44 rounded-2xl glass-panel origin-top-right transition-all duration-300 shadow-[0_15px_30px_rgba(0,0,0,0.6)] ${dropdownOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              }`}
          >
            <div className="px-2.5 py-1.5 mb-1 border-b border-white/5">
              <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">Connect</p>
            </div>

            {[
              { href: "https://github.com", label: "GitHub", Icon: GithubIcon },
              { href: "https://linkedin.com", label: "LinkedIn", Icon: LinkedinIcon },
              { href: "https://twitter.com", label: "Twitter / X", Icon: TwitterIcon },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs text-zinc-400 hover:text-white hover:bg-indigo-500/10 hover:border-l-2 hover:border-indigo-500 transition-all duration-200"
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </a>
            ))}

            <a
              href="https://portfolio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs text-zinc-400 hover:text-white hover:bg-indigo-500/10 hover:border-l-2 hover:border-indigo-500 transition-all duration-200"
            >
              <Globe className="h-4 w-4" />
              <span>Website</span>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}