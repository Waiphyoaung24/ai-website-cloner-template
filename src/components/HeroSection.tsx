"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CROSS_POSITIONS = [5, 25, 50, 72, 95] as const;

function CrossMarker({ xPercent }: { xPercent: number }) {
  return (
    <div
      className="absolute top-1/2 h-3 w-3 -translate-y-1/2 opacity-30"
      style={{ left: `${xPercent}%` }}
    >
      <div className="absolute left-1/2 h-full w-px -translate-x-1/2 bg-white" />
      <div className="absolute top-1/2 h-px w-full -translate-y-1/2 bg-white" />
    </div>
  );
}

export function HeroSection({ className }: { className?: string }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const scroller = document.querySelector("main");
    if (!scroller) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return;

    const heroTitle = section.querySelector(".hero-title");
    const crossMarkers = section.querySelector(".hero-cross-markers");
    const scrollPrompt = section.querySelector(".hero-scroll-prompt");

    if (heroTitle) {
      gsap.to(heroTitle, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          scroller,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    if (crossMarkers) {
      gsap.to(crossMarkers, {
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          scroller,
          start: "top top",
          end: "40% top",
          scrub: true,
        },
      });
    }

    if (scrollPrompt) {
      gsap.to(scrollPrompt, {
        autoAlpha: 0,
        y: 20,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          scroller,
          start: "top top",
          end: "20% top",
          scrub: true,
        },
      });
    }

    const triggers = ScrollTrigger.getAll().filter(
      (t) => t.trigger === section || t.vars.trigger === section,
    );
    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative h-screen w-full overflow-hidden bg-black",
        className,
      )}
    >
      {/* Atmospheric background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 35%, rgba(80,90,120,0.2) 0%, rgba(20,20,30,0.08) 40%, black 70%)",
        }}
      />

      {/* Cross markers */}
      <div className="hero-cross-markers pointer-events-none absolute inset-0 z-[2]">
        {CROSS_POSITIONS.map((x) => (
          <CrossMarker key={x} xPercent={x} />
        ))}
      </div>

      {/* Giant LUSION title — Lusion about page style */}
      <div className="hero-title pointer-events-none absolute inset-x-0 bottom-0 z-10 overflow-hidden px-4 pb-4 md:px-[60px] md:pb-8">
        <h1
          className="select-none text-center font-normal uppercase leading-[0.85] tracking-[-0.02em] text-white"
          style={{ fontSize: "clamp(4rem, 18vw, 280px)" }}
        >
          LUSION
        </h1>
      </div>

      {/* Scroll prompt */}
      <div className="hero-scroll-prompt absolute bottom-6 right-4 z-10 md:bottom-10 md:right-[60px]">
        <span className="text-[10px] font-medium uppercase tracking-[2px] text-white/50">
          SCROLL TO EXPLORE
        </span>
      </div>
    </section>
  );
}
