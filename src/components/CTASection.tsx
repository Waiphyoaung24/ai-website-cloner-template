"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
}

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;
    const scroller = document.querySelector("main");
    if (!scroller) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    // Tagline fade in
    const tagline = section.querySelector(".cta-tagline");
    if (tagline) {
      gsap.from(tagline, {
        y: 20, autoAlpha: 0, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: section, scroller, start: "top 60%", toggleActions: "play none none reverse" },
      });
    }

    // Heading — word-by-word reveal
    const heading = section.querySelector(".cta-heading");
    if (heading) {
      const split = SplitText.create(heading, { type: "words" });
      gsap.from(split.words, {
        y: 60, autoAlpha: 0, rotateX: -40, stagger: 0.06, duration: 0.8, ease: "power4.out",
        scrollTrigger: { trigger: section, scroller, start: "top 55%", toggleActions: "play none none reverse" },
      });
    }

    // CTA button entrance
    const cta = section.querySelector(".cta-button");
    if (cta) {
      gsap.from(cta, {
        y: 30, autoAlpha: 0, duration: 0.6, delay: 0.4, ease: "power3.out",
        scrollTrigger: { trigger: section, scroller, start: "top 55%", toggleActions: "play none none reverse" },
      });
    }

    // Divider line draw
    const line = section.querySelector(".cta-divider");
    if (line) {
      gsap.from(line, {
        scaleX: 0, transformOrigin: "center center", duration: 1.2, ease: "power2.inOut",
        scrollTrigger: { trigger: section, scroller, start: "top 65%", toggleActions: "play none none reverse" },
      });
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative overflow-hidden",
        "bg-[#0e1418] text-white",
        "py-32 px-5 md:py-48 md:px-[60px]",
        "flex flex-col items-center justify-center"
      )}
    >
      {/* Subtle background glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(148,252,255,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Top divider */}
      <div className="cta-divider h-px w-24 bg-[#94fcff]/30 mb-12" />

      {/* Tagline */}
      <p className="cta-tagline text-[11px] font-mono uppercase tracking-[4px] text-[#94fcff]/60 mb-6">
        Ready to see AI in action?
      </p>

      {/* Main heading */}
      <h2
        className="cta-heading font-[family-name:var(--font-display)] uppercase text-center leading-[0.95] tracking-[-0.01em]"
        style={{
          fontSize: "clamp(2.5rem, 8vw, 7rem)",
          background: "linear-gradient(180deg, #ffffff 0%, #e8eae7 30%, #d4eef0 65%, #a0dfe4 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        Let&apos;s build<br />something real.
      </h2>

      {/* Primary CTA */}
      <a
        href="mailto:business@nexapex.co"
        className={cn(
          "cta-button mt-12 z-10 group",
          "flex items-center gap-3",
          "rounded-full border border-[#94fcff]/30 px-8 py-4",
          "font-mono text-[12px] font-medium uppercase tracking-[1px] text-[#94fcff]",
          "cursor-pointer transition-all duration-300 ease-out",
          "hover:bg-[#94fcff]/10 hover:border-[#94fcff]/50 hover:shadow-[0_0_30px_rgba(148,252,255,0.1)]",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#94fcff]"
        )}
      >
        Book a Consultation
        <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>

      {/* Bottom divider */}
      <div className="h-px w-24 bg-[#94fcff]/30 mt-12" />
    </section>
  );
}
