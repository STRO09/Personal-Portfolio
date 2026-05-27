"use client";

import React, { useState, useEffect } from "react";
import { DottedGlowBackgroundProfile } from "@/components/GlowBackground";

export default function ProfileHero() {
  const [maskUrl, setMaskUrl] = useState<string>("");

  useEffect(() => {
    const img = new Image();
    img.src = "/profile.png";
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      ctx.drawImage(img, 0, 0);

      try {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        const minBrightness = 12;
        const maxBrightness = 38;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

          data[i] = 255;
          data[i + 1] = 255;
          data[i + 2] = 255;

          if (brightness <= minBrightness) {
            data[i + 3] = 0;
          } else if (brightness >= maxBrightness) {
            data[i + 3] = 255;
          } else {
            const t = (brightness - minBrightness) / (maxBrightness - minBrightness);
            data[i + 3] = Math.round(t * 255);
          }
        }

        ctx.putImageData(imgData, 0, 0);
        setMaskUrl(canvas.toDataURL());
      } catch (err) {
        console.error("Failed to generate silhouette mask:", err);
        setMaskUrl("/profile.png");
      }
    };
    img.onerror = () => setMaskUrl("/profile.png");
  }, []);

  const maskStyle = {
    maskImage: maskUrl ? `url(${maskUrl})` : "none",
    WebkitMaskImage: maskUrl ? `url(${maskUrl})` : "none",
    maskMode: "alpha",
    WebkitMaskMode: "alpha",
    maskSize: "cover",
    WebkitMaskSize: "cover",
    maskPosition: "center",
    WebkitMaskPosition: "center",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
  } as React.CSSProperties;

  return (
    /*
      Root is sized to the photo frame dimensions.
      The name text overflows horizontally (overflow visible) but
      we keep it within the photo's vertical bounds via absolute bottom positioning.
    */
    <div className="profile-hero-root relative flex items-center justify-center select-none">
      <DottedGlowBackgroundProfile>
        {/* ── BG name — behind the photo, overflows width ── */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <span className="hero-name-bg font-syne font-extrabold uppercase leading-none absolute text-indigo-400 tracking-tight whitespace-nowrap">
            SAGAR JANJOTED
          </span>
        </div>

        {/* ── Photo ── */}
        <div className="profile-photo-frame relative z-20 rounded-3xl overflow-hidden group transition-transform duration-700 bg-transparent w-full h-full">
          <img
            src="/profile.png"
            alt="Sagar Janjoted"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ mixBlendMode: "screen" }}
          />
        </div>

        {/* ── FG name — on top, clipped to silhouette ── */}
        <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
          <div
            className="profile-photo-frame w-full h-full rounded-3xl overflow-hidden"
            style={maskStyle}
          >
            <span
              className="hero-name-fg font-syne font-extrabold uppercase leading-none absolute text-white tracking-tight whitespace-nowrap"
              style={{ textShadow: "0 0 20px rgba(255,255,255,0.7)" }}
            >
              SAGAR JANJOTED
            </span>
          </div>
        </div>
      </DottedGlowBackgroundProfile>
    </div>
  );
}