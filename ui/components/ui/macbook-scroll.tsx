"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, MotionValue, motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import {
  IconBrightnessDown,
  IconBrightnessUp,
  IconCaretRightFilled,
  IconCaretUpFilled,
  IconChevronUp,
  IconMicrophone,
  IconMoon,
  IconPlayerSkipForward,
  IconPlayerTrackNext,
  IconPlayerTrackPrev,
  IconTable,
  IconVolume,
  IconVolume2,
  IconVolume3,
} from "@tabler/icons-react";
import { IconSearch } from "@tabler/icons-react";
import { IconWorld } from "@tabler/icons-react";
import { IconCommand } from "@tabler/icons-react";
import { IconCaretLeftFilled } from "@tabler/icons-react";
import { IconCaretDownFilled } from "@tabler/icons-react";


export const MacbookScroll = ({
  src,
  showGradient,
  title,
  badge,
}: {
  src?: string;
  showGradient?: boolean;
  title?: string | React.ReactNode;
  badge?: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [isMobile, setIsMobile] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [screenRect, setScreenRect] = useState<DOMRect | null>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const lastTapRef = useRef<number>(0);

  useEffect(() => {
    if (window && window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  // Escape key to close zoom
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomed(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (zoomed) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [zoomed]);

  const handleScreenInteract = () => {
    const now = Date.now();
    const DOUBLE_TAP_MS = 350;
    if (now - lastTapRef.current < DOUBLE_TAP_MS) {
      // Double tap detected
      if (screenRef.current) {
        setScreenRect(screenRef.current.getBoundingClientRect());
      }
      setZoomed((z) => !z);
    }
    lastTapRef.current = now;
  };

  // Single scroll range — entire laptop tilts as one rigid body.
  const END_SCROLL = 0.7;

  // The base should finish edge-on to the viewer: keyboard/top surface hidden,
  // only the front lip visible. The lid counter-rotates through the hinge so
  // the screen finishes front-facing.
  const assemblyRotateX = useTransform(scrollYProgress, [0, END_SCROLL], [52, 90]);
  const lidHingeAngle = useTransform(scrollYProgress, [0, END_SCROLL], [112, 90]);

  // Small framing compensation while the base flattens into a line.
  const assemblyY = useTransform(scrollYProgress, [0, END_SCROLL], [20, 150]);
  const assemblyZ = useTransform(scrollYProgress, [0, END_SCROLL], [100, 40]);

  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textTranslate = useTransform(scrollYProgress, [0, 0.3], [0, 100]);

  return (
    <div ref={ref} className="relative min-h-[200vh] w-full">
      {/* Sticky stage */}
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden [perspective:1400px]">
        <div className="scale-[0.35] sm:scale-[0.5] md:scale-[0.75] lg:scale-90 [transform-style:preserve-3d]">
          {/* ASSEMBLY — lid + base move as one rigid object */}
          <motion.div
            style={{
              rotateX: assemblyRotateX,
              translateY: assemblyY,
              translateZ: assemblyZ,
              transformStyle: "preserve-3d",
              transformOrigin: "bottom center",
            }}
            className="relative flex flex-col items-center [transform-style:preserve-3d]"
          >
            {/* BASE — keyboard deck. This is the anchor; the lid hinges off its top edge. */}
            <div
              className="relative h-[23rem] w-[32rem] rounded-2xl bg-[#272729] p-2 [transform-style:preserve-3d]"
            >
              {/* 3D Extrusion layers to give base girth */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={`extrusion-${i}`}
                  className="absolute inset-0 rounded-2xl bg-[#1c1c1c]"
                  style={{ transform: `translateZ(-${(i + 1) * 2}px)` }}
                />
              ))}
              {/* Base Bottom */}
              <div
                className="absolute inset-0 rounded-2xl bg-[#1c1c1c]"
                style={{
                  transform: "translateZ(-14px)",
                }}
              />
              {/* LID — positioned at the base's top edge, hinged from its bottom. */}
              <div
                className="absolute left-0 right-0 top-0 [transform-style:preserve-3d]"
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div
                  style={{
                    rotateX: lidHingeAngle,
                    transformOrigin: "top center",
                    transformStyle: "preserve-3d",
                  }}
                  className="relative h-96 w-[32rem] rounded-2xl bg-[#010101] p-2"
                >
                  {/* Lid extrusion layers to give it thickness */}
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={`lid-extrusion-${i}`}
                      className="absolute inset-0 rounded-2xl bg-[#272729]"
                      style={{ transform: `translateZ(-${i + 1}px)` }}
                    />
                  ))}
                  {/* Lid back (visible when lid faces away — i.e. start of scroll) */}
                  <div
                    style={{
                      transform: "rotateY(180deg) translateZ(4px)",
                      backfaceVisibility: "hidden",
                    }}
                    className="absolute inset-0 flex items-center justify-center rounded-2xl m-2 bg-[#0a0a0a]"
                  >
                    {/* <span className="text-white opacity-60">
                      <AceternityLogo />
                    </span> */}
                    {/* Clickable screen surface */}
                    <div
                      ref={screenRef}
                      onClick={handleScreenInteract}
                      className="absolute inset-2 rounded-lg cursor-pointer overflow-hidden"
                      title="Double-click to zoom"
                    >
                      {src && (
                        <img
                          src={src}
                          alt="screen"
                          className="h-full w-full rounded-lg object-cover object-left-top select-none"
                          draggable={false}
                        />
                      )}
                      {/* Subtle double-click hint */}
                      <div className="absolute inset-0 flex items-end justify-center pb-3 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <span className="text-white/50 text-[8px] bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
                          double-click to expand
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Lid front — bezel + screen */}
                  <div className="absolute inset-0 rounded-lg bg-[#272729]" />

                </motion.div>
              </div>

              {/* BASE TOP — keyboard deck content (visible when looking down at it) */}
              <div className="relative -z-10 h-full w-full overflow-hidden rounded-2xl bg-gray-200 dark:bg-[#0a0a0a]">
                <div className="relative h-10 w-full">
                  <div className="absolute inset-x-0 mx-auto h-4 w-[80%] bg-[#050505]" />
                </div>
                <div className="relative flex">
                  <div className="mx-auto h-full w-[10%] overflow-hidden">
                    <SpeakerGrid />
                  </div>
                  <div className="mx-auto h-full w-[80%]">
                    <Keypad />
                  </div>
                  <div className="mx-auto h-full w-[10%] overflow-hidden">
                    <SpeakerGrid />
                  </div>
                </div>
                <Trackpad />
                <div className="absolute inset-x-0 bottom-0 mx-auto h-2 w-20 rounded-tl-3xl rounded-tr-3xl bg-gradient-to-t from-[#272729] to-[#050505]" />
                {showGradient && (
                  <div className="absolute inset-x-0 bottom-0 z-50 h-40 w-full bg-gradient-to-t from-white via-white to-transparent dark:from-black dark:via-black" />
                )}
                {badge && <div className="absolute bottom-4 left-4">{badge}</div>}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Fullscreen zoom overlay — rendered outside 3D context */}
      <ScreenTakeoverOverlay
        src={src}
        zoomed={zoomed}
        onClose={() => setZoomed(false)}
        originRect={screenRect}
      />
    </div>
  );
};

