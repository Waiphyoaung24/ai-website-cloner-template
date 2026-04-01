"use client";

import { useRef, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

const confettiPieces = Array.from({ length: 80 }, (_, i) => ({
  char: ["\u2715", "\u25C7", "\u25BD", "\u25B7", "\u2022", "\u2726", "+", "\u25B3"][i % 8],
  left: `${(i * 17 + 5) % 100}%`,
  top: `${(i * 23 + 10) % 100}%`,
  rotation: (i * 37) % 360,
  size: 8 + (i % 6) * 2,
  opacity: 0.3 + (i % 4) * 0.1,
}));

export function CTASection() {
  const watermarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!watermarkRef.current) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const tween = gsap.to(watermarkRef.current, {
      rotation: 360,
      duration: 40,
      repeat: -1,
      ease: "none",
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section
      className={cn(
        "bg-[#c63518] text-white min-h-screen",
        "flex flex-col items-center justify-center",
        "relative overflow-hidden"
      )}
    >
      {/* Rotating logo watermark */}
      <div
        ref={watermarkRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        {/* SVG export is broken (empty file) — use PNG instead */}
        <img
          src="/images/Black_outline.png"
          alt=""
          width={600}
          height={600}
          className="w-[300px] h-[300px] md:w-[600px] md:h-[600px] opacity-[0.06] invert"
        />
      </div>

      {/* Cross markers */}
      <div
        className="absolute top-[120px] left-[20%] text-white/50 text-xl font-light select-none"
        aria-hidden="true"
      >
        +
      </div>
      <div
        className="absolute top-[120px] right-[20%] text-white/50 text-xl font-light select-none"
        aria-hidden="true"
      >
        +
      </div>

      {/* Tagline */}
      <p className="text-[12px] font-medium uppercase tracking-[2px] mb-6">
        READY TO REACH THE PEAK?
      </p>

      {/* Main heading */}
      <h2 className="text-[min(8vw,100px)] font-light text-center leading-[1.1]">
        Let&apos;s build the future.
      </h2>

      {/* Confetti pattern */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[50%] pointer-events-none"
        aria-hidden="true"
      >
        {confettiPieces.map((piece, i) => (
          <span
            key={i}
            className="absolute select-none"
            style={{
              left: piece.left,
              top: piece.top,
              transform: `rotate(${piece.rotation}deg)`,
              fontSize: `${piece.size}px`,
              opacity: piece.opacity,
            }}
          >
            {piece.char}
          </span>
        ))}
      </div>

      {/* Scroll button */}
      <div className="absolute bottom-16 z-10">
        <button
          type="button"
          aria-label="Keep exploring — scroll down"
          className={cn(
            "flex items-center gap-3",
            "px-6 py-3 rounded-full",
            "bg-white/90 text-black",
            "text-[11px] font-medium uppercase tracking-[1px]",
            "cursor-pointer transition-all duration-200 ease-out",
            "hover:bg-white hover:shadow-lg hover:scale-105",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          )}
        >
          <ArrowDown size={14} />
          KEEP EXPLORING
          <ArrowDown size={14} />
        </button>
      </div>
    </section>
  );
}
