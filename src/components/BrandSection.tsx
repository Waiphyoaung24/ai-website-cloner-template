"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
}

const PILLARS = [
  {
    num: "01",
    title: "AI Engineering",
    body: "End-to-end machine learning pipelines built for production. From data ingestion to real-time inference at sub-100ms latency.",
  },
  {
    num: "02",
    title: "Cloud Infrastructure",
    body: "Distributed systems architected for scale. Multi-region deployments with 99.97% uptime across edge nodes worldwide.",
  },
  {
    num: "03",
    title: "Product Intelligence",
    body: "AI-native product strategy that turns raw data into competitive advantage. We ship features that learn and adapt.",
  },
];

export function BrandSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;
    const scroller = document.querySelector("main");
    if (!scroller) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    // Section headline — SplitText char reveal (same as ThreeShowcase)
    const headlineTitle = section.querySelector(".section-headline-title");
    const headlineWrap = section.querySelector(".section-headline");
    if (headlineTitle) {
      const split = SplitText.create(headlineTitle, { type: "chars" });
      gsap.from(split.chars, {
        y: 40, autoAlpha: 0, rotateX: -60, stagger: 0.03, duration: 0.8, ease: "power4.out",
        scrollTrigger: { trigger: headlineWrap, scroller, start: "top 80%", toggleActions: "play none none reverse" },
      });
    }

    // Statement reveal
    const statementTitle = section.querySelector(".brand-statement");
    if (statementTitle) {
      const split = SplitText.create(statementTitle, { type: "lines, words" });
      gsap.from(split.words, {
        y: 50,
        autoAlpha: 0,
        stagger: 0.03,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: statementTitle,
          scroller,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }

    // Statement body
    const statementBody = section.querySelector(".brand-statement-body");
    if (statementBody) {
      gsap.from(statementBody, {
        y: 30,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: statementBody,
          scroller,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }

    // Pillar cards stagger
    const pillars = section.querySelectorAll(".pillar-card");
    pillars.forEach((card, i) => {
      gsap.from(card, {
        y: 60,
        autoAlpha: 0,
        duration: 0.8,
        delay: i * 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          scroller,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Divider line draw
    const dividers = section.querySelectorAll(".brand-divider");
    dividers.forEach((line) => {
      gsap.from(line, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: line,
          scroller,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative bg-[#0e1418] overflow-hidden">

      {/* ── Section Headline — centered, same style as ThreeShowcase ── */}
      <div className="section-headline flex flex-col items-center justify-center py-24 md:py-36 pointer-events-none">
        <p className="text-[10px] font-mono uppercase tracking-[4px] text-[#94fcff]/50 mb-4">
          Discover
        </p>
        <h2
          className="section-headline-title font-normal uppercase tracking-[3px] text-white text-center leading-[1.1] font-[family-name:var(--font-display)]"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
        >
          Who We Are
        </h2>
        <div className="mt-6 h-px w-16 bg-[#94fcff]/30" />
      </div>

      {/* ── 1. Brand Statement ── */}
      <div className="px-5 md:px-[60px] pb-16 md:pb-24">
        <div className="brand-divider h-px bg-gradient-to-r from-[#94fcff]/30 via-[#94fcff]/10 to-transparent mb-16 md:mb-24" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          {/* Left — large statement */}
          <div className="md:col-span-7">
            <h2
              className="brand-statement font-normal uppercase leading-[0.92] tracking-[-0.01em] text-white font-[family-name:var(--font-display)]"
              style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
            >
              We engineer AI systems{"\n"}
              that operate beyond{"\n"}
              the frontier
            </h2>
          </div>

          {/* Right — supporting text */}
          <div className="md:col-span-5 flex flex-col justify-end">
            <p className="brand-statement-body text-[14px] leading-[1.8] text-white/40 max-w-[400px]">
              NexApex builds infrastructure for the next era of artificial intelligence.
              We don&apos;t follow industry benchmarks &mdash; we set them. Our systems
              process millions of requests daily across distributed edge nodes, delivering
              intelligence at the speed of thought.
            </p>
          </div>
        </div>
      </div>

      {/* ── 2. Three Pillars ── */}
      <div className="px-5 md:px-[60px] pb-16 md:pb-24">
        <div className="brand-divider h-px bg-gradient-to-r from-[#94fcff]/30 via-[#94fcff]/10 to-transparent mb-12 md:mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.num}
              className="pillar-card group relative p-6 md:p-10 border-l border-[#94fcff]/10 first:border-l-0"
            >
              {/* Number */}
              <span className="block text-[11px] font-mono text-[#94fcff]/30 tracking-wider mb-6">
                {pillar.num}
              </span>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-normal uppercase tracking-[1px] text-white font-[family-name:var(--font-display)] mb-4">
                {pillar.title}
              </h3>

              {/* Body */}
              <p className="text-[13px] leading-[1.7] text-white/35">
                {pillar.body}
              </p>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-6 md:left-10 right-6 md:right-10 h-px bg-[#94fcff]/0 group-hover:bg-[#94fcff]/20 transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