// ─── Screen takeover overlay ───────────────────────────────────────────────
const ScreenTakeoverOverlay = ({
  src,
  zoomed,
  onClose,
  originRect,
}: {
  src?: string;
  zoomed: boolean;
  onClose: () => void;
  originRect: DOMRect | null;
}) => {
  return (
    <AnimatePresence>
      {zoomed && originRect && (
        <>
          {/* Backdrop — masks the rest of the laptop scene as the screen expands */}
          <motion.div
            key="screen-takeover-backdrop"
            className="fixed inset-0 z-[9998] bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* The screen itself, morphing from its laptop position to fullscreen */}
          <motion.div
            key="screen-takeover"
            className="fixed z-[9999] overflow-hidden bg-black cursor-zoom-out"
            initial={{
              top: originRect.top,
              left: originRect.left,
              width: originRect.width,
              height: originRect.height,
              borderRadius: 12,
            }}
            animate={{
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
              borderRadius: 0,
            }}
            exit={{
              top: originRect.top,
              left: originRect.left,
              width: originRect.width,
              height: originRect.height,
              borderRadius: 12,
              opacity: 0,
            }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            onDoubleClick={onClose}
          >
            {src && (
              <img
                src={src}
                alt="screen fullscreen"
                className="h-full w-full object-cover object-left-top select-none"
                draggable={false}
              />
            )}

            {/* <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              onClick={onClose}
              className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/30 text-sm text-white/50 backdrop-blur-sm transition-all hover:bg-black/50 hover:text-white"
              aria-label="Close"
            >
              ✕
            </motion.button> */}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export const Lid = ({
  scaleX,
  scaleY,
  rotate,
  translate,
  src,
}: {
  scaleX: MotionValue<number>;
  scaleY: MotionValue<number>;
  rotate: MotionValue<number>;
  translate: MotionValue<number>;
  src?: string;
}) => {
  return (
    <div className="relative h-96 w-[32rem] [perspective:800px]">
      <motion.div
        style={{
          scaleX: scaleX,
          scaleY: scaleY,
          rotateX: rotate,
          translateZ: translate,
          transformStyle: "preserve-3d",
          transformOrigin: "top",
        }}
        className="absolute inset-0 h-96 w-[32rem] rounded-2xl bg-[#010101] p-2"
      >
        <div
          style={{
            transform: "perspective(800px) rotateX(-25deg) translateZ(0px)",
            transformOrigin: "bottom",
            transformStyle: "preserve-3d",
          }}
          className="relative h-[12rem] w-[32rem] rounded-2xl bg-[#010101] p-2"
        >
          <div
            style={{
              boxShadow: "0px 2px 0px 2px #666666 inset",
            }}
            className="absolute inset-0 flex items-center justify-center rounded-lg bg-[#666666]"
          >
            <span className="text-white">
              <AceternityLogo />
            </span>
          </div>
        </div>

        <div className="absolute inset-0 rounded-lg bg-[#272729]" />
        <img
          src={src as string}
          alt="aceternity logo"
          className="absolute inset-0 h-full w-full rounded-lg object-cover object-left-top"
        />
      </motion.div>
    </div>
  );
};

export const Trackpad = () => {
  return (
    <div
      className="mx-auto my-1 h-32 w-[40%] rounded-xl"
      style={{
        boxShadow: "0px 0px 1px 1px #00000020 inset",
      }}
    ></div>
  );
};

export const Keypad = () => {
  return (
    <div className="mx-1 h-full [transform:translateZ(0)] rounded-md bg-[#050505] p-1 [will-change:transform]">
      {/* First Row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn
          className="w-10 items-end justify-start pb-[2px] pl-[4px]"
          childrenClassName="items-start"
        >
          esc
        </KBtn>
        <KBtn>
          <IconBrightnessDown className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F1</span>
        </KBtn>
        <KBtn>
          <IconBrightnessUp className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F2</span>
        </KBtn>
        <KBtn>
          <IconTable className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F3</span>
        </KBtn>
        <KBtn>
          <IconSearch className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F4</span>
        </KBtn>
        <KBtn>
          <IconMicrophone className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F5</span>
        </KBtn>
        <KBtn>
          <IconMoon className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F6</span>
        </KBtn>
        <KBtn>
          <IconPlayerTrackPrev className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F7</span>
        </KBtn>
        <KBtn>
          <IconPlayerSkipForward className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F8</span>
        </KBtn>
        <KBtn>
          <IconPlayerTrackNext className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F8</span>
        </KBtn>
        <KBtn>
          <IconVolume3 className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F10</span>
        </KBtn>
        <KBtn>
          <IconVolume2 className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F11</span>
        </KBtn>
        <KBtn>
          <IconVolume className="h-[6px] w-[6px]" />
          <span className="mt-1 inline-block">F12</span>
        </KBtn>
        <KBtn>
          <div className="h-4 w-4 rounded-full bg-gradient-to-b from-neutral-900 from-20% via-black via-50% to-neutral-900 to-95% p-px">
            <div className="h-full w-full rounded-full bg-black" />
          </div>
        </KBtn>
      </div>

      {/* Second row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn>
          <span className="block">~</span>
          <span className="mt-1 block">`</span>
        </KBtn>
        <KBtn>
          <span className="block">!</span>
          <span className="block">1</span>
        </KBtn>
        <KBtn>
          <span className="block">@</span>
          <span className="block">2</span>
        </KBtn>
        <KBtn>
          <span className="block">#</span>
          <span className="block">3</span>
        </KBtn>
        <KBtn>
          <span className="block">$</span>
          <span className="block">4</span>
        </KBtn>
        <KBtn>
          <span className="block">%</span>
          <span className="block">5</span>
        </KBtn>
        <KBtn>
          <span className="block">^</span>
          <span className="block">6</span>
        </KBtn>
        <KBtn>
          <span className="block">&</span>
          <span className="block">7</span>
        </KBtn>
        <KBtn>
          <span className="block">*</span>
          <span className="block">8</span>
        </KBtn>
        <KBtn>
          <span className="block">(</span>
          <span className="block">9</span>
        </KBtn>
        <KBtn>
          <span className="block">)</span>
          <span className="block">0</span>
        </KBtn>
        <KBtn>
          <span className="block">&mdash;</span>
          <span className="block">_</span>
        </KBtn>
        <KBtn>
          <span className="block">+</span>
          <span className="block"> = </span>
        </KBtn>
        <KBtn
          className="w-10 items-end justify-end pr-[4px] pb-[2px]"
          childrenClassName="items-end"
        >
          delete
        </KBtn>
      </div>

      {/* Third row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn
          className="w-10 items-end justify-start pb-[2px] pl-[4px]"
          childrenClassName="items-start"
        >
          tab
        </KBtn>
        <KBtn>
          <span className="block">Q</span>
        </KBtn>
        <KBtn>
          <span className="block">W</span>
        </KBtn>
        <KBtn>
          <span className="block">E</span>
        </KBtn>
        <KBtn>
          <span className="block">R</span>
        </KBtn>
        <KBtn>
          <span className="block">T</span>
        </KBtn>
        <KBtn>
          <span className="block">Y</span>
        </KBtn>
        <KBtn>
          <span className="block">U</span>
        </KBtn>
        <KBtn>
          <span className="block">I</span>
        </KBtn>
        <KBtn>
          <span className="block">O</span>
        </KBtn>
        <KBtn>
          <span className="block">P</span>
        </KBtn>
        <KBtn>
          <span className="block">{`{`}</span>
          <span className="block">{`[`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`}`}</span>
          <span className="block">{`]`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`|`}</span>
          <span className="block">{`\\`}</span>
        </KBtn>
      </div>

      {/* Fourth Row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn
          className="w-[2.8rem] items-end justify-start pb-[2px] pl-[4px]"
          childrenClassName="items-start"
        >
          caps lock
        </KBtn>
        <KBtn>
          <span className="block">A</span>
        </KBtn>
        <KBtn>
          <span className="block">S</span>
        </KBtn>
        <KBtn>
          <span className="block">D</span>
        </KBtn>
        <KBtn>
          <span className="block">F</span>
        </KBtn>
        <KBtn>
          <span className="block">G</span>
        </KBtn>
        <KBtn>
          <span className="block">H</span>
        </KBtn>
        <KBtn>
          <span className="block">J</span>
        </KBtn>
        <KBtn>
          <span className="block">K</span>
        </KBtn>
        <KBtn>
          <span className="block">L</span>
        </KBtn>
        <KBtn>
          <span className="block">{`:`}</span>
          <span className="block">{`;`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`"`}</span>
          <span className="block">{`'`}</span>
        </KBtn>
        <KBtn
          className="w-[2.85rem] items-end justify-end pr-[4px] pb-[2px]"
          childrenClassName="items-end"
        >
          return
        </KBtn>
      </div>

      {/* Fifth Row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn
          className="w-[3.65rem] items-end justify-start pb-[2px] pl-[4px]"
          childrenClassName="items-start"
        >
          shift
        </KBtn>
        <KBtn>
          <span className="block">Z</span>
        </KBtn>
        <KBtn>
          <span className="block">X</span>
        </KBtn>
        <KBtn>
          <span className="block">C</span>
        </KBtn>
        <KBtn>
          <span className="block">V</span>
        </KBtn>
        <KBtn>
          <span className="block">B</span>
        </KBtn>
        <KBtn>
          <span className="block">N</span>
        </KBtn>
        <KBtn>
          <span className="block">M</span>
        </KBtn>
        <KBtn>
          <span className="block">{`<`}</span>
          <span className="block">{`,`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`>`}</span>
          <span className="block">{`.`}</span>
        </KBtn>
        <KBtn>
          <span className="block">{`?`}</span>
          <span className="block">{`/`}</span>
        </KBtn>
        <KBtn
          className="w-[3.65rem] items-end justify-end pr-[4px] pb-[2px]"
          childrenClassName="items-end"
        >
          shift
        </KBtn>
      </div>

      {/* sixth Row */}
      <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1">
            <span className="block">fn</span>
          </div>
          <div className="flex w-full justify-start pl-1">
            <IconWorld className="h-[6px] w-[6px]" />
          </div>
        </KBtn>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1">
            <IconChevronUp className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">control</span>
          </div>
        </KBtn>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-end pr-1">
            <OptionKey className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">option</span>
          </div>
        </KBtn>
        <KBtn
          className="w-8"
          childrenClassName="h-full justify-between py-[4px]"
        >
          <div className="flex w-full justify-end pr-1">
            <IconCommand className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">command</span>
          </div>
        </KBtn>
        <KBtn className="w-[8.2rem]"></KBtn>
        <KBtn
          className="w-8"
          childrenClassName="h-full justify-between py-[4px]"
        >
          <div className="flex w-full justify-start pl-1">
            <IconCommand className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">command</span>
          </div>
        </KBtn>
        <KBtn className="" childrenClassName="h-full justify-between py-[4px]">
          <div className="flex w-full justify-start pl-1">
            <OptionKey className="h-[6px] w-[6px]" />
          </div>
          <div className="flex w-full justify-start pl-1">
            <span className="block">option</span>
          </div>
        </KBtn>
        <div className="mt-[2px] flex h-6 w-[4.9rem] flex-col items-center justify-end rounded-[4px] p-[0.5px]">
          <KBtn className="h-3 w-6">
            <IconCaretUpFilled className="h-[6px] w-[6px]" />
          </KBtn>
          <div className="flex">
            <KBtn className="h-3 w-6">
              <IconCaretLeftFilled className="h-[6px] w-[6px]" />
            </KBtn>
            <KBtn className="h-3 w-6">
              <IconCaretDownFilled className="h-[6px] w-[6px]" />
            </KBtn>
            <KBtn className="h-3 w-6">
              <IconCaretRightFilled className="h-[6px] w-[6px]" />
            </KBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export const KBtn = ({
  className,
  children,
  childrenClassName,
  backlit = true,
}: {
  className?: string;
  children?: React.ReactNode;
  childrenClassName?: string;
  backlit?: boolean;
}) => {
  return (
    <div
      className={cn(
        "[transform:translateZ(0)] rounded-[4px] p-[0.5px] [will-change:transform]",
        backlit && "bg-white/[0.2] shadow-xl shadow-white",
      )}
    >
      <div
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-[3.5px] bg-[#0A090D]",
          className,
        )}
        style={{
          boxShadow:
            "0px -0.5px 2px 0 #0D0D0F inset, -0.5px 0px 2px 0 #0D0D0F inset",
        }}
      >
        <div
          className={cn(
            "flex w-full flex-col items-center justify-center text-[5px] text-neutral-200",
            childrenClassName,
            backlit && "text-white",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export const SpeakerGrid = () => {
  return (
    <div
      className="mt-2 flex h-40 gap-[2px] px-[0.5px]"
      style={{
        backgroundImage:
          "radial-gradient(circle, #08080A 0.5px, transparent 0.5px)",
        backgroundSize: "3px 3px",
      }}
    ></div>
  );
};

export const OptionKey = ({ className }: { className: string }) => {
  return (
    <svg
      fill="none"
      version="1.1"
      id="icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className={className}
    >
      <rect
        stroke="currentColor"
        strokeWidth={2}
        x="18"
        y="5"
        width="10"
        height="2"
      />
      <polygon
        stroke="currentColor"
        strokeWidth={2}
        points="10.6,5 4,5 4,7 9.4,7 18.4,27 28,27 28,25 19.6,25 "
      />
      <rect
        id="_Transparent_Rectangle_"
        className="st0"
        width="32"
        height="32"
        stroke="none"
      />
    </svg>
  );
};

const AceternityLogo = () => {
  return (
    <svg
      width="66"
      height="65"
      viewBox="0 0 66 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-3 w-3 text-white"
    >
      <path
        d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
        stroke="currentColor"
        strokeWidth="15"
        strokeMiterlimit="3.86874"
        strokeLinecap="round"
      />
    </svg>
  );
};
